const pool = require(__dirname + '\\db.include.js');

module.exports = {
  // Fonction pour obtenir tous les sports
  getAllSports() {
    return new Promise((resolve, reject) => {
      pool.query('SELECT * FROM sports', (error, rows) => {
        if (error) {
          console.error('Error fetching sports:', error);
          return reject(error);
        }
        resolve(rows);
      });
    });
  },

  // Fonction pour ajouter un sport
  addSport(sport) {
    return new Promise((resolve, reject) => {
      const sql = 'INSERT INTO sports (Sport_name, Number_of_player, Minimum_weight, Maximum_weight, Team_sport) VALUES (?, ?, ?, ?, ?)';
      pool.query(sql, [
        sport.Sport_name,
        sport.Number_of_player,
        sport.Minimum_weight,
        sport.Maximum_weight,
        sport.Team_sport
      ], (error, result) => {
        if (error) {
          console.error('Error adding sport:', error);
          return reject(error);
        }
        resolve({ ...sport, ID_sport: result.insertId });
      });
    });
  },

  // Fonction pour mettre à jour un sport
  updateSport(ID_sport, sport) {
    return new Promise((resolve, reject) => {
      const sql = 'UPDATE sports SET Sport_name = ?, Number_of_player = ?, Minimum_weight = ?, Maximum_weight = ?, Team_sport = ? WHERE ID_sport = ?';
      pool.query(sql, [
        sport.Sport_name,
        sport.Number_of_player,
        sport.Minimum_weight,
        sport.Maximum_weight,
        sport.Team_sport,
        ID_sport
      ], (error, result) => {
        if (error) {
          console.error('Error updating sport:', error);
          return reject(error);
        }
        resolve({ ...sport, ID_sport });
      });
    });
  },

  async deleteSport(ID_sport) {
    return new Promise((resolve, reject) => {
      // Commencer par supprimer les participations associées à l'événement du sport
      const deleteParticipateQuery = `
        DELETE FROM Participate 
        WHERE ID_events IN (SELECT ID_events FROM Events WHERE ID_sport = ?)
      `;
      pool.query(deleteParticipateQuery, [ID_sport], (error, result) => {
        if (error) {
          console.error('Error deleting participate records:', error);
          return reject(error);
        }
  
        // Supprimer les événements associés au sport
        const deleteEventsQuery = 'DELETE FROM Events WHERE ID_sport = ?';
        pool.query(deleteEventsQuery, [ID_sport], (error, result) => {
          if (error) {
            console.error('Error deleting events:', error);
            return reject(error);
          }
  
          // Supprimer enfin le sport
          const deleteSportQuery = 'DELETE FROM sports WHERE ID_sport = ?';
          pool.query(deleteSportQuery, [ID_sport], (error, result) => {
            if (error) {
              console.error('Error deleting sport:', error);
              return reject(error);
            }
  
            resolve(result.affectedRows);
          });
        });
      });
    });
  }
}

  