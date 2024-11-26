// utils/sports.repository.js
const pool = require(__dirname + "\\db.include.js");

module.exports = {
    getBlankSport() {
        return {
            "sport_id": 0,
            "sport_name": "Sport"
        };
    },

async getAllSports() {
    try {
        let sql = "SELECT * FROM sports";  // Votre requête SQL
        const [rows] = await pool.promise().query(sql);  // Utilisation de query pour obtenir directement les résultats
        return rows;
    } catch (err) {
        console.error("Error fetching sports:", err);  // Affiche l'erreur si elle se produit
        throw err; 
    }
},

    
    async getSportById(sportId) {
        try {
            let sql = "SELECT * FROM sports WHERE sport_id = ?";
            const [rows, fields] = await pool.execute(sql, [sportId]);
            console.log("SINGLE SPORT FETCHED: " + rows.length);
            if (rows.length == 1) {
                return rows[0];
            } else {
                return false;
            }
        }
        catch (err) {
            console.log(err);
            throw err; 
        }
    }
};
