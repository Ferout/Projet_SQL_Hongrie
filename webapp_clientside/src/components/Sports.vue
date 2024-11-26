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
          <strong>{{ sport.Sport_name }}</strong><br>
          <span>Team Sport: {{ sport.Team_sport ? 'Yes' : 'No' }}</span><br>
          <span>Number of Players: {{ sport.Number_of_player }}</span><br>
          <span v-if="sport.Minimum_weight">Min Weight: {{ sport.Minimum_weight }} kg</span><br>
          <span v-if="sport.Maximum_weight">Max Weight: {{ sport.Maximum_weight }} kg</span><br>
        </li>
      </ul>
    </div>

    <button @click="goToHomePage" class="home-button">Back to Home</button>
  </div>
</template>
 
<script>
export default {
  data() {
    return {
      currentDate: new Date().toLocaleDateString(),
      sports: [] // Données chargées depuis le backend
    };
  },
  methods: {
    async fetchSports() {
      try {
        const response = await fetch('http://localhost:3000/api/sports'); // L'API qui renvoie les données des sports
        const data = await response.json();
        this.sports = data; // Assignation des données à la variable sports
      } catch (error) {
        console.error("Error fetching sports:", error);
      }
    },
    goToHomePage() {
      this.$router.push('/'); // Retour à la page d'accueil
    }
  },
  mounted() {
    this.fetchSports(); // Chargement des données dès que le composant est monté
  }
};
</script>

<style scoped>
/* Styles for the sports page */
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