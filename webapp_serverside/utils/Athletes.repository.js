const pool = require(__dirname + "\\db.include.js");

module.exports = {
  // Récupérer tous les athlètes avec les informations liées au pays
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

  // Ajouter un athlète
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
      // Assurez-vous que les données sont valides
      const { name, age, sport, country } = athleteData; // Par exemple, ces champs peuvent être modifiés.
  
      // Requête SQL pour mettre à jour un athlète dans la base de données
      const query = `
        UPDATE athletes
        SET name = ?, age = ?, sport = ?, country = ?
        WHERE id = ?
      `;
  
      // Exécution de la requête avec les données du corps de la requête
      const result = await db.execute(query, [name, age, sport, country, athleteId]);
  
      if (result.affectedRows > 0) {
        return { success: true, message: 'Athlète mis à jour avec succès.' };
      } else {
        return { success: false, message: 'Aucun athlète trouvé avec cet ID.' };
      }
    } catch (error) {
      console.error('Erreur lors de la mise à jour de l\'athlète:', error);
      throw error; // Propagation de l'erreur pour la gestion dans le controller
    }
  },
  
  
  
async delAthlete(athleteId) {
  try {
    // Supprimer d'abord les participations dans la table 'participate' (si elles existent)
    let sqlDeleteParticipation = "DELETE FROM participate WHERE ID_Athlete = ?";
    await pool.promise().execute(sqlDeleteParticipation, [athleteId]);

    // Ensuite, supprimer l'athlète de la table 'Athletes'
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