const mysql = require('mysql2');
const pool = require(__dirname + "/db.include.js");

module.exports = {
  getOneUser(username) {
    return new Promise((resolve, reject) => {
      console.log("getOneUser called with username:", username); // Log initial
      const sql = "SELECT ID_user, Username, Password, IsAdmin FROM User WHERE Username = ?";
      pool.query(sql, [username], (err, results) => {
        if (err) {
          console.error("Error in getOneUser:", err); // Log en cas d'erreur
          return reject(err);
        }
        console.log("getOneUser results:", results); // Log les résultats obtenus
        resolve(results.length === 1 ? results[0] : null);
      });
    });
  },

  areValidCredentials(username, password) {
    return new Promise((resolve, reject) => {
      console.log("areValidCredentials called with:", { username, password }); // Log initial
      const sql = "SELECT * FROM user WHERE Username = ? AND Password = ?";
      pool.query(sql, [username, password], (err, results) => {
        if (err) {
          console.error("Error in areValidCredentials:", err); // Log en cas d'erreur
          return reject(err);
        }
        console.log("areValidCredentials results:", results); // Log les résultats obtenus
        resolve(results.length === 1);
      });
    });
  },

  getIsAdminByUsername(username) {
    return new Promise((resolve, reject) => {
      console.log("getIsAdminByUsername called with username:", username); // Log initial
      const sql = "SELECT IsAdmin FROM user WHERE Username = ?";
      pool.query(sql, [username], (err, results) => {
        if (err) {
          console.error("Error in getIsAdminByUsername:", err); // Log en cas d'erreur
          return reject(err);
        }
        console.log("getIsAdminByUsername results:", results); // Log les résultats obtenus
        if (results.length === 1) {
          resolve(results[0].IsAdmin); // Retourne la valeur de IsAdmin si trouvée
        } else {
          resolve(null); // Retourne null si aucun utilisateur trouvé
        }
      });
    });
  },
  

  getUserByUsernameAndPassword(username, password) {
    return new Promise((resolve, reject) => {
      console.log("getUserByUsernameAndPassword called with:", { username, password }); // Log initial
      const sql = "SELECT * FROM user WHERE Username = ? AND Password = ?";
      pool.query(sql, [username, password], (err, results) => {
        if (err) {
          console.error("Error in getUserByUsernameAndPassword:", err); // Log en cas d'erreur
          return reject(err);
        }
        console.log("getUserByUsernameAndPassword results:", results); // Log les résultats obtenus
        resolve(results.length > 0 ? results[0] : null);
      });
    });
  },
};
