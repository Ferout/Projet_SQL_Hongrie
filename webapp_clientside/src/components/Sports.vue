<template>
  <div class="sports-container">
    <header class="header">
      <div class="header-content">
        <span>{{ currentDate }}</span>
        <div class="nav-buttons">
          <router-link to="/countries">
            <button>Countries</button>
          </router-link>
          <router-link to="/events">
            <button>Events</button>
          </router-link>
          <router-link to="/athletes">
            <button>Athletes</button>
          </router-link>
          <router-link to="/participate">
            <button>Participate</button>
          </router-link>
        </div>
      </div>
    </header>
    <h2>Olympic Sports</h2>
    <div class="sports-buttons">
      <button v-for="sport in sports" :key="sport.id" @click="showSportDetails(sport)">
        {{ sport.name }}
      </button>
    </div>
    <div v-if="selectedSport" class="sport-details">
      <h3>{{ selectedSport.name }}</h3>
      <p><strong>Minimum Weight:</strong> {{ selectedSport.minWeight }} kg</p>
      <p><strong>Maximum Weight:</strong> {{ selectedSport.maxWeight }} kg</p>
      <p><strong>Team Sport:</strong> {{ selectedSport.teamSport ? 'Yes' : 'No' }}</p>
      <p><strong>Number of Players:</strong> {{ selectedSport.numPlayers }}</p>
    </div>
    <button @click="goToHomePage" class="home-button">Back to Home</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      currentDate: new Date().toLocaleDateString(),
      selectedSport: null,
      sports: [
        { id: 1, name: '100 meters', minWeight: 'N/A', maxWeight: 'N/A', teamSport: false, numPlayers: 1 },
        { id: 2, name: '200 meters', minWeight: 'N/A', maxWeight: 'N/A', teamSport: false, numPlayers: 1 },
        { id: 3, name: 'Football', minWeight: 70, maxWeight: 100, teamSport: true, numPlayers: 11 },
        { id: 4, name: 'Basketball', minWeight: 60, maxWeight: 120, teamSport: true, numPlayers: 5 },
        { id: 5, name: 'Swimming', minWeight: 'N/A', maxWeight: 'N/A', teamSport: false, numPlayers: 1 },
      ]
    };
  },
  methods: {
    showSportDetails(sport) {
      this.selectedSport = sport;
    },
    goToHomePage() {
      this.$router.push('/');
    }
  }
}
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

.sports-buttons {
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.sports-buttons button {
  background-color: #42b883;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin: 5px;
  font-size: 16px;
  transition: background-color 0.3s;
}

.sports-buttons button:hover {
  background-color: #36a76e;
}

.sport-details {
  margin-top: 20px;
  padding: 15px;
  background-color: #f9f9f9;
  border: 1px solid #ddd;
  border-radius: 5px;
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
