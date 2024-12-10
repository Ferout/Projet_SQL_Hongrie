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
      <ul>
        <li v-for="participation in participations" :key="`${participation.athlete_id}-${participation.event_id}`">
          {{ participation.First_name }} {{ participation.Family_name }} - {{ participation.Event_name }} - {{ participation.Result }}
          <div class="actions" v-if="isAdmin">
            <button @click="deleteParticipation(participation)">Supprimer</button>
            <button @click="editParticipation(participation)">Modifier</button>
          </div>
        </li>
      </ul>
    </div>

    <div class="actions" v-if="isAdmin">
      <h3>{{ editing ? "Modifier" : "Ajouter" }} une participation</h3>
      <form @submit.prevent="handleSubmit">
        <input v-model="form.athlete_id" placeholder="Athlete ID" required />
        <input v-model="form.event_id" placeholder="Event ID" required />
        <input v-model="form.result" placeholder="Result" required />
        <button type="submit">{{ editing ? "Mettre à jour" : "Ajouter" }}</button>
        <button v-if="editing" @click="resetForm">Annuler</button>
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
      participations: [],
      form: { athlete_id: "", event_id: "", result: "" },
      editing: false,
      editId: null,
      isAdmin: false, // Défini par défaut comme non-admin
    };
  },
  methods: {
    async fetchParticipations() {
      try {
        const response = await fetch("http://localhost:3000/api/participations");
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
        await fetch("http://localhost:3000/api/participations", {
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
        await fetch(`http://localhost:3000/api/participations/${id.athlete_id}/${id.event_id}`, {
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
        await fetch(`http://localhost:3000/api/participations/${participation.athlete_id}/${participation.event_id}`, {
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
/* Styles pour la page de participation */
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

.participation-list ul {
  list-style-type: none;
  padding: 0;
}

.participation-list li {
  padding: 10px;
  cursor: pointer;
}

.participation-list li:hover {
  background-color: #f0f0f0;
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
</style>
