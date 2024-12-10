<template>
  <div class="sports-container">
    <header class="header">
      <div class="header-content">
        <span>{{ currentDate }}</span>
        <div class="nav-buttons">
          <router-link to="/athletes">
            <button>Athletes</button>
          </router-link>
          <router-link to="/countries">
            <button>Countries</button>
          </router-link>
          <router-link to="/events">
            <button>Events</button>
          </router-link>
          <router-link to="/participate">
            <button>Participate</button>
          </router-link>
        </div>
      </div>
    </header>

    <h2>Sports</h2>
    <div class="sports-list">
      <ul>
        <li v-for="sport in sports" :key="sport.ID_sport">
          <div>
            <strong>{{ sport.Sport_name }}</strong><br>
            <span>Team Sport: {{ sport.Team_sport ? 'Yes' : 'No' }}</span><br>
            <span>Number of Players: {{ sport.Number_of_player }}</span><br>
            <span v-if="sport.Minimum_weight">Min Weight: {{ sport.Minimum_weight }} kg</span><br>
            <span v-if="sport.Maximum_weight">Max Weight: {{ sport.Maximum_weight }} kg</span><br>
            <div class="actions" v-if="isAdmin">
              <button @click="editSport(sport)">Edit</button>
              <button @click="deleteSport(sport.ID_sport)">Delete</button>
            </div>
          </div>
        </li>
      </ul>
    </div>

    <h3 v-if="isAdmin">Add New Sport</h3>
    <form v-if="isAdmin" @submit.prevent="addSport">
      <input v-model="newSport.Sport_name" placeholder="Sport Name" required />
      <input v-model="newSport.Number_of_player" type="number" placeholder="Number of Players" required />
      <input v-model="newSport.Minimum_weight" type="number" placeholder="Minimum Weight (kg)" />
      <input v-model="newSport.Maximum_weight" type="number" placeholder="Maximum Weight (kg)" />
      <label for="team_sport">Team Sport:</label>
      <input type="checkbox" v-model="newSport.Team_sport" />
      <button type="submit">Add Sport</button>
    </form>

    <h3 v-if="editingSport">Edit Sport</h3>
    <form v-if="editingSport" @submit.prevent="updateSport">
      <input v-model="editingSport.Sport_name" placeholder="Sport Name" required />
      <input v-model="editingSport.Number_of_player" type="number" placeholder="Number of Players" required />
      <input v-model="editingSport.Minimum_weight" type="number" placeholder="Minimum Weight (kg)" />
      <input v-model="editingSport.Maximum_weight" type="number" placeholder="Maximum Weight (kg)" />
      <label for="team_sport">Team Sport:</label>
      <input type="checkbox" v-model="editingSport.Team_sport" />
      <button type="submit">Update Sport</button>
    </form>

    <button @click="goToHomePage" class="home-button">Back to Home</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      currentDate: new Date().toLocaleDateString(),
      sports: [], // Liste des sports
      newSport: {
        Sport_name: "",
        Number_of_player: null,
        Minimum_weight: null,
        Maximum_weight: null,
        Team_sport: false,
      },
      editingSport: null, // Sport en cours d'édition
      isAdmin: false, // Défini par défaut comme non-admin
    };
  },
  methods: {
    async fetchSports() {
      try {
        const response = await fetch("http://localhost:3000/api/sports");
        const data = await response.json();
        this.sports = data; // Affectation des sports récupérés
      } catch (error) {
        console.error("Error fetching sports:", error);
      }
    },
    loadAdminStatus() {
      const username = localStorage.getItem("username");
      const isAdmin = parseInt(localStorage.getItem("isAdmin"), 10);

      if (!username) {
        console.warn("Username not found in localStorage");
        this.isAdmin = false;
        return;
      }

      this.isAdmin = isAdmin === 1;
      console.log("Admin status loaded:", this.isAdmin);
    },
    async addSport() {
      try {
        const response = await fetch("http://localhost:3000/api/sports", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(this.newSport),
        });
        if (response.ok) {
          this.fetchSports(); // Rafraîchissement de la liste des sports
          this.newSport = {
            Sport_name: "",
            Number_of_player: null,
            Minimum_weight: null,
            Maximum_weight: null,
            Team_sport: false,
          }; // Réinitialisation du formulaire
        }
      } catch (error) {
        console.error("Error adding sport:", error);
      }
    },
    async editSport(sport) {
      this.editingSport = { ...sport }; // Pré-remplir le formulaire avec les données de sport à modifier
    },
    async updateSport() {
      try {
        const response = await fetch(`http://localhost:3000/api/sports/${this.editingSport.ID_sport}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(this.editingSport), // Envoi des données mises à jour
        });

        if (response.ok) {
          this.fetchSports(); // Rafraîchissement après mise à jour
          this.editingSport = null; // Réinitialiser le formulaire
        } else {
          console.error("Error updating sport", response);
        }
      } catch (error) {
        console.error("Error updating sport:", error);
      }
    },
    async deleteSport(sportId) {
      try {
        const response = await fetch(`http://localhost:3000/api/sports/${sportId}`, {
          method: "DELETE",
        });
        if (response.ok) {
          this.fetchSports(); // Rafraîchissement après suppression
        }
      } catch (error) {
        console.error("Error deleting sport:", error);
      }
    },
    goToHomePage() {
      this.$router.push("/"); // Retour à la page d'accueil
    },
  },
  mounted() {
    this.fetchSports(); // Chargement des sports dès que le composant est monté
    this.loadAdminStatus(); // Chargement du statut admin
  },
};
</script>

<style scoped>
/* Styles pour la page des sports */
.header {
  background-color: #42b883;
  color: white;
  padding: 5px 10px;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.header-content {
  display: flex;
  justify-content: space-between;
  width: 95%;
  align-items: center;
}

.nav-buttons {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 30px;
}

.nav-buttons button {
  background-color: #42b883;
  color: white;
  padding: 8px 16px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 14px;
  transition: background-color 0.3s;
}

.nav-buttons button:hover {
  background-color: #36a76e;
}

.sports-container {
  text-align: center;
  margin: 40px;
}

.sports-list ul {
  list-style-type: none;
  padding: 0;
}

.sports-list li {
  padding: 10px;
  cursor: pointer;
}

.sports-list li:hover {
  background-color: #f0f0f0;
}

.actions {
  margin-top: 10px;
}

.actions button {
  margin-right: 10px;
  background-color: #42b883;
  color: white;
  padding: 5px 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.actions button:hover {
  background-color: #36a76e;
}

form {
  margin-top: 20px;
}

form input {
  display: block;
  margin-bottom: 10px;
  padding: 8px;
  width: 300px;
  margin: 5px auto;
}

form button {
  padding: 10px 20px;
  background-color: #42b883;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

form button:hover {
  background-color: #36a76e;
}

.home-button {
  background-color: #42b883;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  margin-top: 20px;
  transition: background-color 0.3s;
}

.home-button:hover {
  background-color: #36a76e;
}
</style>
