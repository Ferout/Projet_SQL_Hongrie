const mysql = require('mysql2');
const pool = require(__dirname + "/db.include.js");

module.exports = {
  getOneUser(username) {
    return new Promise((resolve, reject) => {
      const sql = "SELECT ID_user, Username, Password FROM User WHERE Username = ?";
      pool.query(sql, [username], (err, results) => {
        if (err) {
          console.error("Error in getOneUser:", err);
          return reject(err);
        }
        resolve(results.length === 1 ? results[0] : null);
      });
    });
  },
  
  areValidCredentials(username, password) {
    return new Promise((resolve, reject) => {
      const sql = "SELECT * FROM user WHERE Username = ? AND Password = ?";
      console.log("Executing SQL:", sql, "with values:", username, password);
  
      // Ajout d'un log avant l'appel à pool.query
      console.log("Calling pool.query...");
  
      pool.query(sql, [username, password], (err, results) => {
        console.log("Inside pool.query callback"); // Log pour détecter si on entre dans le callback
  
        if (err) {
          console.error("Error in areValidCredentials:", err);
          return reject(err); // Rejette la promesse en cas d'erreur SQL
        }
  
        // Log pour afficher les résultats de la requête SQL
        console.log("Database query completed. Results:", results);
  
        if (results.length === 1) {
          console.log("Valid credentials found for username:", username);
          resolve(true); // Résolution avec `true` si les identifiants sont valides
        } else {
          console.log("No valid credentials found for username:", username);
          resolve(false); // Résolution avec `false` si aucun utilisateur ne correspond
        }
      });
    });
  },

  getUserIsAdmin(username) {
    return new Promise((resolve, reject) => {
      const sql = "SELECT IsAdmin FROM user WHERE Username = ?";
      console.log("Executing SQL:", sql, "with value:", username);
      pool.query(sql, [username], (err, results) => {
        if (err) {
          console.error("Error in getUserIsAdmin:", err);
          return reject(err);
        }
        if (results.length === 1) {
          console.log("Fetched IsAdmin:", results[0].IsAdmin);
          resolve(results[0].IsAdmin); // Retourne la valeur de IsAdmin
        } else {
          console.warn("No user found with username:", username);
          resolve(null); // Retourne null si aucun utilisateur trouvé
        }
      });
    });
  }
};
