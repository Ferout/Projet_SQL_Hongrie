<template>
    <div class="athletes">
      <h2>Athletes</h2>
      <table v-if="action === 'list'" class="table table-striped">
        <tr>
          <th>ID</th><th>First Name</th><th>Family Name</th><th>Country</th><th>Actions</th>
        </tr>
        <tr v-for="athlete in athletes" :key="athlete.ID_Athlete">
          <td>{{ athlete.ID_Athlete }}</td>
          <td>{{ athlete.First_name }}</td>
          <td>{{ athlete.Family_name }}</td>
          <td>{{ getCountryName(athlete.ID_country) }}</td>
          <td>
            <a :href="'/#/athletes/show/' + athlete.ID_Athlete">Show</a> | 
            <a :href="'/#/athletes/edit/' + athlete.ID_Athlete">Edit</a> | 
            <button @click="deleteAthlete(athlete.ID_Athlete)">Delete</button>
          </td>
        </tr>
      </table>
    </div>
  </template>
  
  <script>
  export default {
    props: ['action', 'id'],
    data() {
      return {
        athletes: [],
        countries: []
      };
    },
    methods: {
      fetchAthletes() {
        // Simulated data, replace with API call
        this.athletes = [
          { ID_Athlete: 1, First_name: 'Léon', Family_name: 'Marchand', ID_country: 4 },
          { ID_Athlete: 2, First_name: 'Scott', Family_name: 'D.', ID_country: 5 }
        ];
        this.countries = [
          { ID_country: 1, Country_name: "USA" },
          { ID_country: 2, Country_name: "China" },
          { ID_country: 3, Country_name: "France" },
          { ID_country: 4, Country_name: "Japan" },
          { ID_country: 5, Country_name: "England" }
        ];
      },
      getCountryName(countryID) {
        const country = this.countries.find(c => c.ID_country === countryID);
        return country ? country.Country_name : 'Unknown';
      },
      deleteAthlete(id) {
        console.log('Deleting athlete with ID:', id);
      }
    },
    created() {
      this.fetchAthletes();
    }
  };
  </script>
  
  <style scoped>
  .table {
    width: 100%;
  }
  </style>
  