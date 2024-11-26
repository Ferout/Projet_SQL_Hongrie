<template>
  <div class="athlete-container">
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
          <router-link to="/events">
            <button>Events</button>
          </router-link>
        </div>
      </div>
    </header>

    <h2>Athletes</h2>
    <div class="athlete-list">
      <ul>
        <li v-for="athlete in athletes" :key="athlete.ID_Athlete">
          <div>
            <p><strong>Name:</strong> {{ athlete.First_name }} {{ athlete.Family_name }}</p>
            <p><strong>Age:</strong> {{ athlete.Age }}</p>
            <p><strong>Address:</strong> {{ athlete.Adress }}</p>
            <p><strong>Phone:</strong> {{ athlete.Phone_number }}</p>
            <p><strong>Country:</strong> {{ athlete.Country_name }}</p>
            <div class="actions">
              <button @click="editAthlete(athlete)">Edit</button>
              <button @click="deleteAthlete(athlete.ID_Athlete)">Delete</button>
            </div>
          </div>
        </li>
      </ul>
    </div>

    <h3>Add New Athlete</h3>
    <form @submit.prevent="addAthlete">
      <input v-model="newAthlete.First_name" placeholder="First Name" required />
      <input v-model="newAthlete.Family_name" placeholder="Family Name" required />
      <input v-model="newAthlete.Age" type="number" placeholder="Age" required />
      <input v-model="newAthlete.Adress" placeholder="Address" required />
      <input v-model="newAthlete.Phone_number" placeholder="Phone Number" required />
      <div>
        <label for="id_country">ID Country:</label>
        <input
          type="number"
          id="id_country"
          v-model="newAthlete.ID_country"
          required
          placeholder="Enter Country ID"
        />
      </div>
      <button type="submit">Add Athlete</button>
    </form>

    <h3 v-if="editingAthlete">Edit Athlete</h3>
    <form v-if="editingAthlete" @submit.prevent="updateAthlete">
      <input v-model="editingAthlete.First_name" placeholder="First Name" required />
      <input v-model="editingAthlete.Family_name" placeholder="Family Name" required />
      <input v-model="editingAthlete.Age" type="number" placeholder="Age" required />
      <input v-model="editingAthlete.Adress" placeholder="Address" required />
      <input v-model="editingAthlete.Phone_number" placeholder="Phone Number" required />
      <input v-model="editingAthlete.ID_country" type="number" placeholder="Country ID" required />
      <button type="submit">Update Athlete</button>
    </form>

    <button @click="goToHomePage" class="home-button">Back to Home</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      currentDate: new Date().toLocaleDateString(),
      athletes: [], // Liste des athlètes
      newAthlete: {
        First_name: "",
        Family_name: "",
        Age: null,
        Adress: "",
        Phone_number: "",
        ID_country: null, // ID du pays
      },
      editingAthlete: null,  // Variable pour l'athlète en cours d'édition
    };
  },
  methods: {
    async fetchAthletes() {
      try {
        const response = await fetch("http://localhost:3000/api/athletes");
        const data = await response.json();
        this.athletes = data;
      } catch (error) {
        console.error("Error fetching athletes:", error);
      }
    },
    async addAthlete() {
      try {
        const response = await fetch("http://localhost:3000/api/athletes", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(this.newAthlete),
        });
        if (response.ok) {
          this.fetchAthletes(); // Rafraîchir la liste
          this.newAthlete = {
            First_name: "",
            Family_name: "",
            Age: null,
            Adress: "",
            Phone_number: "",
            ID_country: null, // Réinitialiser l'ID pays
          }; // Réinitialiser le formulaire
        }
      } catch (error) {
        console.error("Error adding athlete:", error);
      }
    },
    async editAthlete(athlete) {
      // Initialise l'athlète à modifier
      this.editingAthlete = { ...athlete };
    },
    async updateAthlete() {
      try {
        const response = await fetch(`http://localhost:3000/api/athletes/${this.editingAthlete.ID_Athlete}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(this.editingAthlete), // Envoi des données mises à jour
        });

        if (response.ok) {
          this.fetchAthletes(); // Rafraîchir la liste des athlètes après la mise à jour
          this.editingAthlete = null;  // Réinitialiser l'athlète en cours d'édition
        } else {
          console.error('Erreur de mise à jour de l\'athlète', response);
        }
      } catch (error) {
        console.error('Erreur de mise à jour:', error);
      }
    },
    async deleteAthlete(athleteId) {
      try {
        const response = await fetch(`http://localhost:3000/api/athletes/${athleteId}`, {
          method: "DELETE",
        });
        if (response.ok) {
          this.fetchAthletes(); // Rafraîchir la liste
        }
      } catch (error) {
        console.error("Error deleting athlete:", error);
      }
    },
    goToHomePage() {
      this.$router.push("/");
    },
  },
  mounted() {
    this.fetchAthletes();
  },
};
</script>

<style scoped>
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

form {
  margin-top: 20px;
}

form input {
  display: block;
  margin-bottom: 10px;
  padding: 8px;
  width: 300px;
  margin: 5px auto;
}

form button {
  padding: 10px 20px;
  background-color: #42b883;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

form button:hover {
  background-color: #36a76e;
}
</style>
