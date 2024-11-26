const pool = require(__dirname + '\\db.include.js');

module.exports = {
  // Fonction pour obtenir tous les pays
  getAllCountries() {
    return new Promise((resolve, reject) => {
      pool.query('SELECT * FROM countries', (error, rows) => {
        if (error) {
          console.error('Error fetching countries:', error);
          return reject(error);
        }
        resolve(rows);
      });
    });
  },

  // Fonction pour ajouter un pays
  addCountry(country) {
    return new Promise((resolve, reject) => {
      const sql = 'INSERT INTO countries (Country_name) VALUES (?)';
      pool.query(sql, [country.Country_name], (error, result) => {
        if (error) {
          console.error('Error adding country:', error);
          return reject(error);
        }
        resolve({ ...country, ID_country: result.insertId });
      });
    });
  },

  // Fonction pour mettre à jour un pays
  updateCountry(ID_country, country) {
    return new Promise((resolve, reject) => {
      const sql = 'UPDATE countries SET Country_name = ? WHERE ID_country = ?';
      pool.query(sql, [country.Country_name, ID_country], (error, result) => {
        if (error) {
          console.error('Error updating country:', error);
          return reject(error);
        }
        resolve({ ...country, ID_country });
      });
    });
  },

  // Fonction pour supprimer un pays et ses athlètes
  async deleteCountry(ID_country) {
    return new Promise((resolve, reject) => {
      // 1. Supprimer les athlètes associés à ce pays
      const deleteAthletesQuery = 'UPDATE athletes SET ID_country = NULL WHERE ID_country = ?';
      pool.query(deleteAthletesQuery, [ID_country], (error, result) => {
        if (error) {
          console.error('Error deleting athletes:', error);
          return reject(error);
        }

        // 2. Supprimer ensuite le pays
        const deleteCountryQuery = 'DELETE FROM countries WHERE ID_country = ?';
        pool.query(deleteCountryQuery, [ID_country], (error, result) => {
          if (error) {
            console.error('Error deleting country:', error);
            return reject(error);
          }

          resolve(result.affectedRows);
        });
      });
    });
  },
};
