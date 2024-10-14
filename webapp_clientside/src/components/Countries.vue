<template>
    <div class="countries-container">
      <h2>Countries Participating</h2>
      <table class="info-table">
        <thead>
          <tr>
            <th>Country Name</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>USA</td>
          </tr>
          <tr>
            <td>China</td>
          </tr>
          <tr>
            <td>France</td>
          </tr>
          <tr>
            <td>Japan</td>
          </tr>
          <tr>
            <td>England</td>
          </tr>
        </tbody>
      </table>
  
      <!-- Button to go back to Home -->
      <button @click="goToHomePage" class="home-button">Back to Home</button>
    </div>
  </template>
  
  <script>
  export default {
    name: 'Countries',
    methods: {
      goToHomePage() {
        this.$router.push('/'); // Redirects to the home page
      }
    }
  }
  </script>
  
  <style scoped>
  .countries-container {
    text-align: center;
    margin: 40px;
  }
  
  .info-table {
    width: 50%;
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
  