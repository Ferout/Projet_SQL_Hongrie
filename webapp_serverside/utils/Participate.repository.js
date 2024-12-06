const pool = require(__dirname + "\\db.include.js");

module.exports = {
    async getAllParticipations() {
        try {
            const sql = `
                SELECT 
                    Athletes.ID_Athlete AS athlete_id,
                    Events.ID_events AS event_id,
                    Athletes.First_name AS First_name,
                    Athletes.Family_name AS Family_name,
                    Events.Event_name AS Event_name,
                    Participate.Result AS Result
                FROM Participate
                JOIN Athletes ON Participate.ID_Athlete = Athletes.ID_Athlete
                JOIN Events ON Participate.ID_events = Events.ID_events
            `;
            const [rows] = await pool.promise().query(sql);
            return rows;
        } catch (err) {
            console.error("Error fetching participations:", err);
            throw err;
        }
    },

    async addParticipation(participation) {
        try {
            const sql = `
                INSERT INTO Participate (ID_Athlete, ID_events, Result)
                VALUES (?, ?, ?)
            `;
            const [result] = await pool.promise().query(sql, [
                participation.athlete_id,
                participation.event_id,
                participation.result,
            ]);
            return { id: result.insertId, ...participation };
        } catch (err) {
            console.error("Error adding participation:", err);
            throw err;
        }
    },

    async updateParticipation({ athlete_id, event_id }, updatedParticipation) {
        try {
            const sql = `
                UPDATE Participate
                SET Result = ?
                WHERE ID_Athlete = ? AND ID_events = ?
            `;
            const [result] = await pool.promise().query(sql, [
                updatedParticipation.result,
                athlete_id,
                event_id,
            ]);
            return { success: result.affectedRows > 0 };
        } catch (err) {
            console.error("Error updating participation:", err);
            throw err;
        }
    },

    async deleteParticipation({ athlete_id, event_id }) {
        try {
            const sql = `
                DELETE FROM Participate
                WHERE ID_Athlete = ? AND ID_events = ?
            `;
            const [result] = await pool.promise().query(sql, [athlete_id, event_id]);
            return { success: result.affectedRows > 0 };
        } catch (err) {
            console.error("Error deleting participation:", err);
            throw err;
        }
    },
};
