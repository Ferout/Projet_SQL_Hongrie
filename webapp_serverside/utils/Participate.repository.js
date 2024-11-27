// utils/participate.repository.js
const pool = require(__dirname + "\\db.include.js");

module.exports = {
    getBlankParticipation() {
        return {
            "athlete_id": 0,
            "event_id": 0,
            "score": 0,
            "First_name": "",
            "Family_name": "",
            "Event_name": "",
            "Result": ""
        };
    },

    async getAllParticipations() {
        try {
            let sql = `
                SELECT 
                    Athletes.First_name AS 'First_name', 
                    Athletes.Family_name AS 'Family_name', 
                    Events.Event_name AS 'Event_name', 
                    Participate.Result AS 'Result'
                FROM Participate
                JOIN Athletes ON Participate.ID_Athlete = Athletes.ID_Athlete
                JOIN Events ON Participate.ID_events = Events.ID_events`;
            const [rows] = await pool.promise().query(sql);
            return rows;
        } catch (err) {
            console.error("Error fetching participations:", err);
            throw err;
        }
    },

    async getParticipationById(participationId) {
        try {
            let sql = "SELECT First_name, Family_name, Event_name, Result FROM Participate WHERE ID_Athlete = ? AND ID_events = ?";
            const [rows] = await pool.execute(sql, [participationId.athlete_id, participationId.event_id]);
            console.log("SINGLE PARTICIPATION FETCHED: " + rows.length);
            if (rows.length == 1) {
                return rows[0];
            } else {
                return false;
            }
        } catch (err) {
            console.log(err);
            throw err;
        }
    },

    async addParticipation(participation) {
        try {
            const sql = `
                INSERT INTO Participate (ID_Athlete, ID_events, Result)
                VALUES (?, ?, ?)
            `;
            const { athlete_id, event_id, result: participationResult } = participation;
            const [queryResult] = await pool.promise().query(sql, [athlete_id, event_id, participationResult]);
            return { id: queryResult.insertId, ...participation };
        } catch (err) {
            console.error("Error adding participation:", err);
            throw err;
        }
    },

    async updateParticipation(participationId, updatedParticipation) {
        try {
            const sql = `
                UPDATE Participate
                SET ID_Athlete = ?, ID_events = ?, Result = ?
                WHERE ID_Athlete = ? AND ID_events = ?
            `;
            const { athlete_id, event_id, result } = updatedParticipation;
            await pool.promise().query(sql, [athlete_id, event_id, result, participationId.athlete_id, participationId.event_id]);
            return { id: participationId, ...updatedParticipation };
        } catch (err) {
            console.error("Error updating participation:", err);
            throw err;
        }
    },

    // Correction de la suppression
    async deleteParticipation(participationId) {
        try {
            const sql = `
                DELETE FROM Participate
                WHERE ID_Athlete = ? AND ID_events = ?
            `;
            await pool.promise().query(sql, [participationId.athlete_id, participationId.event_id]);
            return { success: true };
        } catch (err) {
            console.error("Error deleting participation:", err);
            throw err;
        }
    }
};
