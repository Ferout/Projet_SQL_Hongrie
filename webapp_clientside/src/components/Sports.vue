<template>
    <div class="sports">
      <h2>Sports</h2>
      <table class="table table-striped">
        <tr>
          <th>ID</th><th>Sport Name</th><th>Team Sport</th><th>Number of Players</th>
        </tr>
        <tr v-for="sport in sports" :key="sport.ID_sport">
          <td>{{ sport.ID_sport }}</td>
          <td>{{ sport.Sport_name }}</td>
          <td>{{ sport.Team_sport ? 'Yes' : 'No' }}</td>
          <td>{{ sport.Number_of_player }}</td>
        </tr>
      </table>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        sports: []
      };
    },
    methods: {
      fetchSports() {
        // Simulated data, replace with API call
        this.sports = [
          { ID_sport: 1, Sport_name: 'Football', Team_sport: true, Number_of_player: 11 },
          { ID_sport: 2, Sport_name: 'Basketball', Team_sport: true, Number_of_player: 5 }
        ];
      }
    },
    created() {
      this.fetchSports();
    }
  };
  </script>
  
  <style scoped>
  .table {
    width: 100%;
  }
  </style>
  