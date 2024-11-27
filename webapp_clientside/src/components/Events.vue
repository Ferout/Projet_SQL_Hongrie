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

    <!-- Section des événements -->
    <h2>Events</h2>
    <div class="events-list">
      <ul>
        <li v-for="event in events" :key="event.ID_events">
          {{ event.event_name }} - {{ formatDate(event.event_date) }} - 
          {{ event.Number_of_place }} places - {{ event.Event_place }}
          <div class="actions">
            <button class="edit-btn" @click="openEditForm(event)">Edit</button>
            <button @click="deleteEvent(event.ID_events)">Delete</button>
          </div>
        </li>
      </ul>
    </div>

    <!-- Formulaire d'ajout d'événement (toujours visible) -->
    <form @submit.prevent="saveEvent">
      <h3>Add Event</h3>
      <input v-model="addForm.event_name" placeholder="Event Name" required />
      <input v-model="addForm.event_date" type="date" required />
      <input v-model="addForm.Event_place" placeholder="Event Place" required />
      <input v-model.number="addForm.Number_of_place" type="number" placeholder="Number of Places" required />
      <button type="submit">Add Event</button>
    </form>

    <!-- Formulaire d'édition d'événement (affiché uniquement si un événement est sélectionné pour modification) -->
    <div v-if="editing">
      <h2>Edit Event</h2>
      <form @submit.prevent="updateEvent">
        <input v-model="editForm.event_name" placeholder="Event Name" required />
        <input v-model="editForm.event_date" type="date" required />
        <input v-model="editForm.Event_place" placeholder="Event Place" required />
        <input v-model="editForm.Number_of_place" type="number" required />
        <button type="submit">Update Event</button>
        <button @click="cancelEdit">Cancel</button>
      </form>
    </div>

    <button @click="goToHomePage" class="home-button">Back to Home</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      currentDate: new Date().toLocaleDateString(),
      events: [],
      // Formulaire d'ajout d'événement
      addForm: {
        event_name: "",
        event_date: "",
        Event_place: "",
        Number_of_place: 0,
      },
      // Formulaire d'édition d'événement
      editForm: {
        ID_events: null,
        event_name: "",
        event_date: "",
        Event_place: "",
        Number_of_place: 0,
      },
      editing: false,
    };
  },
  methods: {
    // Formater la date pour l'affichage
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

    // Récupérer la date dans le format YYYY-MM-DD lors de l'envoi du formulaire
    prepareEventDate(dateString) {
      const date = new Date(dateString);
      return isNaN(date) ? "" : date.toISOString().split('T')[0]; // 'YYYY-MM-DD'
    },

    async saveEvent() {
      try {
        // Avant de soumettre, formatons la date pour l'ajouter au bon format
        const formattedEventDate = this.prepareEventDate(this.addForm.event_date);
        this.addForm.event_date = formattedEventDate;

        const url = this.editing
          ? `http://localhost:3000/api/events/${this.editForm.ID_events}`
          : "http://localhost:3000/api/events";
        const method = this.editing ? "PUT" : "POST";
        const response = await fetch(url, {
          method,
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(this.editing ? this.editForm : this.addForm),
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

    async updateEvent() {
      try {
        // Avant de soumettre, formatons la date pour l'ajouter au bon format
        const formattedEventDate = this.prepareEventDate(this.editForm.event_date);
        this.editForm.event_date = formattedEventDate;

        const response = await fetch(`http://localhost:3000/api/events/${this.editForm.ID_events}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(this.editForm),
        });

        if (response.ok) {
          this.fetchEvents();
          this.resetForm();
        } else {
          console.error('Erreur de mise à jour de l\'événement', response);
        }
      } catch (error) {
        console.error('Erreur de mise à jour:', error);
      }
    },

    openEditForm(event) {
      // Copier les données de l'événement dans le formulaire d'édition
      this.editForm = { ...event };
      this.editing = true;
    },

    async deleteEvent(ID_events) {
      try {
        const response = await fetch(`http://localhost:3000/api/events/${ID_events}`, {
          method: "DELETE",
        });
        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
        this.fetchEvents();
      } catch (error) {
        console.error("Error deleting event:", error);
      }
    },

    cancelEdit() {
      this.resetForm();
    },

    resetForm() {
      this.addForm = {
        event_name: "",
        event_date: "",
        Event_place: "",
        Number_of_place: 0,
      };
      this.editForm = {
        ID_events: null,
        event_name: "",
        event_date: "",
        Event_place: "",
        Number_of_place: 0,
      };
      this.editing = false;
    },

    goToHomePage() {
      this.$router.push("/");
    },

    async fetchEvents() {
      try {
        const response = await fetch("http://localhost:3000/api/events");
        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
        this.events = await response.json();
      } catch (error) {
        console.error("Error fetching events:", error);
      }
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
