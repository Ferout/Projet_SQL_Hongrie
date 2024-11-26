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
          <!-- Afficher les informations de chaque athlète -->
          <div>
            <p><strong>Name:</strong> {{ athlete.First_name }} {{ athlete.Family_name }}</p>
            <p><strong>Age:</strong> {{ athlete.Age }}</p>
            <p><strong>Address:</strong> {{ athlete.Adress }}</p>
            <p><strong>Phone:</strong> {{ athlete.Phone_number }}</p>
            <p><strong>Country:</strong> {{ athlete.Country_name }}</p>
          </div>
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
      athletes: []  // Liste des athlètes à afficher
    };
  },
  methods: {
    async fetchAthletes() {
      try {
        const response = await fetch('http://localhost:3000/api/athletes');  // Requête API pour récupérer les athlètes
        const data = await response.json();
        this.athletes = data;  // Assigner les athlètes récupérés au tableau
      } catch (error) {
        console.error("Error fetching athletes:", error);
      }
    },
    goToHomePage() {
      this.$router.push('/');  // Redirection vers la page d'accueil
    }
  },
  mounted() {
    this.fetchAthletes();  // Appeler la méthode pour récupérer les athlètes au montage du composant
  }
};
</script>

<style scoped>
/* Styles pour l'affichage des athlètes */
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

.athlete-container {
  text-align: center;
  margin: 40px;
}

.athlete-list ul {
  list-style-type: none;
  padding: 0;
}

.athlete-list li {
  padding: 10px;
  cursor: pointer;
}

.athlete-list li:hover {
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
