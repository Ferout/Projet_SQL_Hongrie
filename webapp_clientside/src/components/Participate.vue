<template>
    <div class="participate-container">
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
      <router-link to="/athletes">
        <button>Athletes</button>
      </router-link>
    </div>
  </div>
</header>
      <h2>Athletes' Participation Results</h2>
      <table class="info-table">
        <thead>
          <tr>
            <th>Athlete ID</th>
            <th>Event ID</th>
            <th>Result</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>5</td>
            <td>1st place</td>
          </tr>
          <tr>
            <td>2</td>
            <td>5</td>
            <td>2nd place</td>
          </tr>
          <tr>
            <td>3</td>
            <td>5</td>
            <td>3rd place</td>
          </tr>
          <tr>
            <td>4</td>
            <td>4</td>
            <td>1st place</td>
          </tr>
          <tr>
            <td>5</td>
            <td>4</td>
            <td>4th place</td>
          </tr>
        </tbody>
      </table>
  
      <!-- Button to go back to Home -->
      <button @click="goToHomePage" class="home-button">Back to Home</button>
    </div>
  </template>
  
  <script>
  export default {
    data() {
  return {
    currentDate: new Date().toLocaleDateString()
       };
    },
    name: 'Participate',
    methods: {
      goToHomePage() {
        this.$router.push('/'); // Redirects to the home page
      }
    }
  }
  </script>
  
  <style scoped>
  
  .header {
  background-color: #42b883;
  color: white;
  padding: 5px 10px; /* Réduire le padding pour une taille de header plus petite */
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: space-between; /* Espacer la date et les boutons */
  align-items: center; /* Centrer verticalement le contenu */
}

.header-content {
  display: flex;
  justify-content: space-between; /* Espace entre la date et les boutons */
  width: 95%; /* Prendre toute la largeur */
  align-items: center;
}

.nav-buttons {
  display: flex;
  justify-content: center; /* Centrer les boutons */
  align-items: center;
  gap: 30px; /* Espacement entre les boutons */
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
  
  .info-table {
    width: 80%;
    border-collapse: collapse;
    margin: 0 auto;
  }
  
  .info-table th,
  .info-table td {
    border: 1px solid #ddd;
    padding: 10px;
    text-align: center;
  }
  
  .info-table th {
    background-color: #42b883;
    color: white;
  }
  
  /* Button styles */
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
    background-color: #36a76e; /* Darker green on hover */
  }
  </style>
  