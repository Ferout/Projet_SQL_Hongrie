<template>
  <div class="participate-container">
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
          <router-link to="/sports">
            <button>Sports</button>
          </router-link>
          <router-link to="/athletes">
            <button>Athletes</button>
          </router-link>
        </div>
      </div>
    </header>
    <h2>Athletes' Participation Results</h2>
    <div class="info-table">
      <div v-for="participant in participants" :key="participant.id" class="participant-row">
        <p><strong>Athlete:</strong> {{ participant.name }}</p>
        <p><strong>Event:</strong> {{ participant.event }}</p>
        <p><strong>Result:</strong> {{ participant.result }}</p>
      </div>
    </div>
    <button @click="goToHomePage" class="home-button">Back to Home</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      currentDate: new Date().toLocaleDateString(),
      participants: [
        { id: 1, name: 'Léon Marchand', event: '100 meters Swimming', result: '1st place' },
        { id: 2, name: 'Caeleb Dressel', event: '100 meters Freestyle', result: '2nd place' },
        { id: 3, name: 'Katie Ledecky', event: '800 meters Freestyle', result: '1st place' },
        { id: 4, name: 'Simone Biles', event: 'Gymnastics All-Around', result: '1st place' },
        { id: 5, name: 'Usain Bolt', event: '200 meters', result: '1st place' }
      ]
    };
  },
  methods: {
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

.participate-container {
  text-align: center;
  margin: 40px;
}

.info-table {
  width: 80%;
  margin: 0 auto;
}

.participant-row {
  margin-bottom: 15px;
  background-color: #f9f9f9;
  border-radius: 5px;
  padding: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
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
