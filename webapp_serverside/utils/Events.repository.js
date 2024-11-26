const pool = require(__dirname + "\\db.include.js");

module.exports = {
    getBlankEvent() {
        return {
            "event_id": 0,
            "event_name": "Event",
            "event_date": "2024-01-01",
            "Event_place": "", // Ajout de Location
            "Number_of_place": 0 // Ajout du nombre de places
        };
    },

    async getAllEvents() {
        try {
            // Utilisation du bon nom de colonne (ex: ID_events)
            const sql = "SELECT ID_events, event_name, event_date, Event_place, Number_of_place FROM Events";
            const [rows] = await pool.promise().query(sql);
    
            // Formater les dates ici
            rows.forEach(event => {
                const date = new Date(event.Event_date);
                event.Event_date = date.toLocaleString('fr-FR', { 
                    year: 'numeric', 
                    month: '2-digit', 
                    day: '2-digit'
                });
            });

            // Retourner les événements avec toutes les informations
            return rows;
        } catch (err) {
            console.error("Error fetching events:", err);
            throw err;
        }
    },

    async getEventById(eventId) {
        try {
            // Utilisation du bon nom de colonne (ex: ID_events)
            const sql = "SELECT ID_events, event_name, event_date, location, seats FROM events WHERE ID_events = ?";
            const result = await pool.execute(sql, [eventId]);

            // Vérification de la structure du résultat
            if (!result || !Array.isArray(result) || result.length < 2) {
                console.error("Unexpected result format for single event:", result);
                return false; // Retourner `false` si la structure est inattendue
            }

            const [rows, fields] = result;
            console.log("SINGLE EVENT FETCHED: " + rows.length);

            if (rows.length === 1) {
                return rows[0]; // Retourne l'événement trouvé
            } else {
                return false; // Retourner `false` si aucun résultat ou plusieurs résultats
            }
        } catch (err) {
            console.error("Error fetching event by ID:", err);
            throw err; // Relancer l'erreur pour un traitement en amont
        }
    }
};
