<template>
  <div class="participate-container">
    <header class="header">
      <div class="header-content">
        <span>{{ currentDate }}</span>
        <div class="nav-buttons">
          <router-link to="/countries">
            <button>Countries</button>
          </router-link>
          <router-link to="/sports">
            <button>Sports</button>
          </router-link>
          <router-link to="/events">
            <button>Events</button>
          </router-link>
          <router-link to="/Athletes">
            <button>Athletes</button>
          </router-link>
        </div>
      </div>
    </header>

    <h2>Participation</h2>
    <div class="participation-list">
      <ul>
        <li v-for="participation in participations" :key="participation.id">
          {{ participation.First_name }} {{ participation.Family_name }} - {{ participation.Event_name }} - {{ participation.Result }}
          <button @click="deleteParticipation(participation.id)">Delete</button>
          <button @click="editParticipation(participation)">Edit</button>
        </li>
      </ul>
    </div>

    <div>
      <h3>Add / Edit Participation</h3>
      <form @submit.prevent="handleSubmit">
        <input v-model="form.athlete_id" placeholder="Athlete ID" required />
        <input v-model="form.event_id" placeholder="Event ID" required />
        <input v-model="form.result" placeholder="Result" required />
        <button type="submit">{{ editing ? "Update" : "Add" }} Participation</button>
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
    };
  },
  methods: {
    async fetchParticipations() {
      try {
        const response = await fetch('http://localhost:3000/api/participations');
        this.participations = await response.json();
      } catch (error) {
        console.error("Error fetching participations:", error);
      }
    },
    async handleSubmit() {
      if (this.editing) {
        // Update Participation
        await this.updateParticipation(this.editId, this.form);
      } else {
        // Add Participation
        await this.addParticipation(this.form);
      }
      this.resetForm();
      this.fetchParticipations();
    },
    async addParticipation(participation) {
      try {
        await fetch('http://localhost:3000/api/participations', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(participation),
        });
      } catch (error) {
        console.error("Error adding participation:", error);
      }
    },
    async updateParticipation(id, participation) {
      try {
        await fetch(`http://localhost:3000/api/participations/${id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(participation),
        });
      } catch (error) {
        console.error("Error updating participation:", error);
      }
    },
    async deleteParticipation(id) {
      try {
        await fetch(`http://localhost:3000/api/participations/${id}`, { method: 'DELETE' });
        this.fetchParticipations();
      } catch (error) {
        console.error("Error deleting participation:", error);
      }
    },
    editParticipation(participation) {
      this.form = { ...participation };
      this.editId = participation.id;
      this.editing = true;
    },
    resetForm() {
      this.form = { athlete_id: "", event_id: "", result: "" };
      this.editing = false;
      this.editId = null;
    },
    goToHomePage() {
      this.$router.push('/');
    },
  },
  mounted() {
    this.fetchParticipations();
  },
};

</script>

<style scoped>
/* Styles for the participate page */
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
