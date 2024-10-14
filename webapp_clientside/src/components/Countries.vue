<template>
    <div class="countries">
      <h2>Countries</h2>
      <table class="table table-striped">
        <tr>
          <th>ID</th><th>Country Name</th>
        </tr>
        <tr v-for="country in countries" :key="country.ID_country">
          <td>{{ country.ID_country }}</td>
          <td>{{ country.Country_name }}</td>
        </tr>
      </table>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        countries: []
      };
    },
    methods: {
      fetchCountries() {
        // Simulated data, replace with API call
        this.countries = [
          { ID_country: 1, Country_name: "USA" },
          { ID_country: 2, Country_name: "China" },
          { ID_country: 3, Country_name: "France" },
          { ID_country: 4, Country_name: "Japan" },
          { ID_country: 5, Country_name: "England" }
        ];
      }
    },
    created() {
      this.fetchCountries();
    }
  };
  </script>
  
  <style scoped>
  .table {
    width: 100%;
  }
  </style>
  