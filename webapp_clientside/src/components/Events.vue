<template>
  <div class="countries-container">
    <header class="header">
      <div class="header-content">
        <span>{{ currentDate }}</span>
        <div class="nav-buttons">
          <router-link to="/athletes">
            <button>Athletes</button>
          </router-link>
          <router-link to="/events">
            <button>Events</button>
          </router-link>
          <router-link to="/sports">
            <button>Sports</button>
          </router-link>
          <router-link to="/participate">
            <button>Participate</button>
          </router-link>
        </div>
      </div>
    </header>
    <h2>Events</h2>
    <div class="events-buttons">
      <button v-for="event in events" :key="event.id" @click="showEventDetails(event)">
        {{ event.name }}
      </button>
    </div>
    <div v-if="selectedEvent" class="event-details">
      <h3>{{ selectedEvent.name }}</h3>
      <p><strong>Description:</strong> {{ selectedEvent.description }}</p>
      <p><strong>Date:</strong> {{ selectedEvent.date }}</p>
      <p><strong>Location:</strong> {{ selectedEvent.location }}</p>
    </div>
    <button @click="goToHomePage" class="home-button">Back to Home</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      currentDate: new Date().toLocaleDateString(),
      selectedEvent: null,
      events: [
        { id: 1, name: 'Opening Ceremony', description: 'The grand opening of the Olympics', date: '2024-07-26', location: 'Paris' },
        { id: 2, name: '100m Sprint', description: 'Men\'s 100m sprint race', date: '2024-07-28', location: 'Stade de France' },
        { id: 3, name: 'Gymnastics Finals', description: 'Finals of the gymnastics competition', date: '2024-08-01', location: 'Bercy Arena' },
        { id: 4, name: 'Football Final', description: 'The men\'s football final match', date: '2024-08-10', location: 'Parc des Princes' },
        // Add more events as needed
      ]
    };
  },
  methods: {
    showEventDetails(event) {
      this.selectedEvent = event;
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

.events-buttons {
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.events-buttons button {
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

.events-buttons button:hover {
  background-color: #36a76e;
}

.event-details {
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
