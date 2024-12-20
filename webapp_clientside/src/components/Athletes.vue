<template>
  <div class="athlete-container">
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
          <router-link to="/participate">
            <button>Participate</button>
          </router-link>
        </div>
      </div>
    </header>

    <div class="athletes-container">
      <h2>Athletes</h2>
      <div class="athlete-list">
        <li v-for="athlete in athletes" :key="athlete.ID_Athlete" class="athlete-card">
          <div>
            <p><strong>Name:</strong> {{ athlete.First_name }} {{ athlete.Family_name }}</p>
            <p><strong>Age:</strong> {{ athlete.Age }}</p>
            <p><strong>Address:</strong> {{ athlete.Adress }}</p>
            <p><strong>Phone:</strong> {{ athlete.Phone_number }}</p>
            <p><strong>Country:</strong> {{ athlete.Country_name }}</p>
            <div class="actions" v-if="isAdmin">
              <button @click="editAthlete(athlete)">Edit</button>
              <button @click="deleteAthlete(athlete.ID_Athlete)">Delete</button>
            </div>
          </div>
        </li>
      </div>

      <h3 v-if="isAdmin">Add New Athlete</h3>
      <form v-if="isAdmin" @submit.prevent="addAthlete">
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
      athletes: [],
      newAthlete: {
        First_name: "",
        Family_name: "",
        Age: null,
        Adress: "",
        Phone_number: "",
        ID_country: null,
      },
      editingAthlete: null,
      isAdmin: false,
    };
  },
  methods: {
    async fetchAthletes() {
      try {
        const response = await fetch("http://localhost:3000/athletes");
        const data = await response.json();
        this.athletes = data;
      } catch (error) {
        console.error("Error fetching athletes:", error);
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
    async addAthlete() {
      try {
        const response = await fetch("http://localhost:3000/athletes", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(this.newAthlete),
        });
        if (response.ok) {
          this.fetchAthletes();
          this.newAthlete = {
            First_name: "",
            Family_name: "",
            Age: null,
            Adress: "",
            Phone_number: "",
            ID_country: null,
          };
        }
      } catch (error) {
        console.error("Error adding athlete:", error);
      }
    },
    async editAthlete(athlete) {
      this.editingAthlete = { ...athlete };
    },
    async updateAthlete() {
      try {
        const response = await fetch(
          `http://localhost:3000/athletes/${this.editingAthlete.ID_Athlete}`,
          {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(this.editingAthlete),
          }
        );
        if (response.ok) {
          this.fetchAthletes();
          this.editingAthlete = null;
        }
      } catch (error) {
        console.error("Error updating athlete:", error);
      }
    },
    async deleteAthlete(athleteId) {
      try {
        const response = await fetch(`http://localhost:3000/athletes/${athleteId}`,
          { method: "DELETE" }
        );
        if (response.ok) {
          this.fetchAthletes();
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
    this.loadAdminStatus();
  },
};
</script>


<style> 


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

.athletes-container {
  margin-top: 70px;
  padding: 20px;
}

.athlete-list {
  display: flex;
  flex-wrap: wrap;
  gap: 20px; 
  padding: 0;
  list-style: none; 
}

.athlete-card {
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

.athlete-card p {
  margin: 5px 0;
  font-size: 16px; 
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
  margin-top: 10px;
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


.athlete-container {
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