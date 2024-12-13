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
      <div
        v-for="event in events"
        :key="event.ID_events"
        class="event-card"
      >
        <p><strong>{{ event.event_name }}</strong></p>
        <p>Date: {{ formatDate(event.event_date) }}</p>
        <p>Places: {{ event.Number_of_place }}</p>
        <p>Location: {{ event.Event_place }}</p>
        <div class="actions" v-if="isAdmin">
          <button class="edit-btn" @click="openEditForm(event)">Edit</button>
          <button @click="deleteEvent(event.ID_events)">Delete</button>
        </div>
      </div>
    </div>

    <form v-if="isAdmin" @submit.prevent="saveEvent">
      <h3>Add Event</h3>
      <input v-model="addForm.event_name" placeholder="Event Name" required />
      <input v-model="addForm.event_date" type="date" required />
      <input v-model="addForm.Event_place" placeholder="Event Place" required />
      <input v-model.number="addForm.Number_of_place" type="number" placeholder="Number of Places" required />
      <button type="submit">Add Event</button>
    </form>

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
      events: [],
      addForm: {
        event_name: "",
        event_date: "",
        Event_place: "",
        Number_of_place: 0,
      },
      editForm: {
        ID_events: null,
        event_name: "",
        event_date: "",
        Event_place: "",
        Number_of_place: 0,
      },
      editing: false,
      isAdmin: false,
    };
  },
  methods: {
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
    prepareEventDate(dateString) {
      const date = new Date(dateString);
      return isNaN(date) ? "" : date.toISOString().split("T")[0];
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
    async saveEvent() {
      try {
        const formattedEventDate = this.prepareEventDate(this.addForm.event_date);
        this.addForm.event_date = formattedEventDate;

        const url = this.editing
          ? `http://localhost:3000/events/${this.editForm.ID_events}`
          : "http://localhost:3000/events";
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
        const formattedEventDate = this.prepareEventDate(this.editForm.event_date);
        this.editForm.event_date = formattedEventDate;

        const response = await fetch(`http://localhost:3000/events/${this.editForm.ID_events}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(this.editForm),
        });

        if (response.ok) {
          this.fetchEvents();
          this.resetForm();
        } else {
          console.error("Erreur de mise à jour de l'événement", response);
        }
      } catch (error) {
        console.error("Erreur de mise à jour:", error);
      }
    },
    openEditForm(event) {
      this.editForm = { ...event };
      this.editing = true;
    },
    async deleteEvent(ID_events) {
      try {
        const response = await fetch(`http://localhost:3000/events/${ID_events}`, {
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
        const response = await fetch("http://localhost:3000/events");
        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
        this.events = await response.json();
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    },
  },
  mounted() {
    this.fetchEvents();
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

.events-list {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: center;
  padding: 20px;
}

.event-card {
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

.event-card p {
  margin: 5px 0;
  font-size: 16px;
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

.events-container {
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
  border-radius: 8px;
}
</style>
