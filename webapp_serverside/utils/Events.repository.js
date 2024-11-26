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
            const sql = "SELECT ID_events, event_name, event_date, Event_place, Number_of_place FROM Events";
            const [rows] = await pool.promise().query(sql);
    
            rows.forEach(event => {
                const date = new Date(event.event_date);
                event.event_date = date.toLocaleString('fr-FR', { 
                    year: 'numeric', 
                    month: '2-digit', 
                    day: '2-digit'
                });
            });

            return rows;
        } catch (err) {
            console.error("Error fetching events:", err);
            throw err;
        }
    },

    async getEventById(ID_events) {
        try {
            const sql = "SELECT ID_events, event_name, event_date, Event_place, Number_of_place FROM Events WHERE ID_events = ?";
            const [rows] = await pool.promise().query(sql, [ID_events]);
    
            if (rows.length === 1) {
                return rows[0];
            } else {
                return false;
            }
        } catch (err) {
            console.error("Error fetching event by ID:", err);
            throw err;
        }
    },
    
    // Ajouter un nouvel événement
    async addEvent(eventData) {
        try {
            const sql = `
                INSERT INTO Events (event_name, event_date, Event_place, Number_of_place)
                VALUES (?, ?, ?, ?)
            `;
            const { event_name, event_date, Event_place, Number_of_place } = eventData;
            const [result] = await pool.promise().query(sql, [
                event_name,
                event_date,
                Event_place,
                Number_of_place
            ]);
            return result.insertId; // Retourne l'ID du nouvel événement
        } catch (err) {
            console.error("Error adding event:", err);
            throw err;
        }
    },

    async deleteEvent(ID_events) {
        console.log("Deleting event with ID:", ID_events); // Ajouter un log pour vérifier l'ID
        if (ID_events === undefined) {
            console.error("Event ID is undefined!");
            return;
        }
    
        try {
            const response = await fetch(`http://localhost:3000/api/events/${ID_events}`, {
                method: "DELETE",
            });
            if (response.ok) {
                this.fetchEvents(); // Rafraîchir la liste des événements après suppression
            } else {
                console.error("Erreur lors de la suppression de l'événement", response);
            }
        } catch (error) {
            console.error("Erreur lors de la suppression de l'événement:", error);
        }
    },
    
    
    async updateEvent(ID_events, eventData) {
        try {
            const sql = `
                UPDATE Events
                SET event_name = ?, event_date = ?, Event_place = ?, Number_of_place = ?
                WHERE ID_events = ?
            `;
            const { event_name, event_date, Event_place, Number_of_place } = eventData;
            const [result] = await pool.promise().query(sql, [
                event_name,
                event_date,
                Event_place,
                Number_of_place,
                ID_events
            ]);
            return result.affectedRows; // Retourne le nombre de lignes modifiées
        } catch (err) {
            console.error("Error updating event:", err);
            throw err;
        }
    }
};
