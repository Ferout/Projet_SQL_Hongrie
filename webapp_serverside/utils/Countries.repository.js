// utils/countries.repository.js
const pool = require(__dirname + "\\db.include.js");

module.exports = {
    getBlankCountry() {
        return {
            "country_id": 0,
            "country_name": "Country"
        };
    },
    async getAllCountries() {
        try {
            let sql = "SELECT * FROM countries";
            const [rows] = await pool.promise().query(sql);  // Utilisation de query au lieu de execute
            return rows;
        } catch (err) {
            console.error("Error fetching countries:", err);  // Affiche l'erreur si elle se produit
            throw err; 
        }
    },
    async getCountryById(countryId) {
        try {
            let sql = "SELECT * FROM countries WHERE country_id = ?";
            const [rows] = await pool.promise().query(sql, [countryId]);  // Utilisation de query au lieu de execute
            console.log("SINGLE COUNTRY FETCHED: " + rows.length);
            if (rows.length == 1) {
                return rows[0];
            } else {
                return false;
            }
        } catch (err) {
            console.error("Error fetching country by ID:", err);  // Affiche l'erreur si elle se produit
            throw err; 
        }
    }
};
