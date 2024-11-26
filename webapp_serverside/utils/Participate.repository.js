// utils/participate.repository.js
const pool = require(__dirname + "\\db.include.js");

module.exports = {
    getBlankParticipation() {
        return {
            "participation_id": 0,
            "athlete_id": 0,
            "event_id": 0,
            "score": 0,
            "First_name": "",
            "Family_name": "",
            "Event_name": "",
            "Result": ""
        };
    },

    // Mise à jour de la requête pour la table "Participate" avec les nouveaux champs
    async getAllParticipations() {
        try {
            // Effectuer une jointure entre Participate, Athletes et Events pour récupérer le prénom, le nom de l'athlète, l'événement et le résultat
// Correction dans la requête pour retourner les clés attendues
        let sql = `
            SELECT 
                Athletes.First_name AS 'First_name', 
                Athletes.Family_name AS 'Family_name', 
                Events.Event_name AS 'Event_name', 
                Participate.Result AS 'Result'
            FROM Participate
            JOIN Athletes ON Participate.ID_Athlete = Athletes.ID_Athlete
            JOIN Events ON Participate.ID_events = Events.ID_events`;
        // Jointure avec Events pour récupérer le nom de l'événement
            
            const [rows] = await pool.promise().query(sql);  // Exécution de la requête et récupération des résultats
            return rows;  // Retourne les résultats à l'appelant
        } catch (err) {
            console.error("Error fetching participations:", err);  // Affiche l'erreur si elle se produit
            throw err;  // Lève l'erreur pour une gestion ultérieure
        }
    },
    
    
    
    
    // Mise à jour de la requête pour la table "Participate" avec les nouveaux champs
    async getParticipationById(participationId) {
        try {
            let sql = "SELECT First_name, Family_name, Event_name, Result FROM Participate WHERE participation_id = ?";  // Sélectionner les nouveaux champs
            const [rows, fields] = await pool.execute(sql, [participationId]);
            console.log("SINGLE PARTICIPATION FETCHED: " + rows.length);
            if (rows.length == 1) {
                return rows[0];  // Retourne les détails d'une participation spécifique
            } else {
                return false;  // Retourne false si aucune participation n'est trouvée
            }
        } catch (err) {
            console.log(err);
            throw err;  // En cas d'erreur, la propager
        }
    }
};
