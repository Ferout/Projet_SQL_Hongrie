const pool = require(__dirname + "\\db.include.js");

module.exports = {
  async getAllAthletes() {
    try {
      let sql = "SELECT a.ID_Athlete, a.First_name, a.Family_name, a.Age, a.Adress, a.Phone_number, c.Country_name " +
                "FROM Athletes a " +
                "JOIN Countries c ON a.ID_country = c.ID_country";
      const [rows] = await pool.promise().query(sql);
      console.log("ATHLETES FETCHED: " + rows.length);
      return rows;
    } catch (err) {
      console.error("Error fetching athletes:", err);
      throw err;
    }
  },


  async addAthlete(athlete) {
    if (!athlete || !athlete.First_name || !athlete.Family_name || !athlete.Age || !athlete.Adress || !athlete.Phone_number || !athlete.ID_country) {
      throw new Error("Missing required fields.");
    }
    const query = `
      INSERT INTO Athletes (First_name, Family_name, Age, Adress, Phone_number, ID_country)
      VALUES (?, ?, ?, ?, ?, ?)
    `;
    const values = [
      athlete.First_name,
      athlete.Family_name,
      athlete.Age,
      athlete.Adress,
      athlete.Phone_number,
      athlete.ID_country
    ];
    return await pool.promise().execute(query, values);
  },

async updateAthlete(athleteId, athleteData) {
    try {
        const { First_name, Family_name, Age, Adress, Phone_number, ID_country } = athleteData;

        const query = `
            UPDATE Athletes
            SET First_name = ?, Family_name = ?, Age = ?, Adress = ?, Phone_number = ?, ID_country = ?
            WHERE ID_Athlete = ?
        `;

        const [result] = await pool.promise().execute(query, [
            First_name, 
            Family_name, 
            Age, 
            Adress, 
            Phone_number, 
            ID_country, 
            athleteId
        ]);

        if (result.affectedRows > 0) {
            return { success: true, message: "Athlète mis à jour avec succès." };
        } else {
            return { success: false, message: "Aucun athlète trouvé avec cet ID." };
        }
    } catch (error) {
        console.error("Erreur lors de la mise à jour de l'athlète:", error);
        throw error; 
    }
},

  
  
  
async delAthlete(athleteId) {
  try {
    let sqlDeleteParticipation = "DELETE FROM participate WHERE ID_Athlete = ?";
    await pool.promise().execute(sqlDeleteParticipation, [athleteId]);
    
    let sqlDeleteAthlete = "DELETE FROM Athletes WHERE ID_Athlete = ?";
    const [okPacket] = await pool.promise().execute(sqlDeleteAthlete, [athleteId]);

    console.log("DELETE " + JSON.stringify(okPacket));
    return okPacket.affectedRows;
  } catch (err) {
    console.log(err);
    throw err;
  }
},
}
