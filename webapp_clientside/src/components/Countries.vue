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
          <div class="actions">
          <button @click="editCountry(country)">Edit</button>
          <button @click="deleteCountry(country.ID_country)">Delete</button>
          </div>
        </li>
      </ul>
    </div>

    <button @click="showAddCountryForm" class="add-country-button">Add Country</button>
    
    <!-- Add Country Form -->
    <div v-if="showForm" class="form-container">
      <input v-model="newCountry" placeholder="Enter country name" />
      <button @click="addCountry">Add</button>
      <button @click="cancelAdd">Cancel</button>
    </div>

    <!-- Edit Country Form -->
    <div v-if="editFormVisible" class="form-container">
      <input v-model="editedCountryName" placeholder="Edit country name" />
      <button @click="updateCountry">Update</button>
      <button @click="cancelEdit">Cancel</button>
    </div>

    <button @click="goToHomePage" class="home-button">Back to Home</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      currentDate: new Date().toLocaleDateString(),
      countries: [],
      showForm: false,   // To show/hide the add country form
      newCountry: "",     // Country name input value
      editFormVisible: false, // To show/hide the edit country form
      countryToEdit: null,   // Country being edited
      editedCountryName: "", // Edited country name value
    };
  },
  methods: {
    async fetchCountries() {
      try {
        const response = await fetch('http://localhost:3000/api/countries');
        const data = await response.json();
        this.countries = Array.isArray(data) ? data : [];
      } catch (error) {
        console.error("Error fetching countries:", error);
      }
    },
    async addCountry() {
      if (!this.newCountry) return;

      const countryData = { Country_name: this.newCountry };
      try {
        const response = await fetch('http://localhost:3000/api/countries', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(countryData)
        });
        const newCountry = await response.json();
        this.countries.push(newCountry); // Add the new country to the list
        this.newCountry = ""; // Reset input
        this.showForm = false; // Hide the form
      } catch (error) {
        console.error("Error adding country:", error);
      }
    },
    async deleteCountry(countryId) {
      try {
        const response = await fetch(`http://localhost:3000/api/countries/${countryId}`, {
          method: 'DELETE'
        });
        const data = await response.json();
        if (data.rowsDeleted > 0) {
          this.countries = this.countries.filter(country => country.ID_country !== countryId); // Remove from list
        }
      } catch (error) {
        console.error("Error deleting country:", error);
      }
    },
    editCountry(country) {
      this.countryToEdit = country;
      this.editedCountryName = country.Country_name; // Pre-fill the input with the country's name
      this.editFormVisible = true; // Show the edit form
    },
    async updateCountry() {
      if (!this.editedCountryName) return;

      const updatedCountry = { Country_name: this.editedCountryName };
      try {
        const response = await fetch(`http://localhost:3000/api/countries/${this.countryToEdit.ID_country}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(updatedCountry)
        });
        const updatedData = await response.json();
        const index = this.countries.findIndex(country => country.ID_country === this.countryToEdit.ID_country);
        if (index !== -1) {
          this.countries[index] = updatedData; // Update the country in the list
        }
        this.editedCountryName = ""; // Reset input
        this.editFormVisible = false; // Hide the form
      } catch (error) {
        console.error("Error updating country:", error);
      }
    },
    cancelEdit() {
      this.editFormVisible = false; // Hide the form without updating
    },
    showAddCountryForm() {
      this.showForm = true; // Show the form to add a country
    },
    cancelAdd() {
      this.showForm = false; // Hide the form without adding a country
    },
    goToHomePage() {
      this.$router.push('/');
    }
  },
  mounted() {
    this.fetchCountries(); // Fetch countries on mount
  }
};
</script>


<style scoped>
/* Add your styling here */

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
