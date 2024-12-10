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

    <h2>Countries</h2>
    <div class="countries-list">
      <ul>
        <li v-for="country in countries" :key="country.ID_country">
          {{ country.Country_name }}
          <div class="actions" v-if="isAdmin">
            <button @click="editCountry(country)">Edit</button>
            <button @click="deleteCountry(country.ID_country)">Delete</button>
          </div>
        </li>
      </ul>
    </div>

    <button v-if="isAdmin" @click="showAddCountryForm" class="add-country-button">
      Add Country
    </button>

    <!-- Formulaire Ajouter un Pays -->
    <div v-if="showForm" class="form-container">
      <input v-model="newCountry" placeholder="Enter country name" />
      <div class="actions">
        <button @click="addCountry">Add</button>
        <button @click="cancelAdd">Cancel</button>
      </div>
    </div>

    <!-- Formulaire Modifier un Pays -->
    <div v-if="editFormVisible" class="form-container">
      <input v-model="editedCountryName" placeholder="Edit country name" />
      <div class="actions">
        <button @click="updateCountry">Update</button>
        <button @click="cancelEdit">Cancel</button>
      </div>
    </div>

    <button @click="goToHomePage" class="home-button">Back to Home</button>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      currentDate: new Date().toLocaleDateString(),
      countries: [],
      showForm: false,
      editFormVisible: false,
      newCountry: "",
      countryToEdit: null,
      editedCountryName: "",
      isAdmin: false, // Défaut non-admin
    };
  },
  methods: {
    async fetchCountries() {
      try {
        const response = await axios.get("http://localhost:3000/api/countries");
        this.countries = response.data || [];
      } catch (error) {
        console.error("Error fetching countries:", error);
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

      if (isAdmin === 1) {
        console.log("Admin status loaded from localStorage:", isAdmin);
        this.isAdmin = true;
      } else {
        console.warn("User is not admin");
        this.isAdmin = false;
      }
    },
    async addCountry() {
      if (!this.newCountry) return;

      try {
        const response = await axios.post("http://localhost:3000/api/countries", {
          Country_name: this.newCountry,
        });
        this.countries.push(response.data);
        this.newCountry = "";
        this.showForm = false;
      } catch (error) {
        console.error("Error adding country:", error);
      }
    },
    async deleteCountry(countryId) {
      try {
        await axios.delete(`http://localhost:3000/api/countries/${countryId}`);
        this.countries = this.countries.filter(
          (country) => country.ID_country !== countryId
        );
      } catch (error) {
        console.error("Error deleting country:", error);
      }
    },
    editCountry(country) {
      this.countryToEdit = country;
      this.editedCountryName = country.Country_name;
      this.editFormVisible = true;
    },
    async updateCountry() {
      if (!this.editedCountryName) return;

      const updatedCountry = { Country_name: this.editedCountryName };
      try {
        const response = await axios.put(
          `http://localhost:3000/api/countries/${this.countryToEdit.ID_country}`,
          updatedCountry
        );
        const index = this.countries.findIndex(
          (country) => country.ID_country === this.countryToEdit.ID_country
        );
        if (index !== -1) {
          this.countries[index] = response.data;
        }
        this.editedCountryName = "";
        this.editFormVisible = false;
      } catch (error) {
        console.error("Error updating country:", error);
      }
    },
    cancelEdit() {
      this.editFormVisible = false;
    },
    showAddCountryForm() {
      this.showForm = true;
    },
    cancelAdd() {
      this.showForm = false;
    },
    goToHomePage() {
      this.$router.push("/");
    },
  },
  async mounted() {
    await this.fetchCountries();
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

.countries-container {
  text-align: center;
  margin: 40px;
}

.countries-list ul {
  list-style-type: none;
  padding: 0;
}

.countries-list li {
  padding: 10px;
  cursor: pointer;
}

.countries-list li:hover {
  background-color: #f0f0f0;
}

.add-country-button,
.home-button {
  background-color: #42b883;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  margin-top: 20px;
}

.home-button:hover {
  background-color: #36a76e;
}

.form-container {
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.form-container input {
  padding: 8px;
  margin-bottom: 10px;
  font-size: 14px;
  width: 200px;
}

.form-container button {
  padding: 8px 16px;
  font-size: 14px;
  margin-top: 5px;
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
</style>
