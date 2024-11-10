<template>
  <div class="athletes-container">
    <header class="header">
      <div class="header-content">
        <span>{{ currentDate }}</span>
        <div class="nav-buttons">
          <router-link to="/countries">
            <button>Countries</button>
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

    <h2>Athletes Search</h2>

    <div class="search-and-toggle-container">
      <input type="text" v-model="searchQuery" @input="searchAthletes" placeholder="Search for an athlete...">
      <button @click="toggleAthletesList" class="toggle-button">
        {{ showAllAthletes ? 'Hide All Athletes' : 'Show All Athletes' }}
      </button>
    </div>

    <ul v-if="filteredAthletes.length > 0 && searchQuery !== '' && !selectedAthlete && !showAllAthletes">
      <li v-for="athlete in filteredAthletes" :key="athlete.firstName" @click="selectAthlete(athlete)">
        {{ athlete.firstName }} {{ athlete.familyName }}
      </li>
    </ul>

    <div v-if="selectedAthlete">
      <h3>Details of {{ selectedAthlete.firstName }} {{ selectedAthlete.familyName }}</h3>
      <p><strong>Age:</strong> {{ selectedAthlete.age }}</p>
      <p><strong>Address:</strong> {{ selectedAthlete.address }}</p>
      <p><strong>Phone Number:</strong> {{ selectedAthlete.phoneNumber }}</p>
      <p><strong>Country:</strong> {{ selectedAthlete.country }}</p>
    </div>

    <div v-if="showAllAthletes">
      <ul>
        <li v-for="athlete in athletes" :key="athlete.firstName" @click="selectAthlete(athlete)">
          {{ athlete.firstName }} {{ athlete.familyName }}
        </li>
      </ul>
    </div>

    <button @click="goToHomePage" class="home-button">Back to Home</button>
  </div>
</template>

<script>
export default {
  name: 'Athletes',
  data() {
    return {
      currentDate: new Date().toLocaleDateString(),
      searchQuery: '',
      selectedAthlete: null,
      showAllAthletes: false,
      athletes: this.loadAthletes() || [
        { firstName: 'Léon', familyName: 'Marchand', age: 22, address: 'Paris', phoneNumber: '0123456789', country: 'France' },
        { firstName: 'Scott', familyName: 'D.', age: 36, address: 'London', phoneNumber: '0123456781', country: 'England' },
        { firstName: 'Wang', familyName: 'S.', age: 32, address: 'Tokyo', phoneNumber: '0123456782', country: 'China' },
        { firstName: 'Kevin', familyName: 'Durant', age: 34, address: 'Washington', phoneNumber: '0123456783', country: 'USA' },
        { firstName: 'Katie', familyName: 'Ledecky', age: 27, address: 'Bethesda', phoneNumber: '0123456784', country: 'USA' },
        { firstName: 'Luka', familyName: 'Modrić', age: 39, address: 'Zagreb', phoneNumber: '0123456785', country: 'Croatia' }
      ]
    };
  },
  computed: {
    filteredAthletes() {
      return this.athletes.filter(athlete => 
        (athlete.firstName + ' ' + athlete.familyName).toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    }
  },
  methods: {
    goToHomePage() {
      this.$router.push('/');
    },
    searchAthletes() {
      this.selectedAthlete = null;
      this.showAllAthletes = false;
    },
    selectAthlete(athlete) {
      this.selectedAthlete = athlete;
      this.showAllAthletes = false;
      this.searchQuery = '';
    },
    toggleAthletesList() {
      this.showAllAthletes = !this.showAllAthletes;
      this.searchQuery = '';
      if (this.showAllAthletes) {
        this.selectedAthlete = null;
      }
    },
    saveAthletes() {
      localStorage.setItem('athletes', JSON.stringify(this.athletes));
    },
    loadAthletes() {
      const athletes = localStorage.getItem('athletes');
      return athletes ? JSON.parse(athletes) : null;
    }
  }
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

.athletes-container {
  text-align: center;
  margin: 40px;
}

.search-and-toggle-container {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  margin-bottom: 20px;
}

input {
  padding: 5px;
  border-radius: 3px;
  border: 1px solid #ccc;
  width: 200px;
}

.toggle-button {
  background-color: #42b883;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s;
}

.toggle-button:hover {
  background-color: #36a76e;
}

ul {
  list-style-type: none;
  padding: 0;
}

ul li {
  padding: 10px;
  cursor: pointer;
}

ul li:hover {
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
