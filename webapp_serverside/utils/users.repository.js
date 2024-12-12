const mysql = require('mysql2');
const pool = require(__dirname + "/db.include.js");

module.exports = {
  getOneUser(username) {
    return new Promise((resolve, reject) => {
      console.log("getOneUser called with username:", username); 
      const sql = "SELECT ID_user, Username, Password, IsAdmin FROM User WHERE Username = ?";
      pool.query(sql, [username], (err, results) => {
        if (err) {
          console.error("Error in getOneUser:", err); 
          return reject(err);
        }
        console.log("getOneUser results:", results); 
        resolve(results.length === 1 ? results[0] : null);
      });
    });
  },

  areValidCredentials(username, password) {
    return new Promise((resolve, reject) => {
      console.log("areValidCredentials called with:", { username, password }); 
      const sql = "SELECT * FROM user WHERE Username = ? AND Password = ?";
      pool.query(sql, [username, password], (err, results) => {
        if (err) {
          console.error("Error in areValidCredentials:", err); 
          return reject(err);
        }
        console.log("areValidCredentials results:", results); 
        resolve(results.length === 1);
      });
    });
  },

  getIsAdminByUsername(username) {
    return new Promise((resolve, reject) => {
      console.log("getIsAdminByUsername called with username:", username); 
      const sql = "SELECT IsAdmin FROM user WHERE Username = ?";
      pool.query(sql, [username], (err, results) => {
        if (err) {
          console.error("Error in getIsAdminByUsername:", err); 
          return reject(err);
        }
        console.log("getIsAdminByUsername results:", results); 
        if (results.length === 1) {
          resolve(results[0].IsAdmin); 
        } else {
          resolve(null); 
        }
      });
    });
  },
  

  getUserByUsernameAndPassword(username, password) {
    return new Promise((resolve, reject) => {
      console.log("getUserByUsernameAndPassword called with:", { username, password }); 
      const sql = "SELECT * FROM user WHERE Username = ? AND Password = ?";
      pool.query(sql, [username, password], (err, results) => {
        if (err) {
          console.error("Error in getUserByUsernameAndPassword:", err); 
          return reject(err);
        }
        console.log("getUserByUsernameAndPassword results:", results);
        resolve(results.length > 0 ? results[0] : null);
      });
    });
  },
};
