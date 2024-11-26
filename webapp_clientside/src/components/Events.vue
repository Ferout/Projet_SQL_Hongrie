<template>
  <div class="events-container">
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
    <div class="events-list">
      <ul>
        <li v-for="event in events" :key="event.event_id">
          {{ event.event_name }} - {{ formatDate(event.event_date) }} - {{ event.Number_of_place }} places - {{ event.Event_place }}
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
      events: [] // Data will be loaded from the backend
    };
  },
  methods: {
    async fetchEvents() {
      try {
        const response = await fetch('http://localhost:3000/api/events');
        
        // Log de la réponse brute pour voir ce que vous recevez
        const textResponse = await response.text(); // Récupère la réponse en texte
        console.log('Raw response:', textResponse);
        
        // Vérifiez si la réponse a un statut correct
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        
        // Si la réponse est valide, tentez de la convertir en JSON
        const data = JSON.parse(textResponse);  // Utilisation de JSON.parse() pour plus de contrôle
        this.events = data;

      } catch (error) {
        console.error("Error fetching events:", error);
      }
    },

    // Formatage de la date pour éviter "Invalid Date"
    formatDate(dateString) {
      const date = new Date(dateString);
      if (isNaN(date)) {
        return "Date invalide"; // Si la date est invalide, renvoyer une chaîne appropriée
      }
      return date.toLocaleString('fr-FR', {
        year: 'numeric', 
        month: '2-digit', 
        day: '2-digit'
      });
    },

    goToHomePage() {
      this.$router.push('/');
    }
  },
  mounted() {
    this.fetchEvents(); // Fetch events on mount
  }
};
</script>

<style scoped>
/* Styles pour la page des événements */
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

.events-container {
  text-align: center;
  margin: 40px;
}

.events-list ul {
  list-style-type: none;
  padding: 0;
}

.events-list li {
  padding: 10px;
  cursor: pointer;
}

.events-list li:hover {
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
