const pool = require(__dirname + "\\db.include.js");

module.exports = {

    async getAllAthletes() {
        try {
            // Requête pour récupérer toutes les informations des athlètes, y compris les informations liées au pays
            let sql = "SELECT a.ID_Athlete, a.First_name, a.Family_name, a.Age, a.Adress, a.Phone_number, c.Country_name " +
                      "FROM Athletes a " +
                      "JOIN Countries c ON a.ID_country = c.ID_country";  // Jointure avec la table Countries pour obtenir le nom du pays
            
            const [rows] = await pool.promise().query(sql);  // Exécution de la requête
            console.log("ATHLETES FETCHED: " + rows.length);
            return rows;  // Retourner les données des athlètes
        } catch (err) {
            console.error("Error fetching athletes:", err);  // En cas d'erreur
            throw err;
        }
    },
    
    async getAthleteById(athleteId) {
        try {
            let sql = "SELECT * FROM athletes WHERE athlete_id = ?";
            const [rows] = await pool.promise().query(sql, [athleteId]);
            console.log("SINGLE ATHLETE FETCHED: " + rows.length);
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
    },

    async athleteListAction(request, response) {
        try {
            var athletes = await athleteRepo.getAllAthletes(); // Récupère tous les athlètes
            console.log("Athletes: ", athletes); // Affiche les athlètes dans la console pour débogage
            response.send(JSON.stringify(athletes)); // Envoie la réponse au frontend
        } catch (error) {
            console.error("Error fetching athletes:", error);
            response.status(500).send("Error fetching athletes");
        }
    },
    
    async addAthlete(athleteData) {
        try {
            let sql = "INSERT INTO athletes (athlete_name, athlete_country, athlete_sport) VALUES (?, ?, ?)";
            const [okPacket] = await pool.promise().execute(sql, [athleteData.athlete_name, athleteData.athlete_country, athleteData.athlete_sport]);
            console.log("INSERT " + JSON.stringify(okPacket));
            return okPacket.insertId;
        }
        catch (err) {
            console.log(err);
            throw err; 
        }
    },
    async updateAthlete(athleteId, athleteData) {
        try {
            let sql = "UPDATE athletes SET athlete_name = ?, athlete_country = ?, athlete_sport = ? WHERE athlete_id = ?";
            const [okPacket] = await pool.promise().execute(sql, [athleteData.athlete_name, athleteData.athlete_country, athleteData.athlete_sport, athleteId]);
            console.log("UPDATE " + JSON.stringify(okPacket));
            return okPacket.affectedRows;
        }
        catch (err) {
            console.log(err);
            throw err; 
        }
    },
    async delAthlete(athleteId) {
        try {
            let sql = "DELETE FROM athletes WHERE athlete_id = ?";
            const [okPacket] = await pool.promise().execute(sql, [athleteId]);
            console.log("DELETE " + JSON.stringify(okPacket));
            return okPacket.affectedRows;
        }
        catch (err) {
            console.log(err);
            throw err; 
        }
    }
};
