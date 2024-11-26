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
        </li>
      </ul>
    </div>

    <button @click="goToHomePage" class="home-button">Back to Home</button>
  </div>
</template>
 
<script>
export default {
  data() {
    return {
      currentDate: new Date().toLocaleDateString(),
      countries: [] // Data will be loaded from the backend
    };
  },
  methods: {
    async fetchCountries() {
      try {
        const response = await fetch('http://localhost:3000/api/countries');
        const data = await response.json();
        // Assurez-vous que data est un tableau
        this.countries = Array.isArray(data) ? data : [];
      } catch (error) {
        console.error("Error fetching countries:", error);
      }
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
/* Styles for the countries page */
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
