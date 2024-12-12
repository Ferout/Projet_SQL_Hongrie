const pool = require(__dirname + "\\db.include.js");

module.exports = {
  getBlankEvent() {
    return {
      "ID_events": 0, 
      "event_name": "Event",
      "event_date": "2024-01-01",
      "Event_place": "", 
      "Number_of_place": 0 
    };
  },

  async getAllEvents() {
    try {
      const sql = "SELECT ID_events, event_name, event_date, Event_place, Number_of_place FROM Events";
      const [rows] = await pool.promise().query(sql);
  
      rows.forEach(event => {
        const date = new Date(event.event_date);
        if (!isNaN(date)) {
          event.event_date = date.toISOString().split('T')[0]; 
        } else {
          event.event_date = ""; 
        }
      });
  
      return rows;
    } catch (err) {
      console.error("Error fetching events:", err);
      throw err;
    }
  },

  async addEvent(eventData) {
    try {
      const { event_name, event_date, Event_place, Number_of_place } = eventData;
      const date = new Date(event_date);
      if (isNaN(date)) throw new Error("Invalid event date");

      const formattedDate = date.toISOString().split('T')[0]; 
      const sql = "INSERT INTO Events (event_name, event_date, Event_place, Number_of_place) VALUES (?, ?, ?, ?)";
      const [result] = await pool.promise().query(sql, [
        event_name,
        formattedDate,
        Event_place,
        Number_of_place,
      ]);
      return result.insertId;
    } catch (err) {
      console.error("Error adding event:", err);
      throw err;
    }
  },

  async updateEvent(ID_events, eventData) {
    try {
      const { event_name, event_date, Event_place, Number_of_place } = eventData;
      const date = new Date(event_date);
      if (isNaN(date)) throw new Error("Invalid event date");

      const formattedDate = date.toISOString().split('T')[0];
      const sql = `
        UPDATE Events 
        SET event_name = ?, event_date = ?, Event_place = ?, Number_of_place = ?
        WHERE ID_events = ?;
      `;
      const [result] = await pool.promise().query(sql, [
        event_name,
        formattedDate,
        Event_place,
        Number_of_place,
        ID_events,
      ]);
      return result.affectedRows;
    } catch (err) {
      console.error("Error updating event:", err);
      throw err;
    }
  },
  async deleteEvent(ID_events) {
    try {
        let sqlDeleteParticipation = "DELETE FROM participate WHERE ID_events = ?";
        await pool.promise().execute(sqlDeleteParticipation, [ID_events]);

        const sql = "DELETE FROM Events WHERE ID_events = ?";
        const [result] = await pool.promise().query(sql, [ID_events]);

        return result.affectedRows; 
    } catch (err) {
        console.error("Error deleting event:", err);
        throw err;
    }
}
}