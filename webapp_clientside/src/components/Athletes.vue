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


    <h2>Athletes List</h2>
    <table class="info-table">
      <thead>
        <tr>
          <th>First Name</th>
          <th>Family Name</th>
          <th>Age</th>
          <th>Address</th>
          <th>Phone Number</th>
          <th>Country</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(athlete, index) in athletes" :key="index">
          <td v-if="editIndex !== index">{{ athlete.firstName }}</td>
          <td v-else><input v-model="athlete.firstName" /></td>
          
          <td v-if="editIndex !== index">{{ athlete.familyName }}</td>
          <td v-else><input v-model="athlete.familyName" /></td>
          
          <td v-if="editIndex !== index">{{ athlete.age }}</td>
          <td v-else><input v-model="athlete.age" type="number" /></td>
          
          <td v-if="editIndex !== index">{{ athlete.address }}</td>
          <td v-else><input v-model="athlete.address" /></td>
          
          <td v-if="editIndex !== index">{{ athlete.phoneNumber }}</td>
          <td v-else><input v-model="athlete.phoneNumber" /></td>
          
          <td v-if="editIndex !== index">{{ athlete.country }}</td>
          <td v-else><input v-model="athlete.country" /></td>
          
          <td>
            <button v-if="editIndex !== index" @click="editAthlete(index)">Edit</button>
            <button v-else @click="saveEdit">Save</button>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- Button to go back to Home -->
    <button @click="goToHomePage" class="home-button">Back to Home</button>
  </div>
</template>

<script>


export default {
  name: 'Athletes',
  data() {
    return {
      currentDate: new Date().toLocaleDateString(),
      editIndex: null, // Track which row is being edited
      athletes: this.loadAthletes() || [ // Load athletes from localStorage if available
        {
          firstName: 'Léon',
          familyName: 'Marchand',
          age: 22,
          address: 'Paris',
          phoneNumber: '0123456789',
          country: 'France'
        },
        {
          firstName: 'Scott',
          familyName: 'D.',
          age: 36,
          address: 'London',
          phoneNumber: '0123456781',
          country: 'England'
        },
        {
          firstName: 'Wang',
          familyName: 'S.',
          age: 32,
          address: 'Tokyo',
          phoneNumber: '0123456782',
          country: 'China'
        },
        {
          firstName: 'Kevin',
          familyName: 'Durant',
          age: 34,
          address: 'Washington',
          phoneNumber: '0123456783',
          country: 'USA'
        },
        {
          firstName: 'Katie',
          familyName: 'Ledecky',
          age: 27,
          address: 'Bethesda',
          phoneNumber: '0123456784',
          country: 'USA'
        }
      ]
    };
  },
  methods: {
    goToHomePage() {
      this.$router.push('/'); // Redirects to the home page
    },
    editAthlete(index) {
      this.editIndex = index; // Set the index of the row to be edited
    },
    saveEdit() {
      this.editIndex = null; // Save the changes and exit edit mode
      this.saveAthletes();   // Save the updated athletes list to localStorage
    },
    saveAthletes() {
      // Save the athletes data to localStorage
      localStorage.setItem('athletes', JSON.stringify(this.athletes));
    },
    loadAthletes() {
      // Load athletes from localStorage
      const athletes = localStorage.getItem('athletes');
      return athletes ? JSON.parse(athletes) : null;
    }
  },
  mounted() {
    // Load athletes when the component is mounted (for reactivity)
    const storedAthletes = this.loadAthletes();
    if (storedAthletes) {
      this.athletes = storedAthletes;
    }
  }
};
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


.athletes-container {
  text-align: center;
  margin: 40px;
}

.info-table {
  width: 100%;
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

button {
  padding: 5px 10px;
  background-color: #42b883;
  color: white;
  border: none;
  cursor: pointer;
  border-radius: 3px;
}

button:hover {
  background-color: #36a76e;
}

input {
  padding: 5px;
  border-radius: 3px;
  border: 1px solid #ccc;
}
</style>
