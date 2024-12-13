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
      <div
        v-for="sport in sports"
        :key="sport.ID_sport"
        class="sport-card"
      >
        <p><strong>{{ sport.Sport_name }}</strong></p>
        <p>Team Sport: {{ sport.Team_sport ? 'Yes' : 'No' }}</p>
        <p>Number of Players: {{ sport.Number_of_player }}</p>
        <p v-if="sport.Minimum_weight">Min Weight: {{ sport.Minimum_weight }} kg</p>
        <p v-if="sport.Maximum_weight">Max Weight: {{ sport.Maximum_weight }} kg</p>


        <div class="actions">
        <button @click="editSport(sport)">Edit</button>
        </div>


        <div class="actions" v-if="isAdmin">
          <button @click="deleteSport(sport.ID_sport)">Delete</button>
        </div>

      </div>
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

    <footer class="footer">
      <p>© 2024 Discover_Olympics_Games - Gomez Luka & Feracci Aurélien</p>
    </footer>
  </div>
</template>

<script>
export default {
  data() {
    return {
      currentDate: new Date().toLocaleDateString(),
      sports: [],
      newSport: {
        Sport_name: "",
        Number_of_player: null,
        Minimum_weight: null,
        Maximum_weight: null,
        Team_sport: false,
      },
      editingSport: null,
      isAdmin: false,
    };
  },
  methods: {
    async fetchSports() {
      try {
        const response = await fetch("http://localhost:3000/sports");
        const data = await response.json();
        this.sports = data;
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
        const response = await fetch("http://localhost:3000/sports", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(this.newSport),
        });
        if (response.ok) {
          this.fetchSports();
          this.newSport = {
            Sport_name: "",
            Number_of_player: null,
            Minimum_weight: null,
            Maximum_weight: null,
            Team_sport: false,
          };
        }
      } catch (error) {
        console.error("Error adding sport:", error);
      }
    },
    async editSport(sport) {
      this.editingSport = { ...sport };
    },
    async updateSport() {
      try {
        const response = await fetch(`http://localhost:3000/sports/${this.editingSport.ID_sport}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(this.editingSport),
        });

        if (response.ok) {
          this.fetchSports();
          this.editingSport = null;
        } else {
          console.error("Error updating sport", response);
        }
      } catch (error) {
        console.error("Error updating sport:", error);
      }
    },
    async deleteSport(sportId) {
      try {
        const response = await fetch(`http://localhost:3000/sports/${sportId}`, {
          method: "DELETE",
        });
        if (response.ok) {
          this.fetchSports();
        }
      } catch (error) {
        console.error("Error deleting sport:", error);
      }
    },
    goToHomePage() {
      this.$router.push("/");
    },
  },
  mounted() {
    this.fetchSports();
    this.loadAdminStatus();
  },
};
</script>

<style scoped>
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

.sports-list {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: center;
  padding: 0;
  list-style: none;
  margin: 0;
}

.sport-card {
  flex: 1 1 calc(33.333% - 20px);
  box-sizing: border-box;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 15px;
  background-color: #f9f9f9;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.sport-card p {
  margin: 5px 0;
  font-size: 16px;
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

.sports-container {
  position: relative;
  min-height: 100vh; 
  padding-bottom: 120px; 
  margin: 0; 
}

.footer {
  position: absolute;
  bottom: 10px;
  left: 10px;
  right: 10px;
  background-color: #42b883;
  color: white;
  text-align: center;
  padding: 20px;
  box-shadow: 0 -2px 4px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
}
</style>
