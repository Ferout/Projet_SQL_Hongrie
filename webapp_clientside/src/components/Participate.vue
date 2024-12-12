<template>
  <div class="participate-container">
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
          <router-link to="/countries">
            <button>Countries</button>
          </router-link>
        </div>
      </div>
    </header>

    <h2>Participation</h2>
    <div class="participation-list">
      <li
        v-for="participation in participations"
        :key="`${participation.athlete_id}-${participation.event_id}`"
        class="participation-card"
      >
        <p><strong>Athlete:</strong> {{ participation.First_name }} {{ participation.Family_name }}</p>
        <p><strong>Event:</strong> {{ participation.Event_name }}</p>
        <p><strong>Result:</strong> {{ participation.Result }}</p>
        <div class="actions" v-if="isAdmin">
          <button @click="editParticipation(participation)">Edit</button>
          <button @click="deleteParticipation(participation)">Delete</button>
        </div>
      </li>
    </div>

    <div class="actions" v-if="isAdmin">
      <h3>{{ editing ? "Edit" : "Add" }} participation</h3>
      <form @submit.prevent="handleSubmit">
        <input v-model="form.athlete_id" placeholder="Athlete ID" required />
        <input v-model="form.event_id" placeholder="Event ID" required />
        <input v-model="form.result" placeholder="Result" required />
        <button type="submit">{{ editing ? "Edit" : "Add" }}</button>
        <button v-if="editing" @click="resetForm">Cancel</button>
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
      participations: [],
      form: { athlete_id: "", event_id: "", result: "" },
      editing: false,
      editId: null,
      isAdmin: false,
    };
  },
  methods: {
    async fetchParticipations() {
      try {
        const response = await fetch("http://localhost:3000/participations");
        this.participations = await response.json();
      } catch (err) {
        console.error("Error fetching participations:", err);
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
    async handleSubmit() {
      if (this.editing) {
        await this.updateParticipation(this.editId, this.form);
      } else {
        await this.addParticipation(this.form);
      }
      this.resetForm();
      this.fetchParticipations();
    },
    async addParticipation(participation) {
      try {
        await fetch("http://localhost:3000/participations", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(participation),
        });
      } catch (err) {
        console.error("Error adding participation:", err);
      }
    },
    async updateParticipation(id, participation) {
      try {
        await fetch(`http://localhost:3000/participations/${id.athlete_id}/${id.event_id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(participation),
        });
      } catch (err) {
        console.error("Error updating participation:", err);
      }
    },
    async deleteParticipation(participation) {
      try {
        await fetch(`http://localhost:3000/participations/${participation.athlete_id}/${participation.event_id}`, {
          method: "DELETE",
        });
        this.fetchParticipations();
      } catch (err) {
        console.error("Error deleting participation:", err);
      }
    },
    editParticipation(participation) {
      this.form = { ...participation };
      this.editId = { athlete_id: participation.athlete_id, event_id: participation.event_id };
      this.editing = true;
    },
    resetForm() {
      this.form = { athlete_id: "", event_id: "", result: "" };
      this.editing = false;
      this.editId = null;
    },
    goToHomePage() {
      this.$router.push("/");
    },
  },
  mounted() {
    this.fetchParticipations();
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

.participate-container {
  text-align: center;
  margin: 40px;
}

.participation-list {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: center; /* Alignement horizontal des cartes */
  padding: 0;
  list-style: none;
}

.participation-card {
  display: flex; /* Utilisation de flexbox */
  flex-direction: column; /* Aligner les éléments en colonne */
  justify-content: center; /* Centrer verticalement */
  align-items: center; /* Centrer horizontalement */
  flex: 1 1 calc(33.333% - 20px); /* Taille flexible : 3 cartes par ligne */
  box-sizing: border-box;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 15px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  background-color: #f9f9f9;
  text-align: center; /* Centrer le texte */
}

.participation-card p {
  margin: 5px 0;
  font-size: 16px; /* Taille de police pour une meilleure lisibilité */
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

form input {
  margin: 5px 0;
  padding: 8px;
  width: 100%;
  max-width: 300px;
}

form button {
  background-color: #42b883;
  color: white;
  border: none;
  padding: 10px 15px;
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

.participate-container {
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
