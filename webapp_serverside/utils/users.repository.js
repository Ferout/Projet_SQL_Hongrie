const pool = require(__dirname + "\\db.include.js");

module.exports = {
  async getOneUser(userName) {
    try {
      const sql = "SELECT user_id, user_name, user_email, user_role FROM users WHERE user_name = ?";
      const [rows] = await pool.execute(sql, [userName]);
      return rows.length === 1 ? rows[0] : false;
    } catch (err) {
      console.error(err);
      throw err;
    }
  },
  
  async areValidCredentials(username, password) {
    try {
      const sql = `
        SELECT * 
        FROM USERS 
        WHERE user_name = ? AND user_pass COLLATE utf8mb4_general_ci = sha2(concat(user_created, ?), 224) COLLATE utf8mb4_general_ci
      `;
      const [rows] = await pool.execute(sql, [username, password]);
      return rows.length === 1 && rows[0].user_name === username;
    } catch (err) {
      console.error(err);
      throw err;
    }
  }
};
