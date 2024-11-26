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
          {{ event.event_name }} - {{ formatDate(event.event_date) }} - 
          {{ event.Number_of_place }} places - {{ event.Event_place }}
          <div class="actions">
            <button @click="editEvent(event)">Edit</button>
            <button @click="deleteEvent(event.event_id)">Delete</button>
          </div>
        </li>
      </ul>
    </div>

    <form @submit.prevent="saveEvent">
      <h3>{{ editing ? "Edit Event" : "Add Event" }}</h3>
      <input v-model="form.event_name" placeholder="Event Name" required />
      <input v-model="form.event_date" type="date" required />
      <input v-model="form.Event_place" placeholder="Event Place" required />
      <input v-model.number="form.Number_of_place" type="number" placeholder="Number of Places" required />
      <button type="submit">{{ editing ? "Update" : "Add" }}</button>
      <button type="button" v-if="editing" @click="cancelEdit">Cancel</button>
    </form>

    <button @click="goToHomePage" class="home-button">Back to Home</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      currentDate: new Date().toLocaleDateString(),
      events: [],
      form: {
        event_id: null,
        event_name: "",
        event_date: "",
        Event_place: "",
        Number_of_place: 0,
      },
      editing: false,
    };
  },
  methods: {
    async fetchEvents() {
      try {
        const response = await fetch("http://localhost:3000/api/events");
        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
        this.events = await response.json();
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    },
    async saveEvent() {
      try {
        const url = this.editing
          ? `http://localhost:3000/api/events/${this.form.event_id}`
          : "http://localhost:3000/api/events";
        const method = this.editing ? "PUT" : "POST";
        const response = await fetch(url, {
          method,
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(this.form),
        });

        if (!response.ok) {
          const error = await response.json();
          throw new Error(error.error || "Unknown error");
        }
        this.fetchEvents();
        this.resetForm();
      } catch (error) {
        alert(`Error saving event: ${error.message}`);
        console.error("Error saving event:", error);
      }
    },

    async deleteEvent(ID_events) {
      try {
        const response = await fetch(`http://localhost:3000/api/events/${ID_events}`, {
          method: "DELETE",
        });
        if (response.ok) {
          this.fetchEvents(); // Rafraîchir la liste des événements après suppression
        } else {
          console.error("Erreur lors de la suppression de l'événement", response);
        }
      } catch (error) {
        console.error("Erreur lors de la suppression de l'événement:", error);
      }
    },

    async updateEvent() {
      try {
        const response = await fetch(`http://localhost:3000/api/events/${this.form.event_id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(this.form), // Envoi des données mises à jour
        });

        if (response.ok) {
          this.fetchEvents(); // Rafraîchir la liste des événements après la mise à jour
          this.resetForm();  // Réinitialiser le formulaire d'édition
        } else {
          console.error('Erreur de mise à jour de l\'événement', response);
        }
      } catch (error) {
        console.error('Erreur de mise à jour:', error);
      }
    },

    cancelEdit() {
      this.resetForm();
    },
    resetForm() {
      this.form = {
        event_id: null,
        event_name: "",
        event_date: "",
        Event_place: "",
        Number_of_place: 0,
      };
      this.editing = false;
    },
    formatDate(dateString) {
      const date = new Date(dateString);
      return isNaN(date)
        ? "Invalid Date"
        : date.toLocaleDateString("fr-FR", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
          });
    },
    goToHomePage() {
      this.$router.push("/");
    },
  },
  mounted() {
    this.fetchEvents();
  },
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
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.header-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.nav-buttons button {
  background-color: #42b883;
  color: white;
  border: none;
  padding: 10px;
  margin-left: 5px;
  cursor: pointer;
}

.events-list {
  padding: 50px 10px 20px;
}

.actions button {
  margin-left: 10px;
}

form {
  margin-top: 20px;
}

form input {
  margin: 5px 0;
  padding: 10px;
  width: 100%;
  max-width: 400px;
}

form button {
  background-color: #42b883;
  color: white;
  border: none;
  padding: 10px 20px;
  cursor: pointer;
}

.home-button {
  margin-top: 20px;
  background-color: #42b883;
  color: white;
  border: none;
  padding: 10px;
  cursor: pointer;
}
</style>
