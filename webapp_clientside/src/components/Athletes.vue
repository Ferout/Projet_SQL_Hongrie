<template>
    <div class="athletes-container">
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
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Léon</td>
            <td>Marchand</td>
            <td>22</td>
            <td>Paris</td>
            <td>0123456789</td>
            <td>France</td>
          </tr>
          <tr>
            <td>Scott</td>
            <td>D.</td>
            <td>36</td>
            <td>London</td>
            <td>0123456781</td>
            <td>England</td>
          </tr>
          <tr>
            <td>Wang</td>
            <td>S.</td>
            <td>32</td>
            <td>Tokyo</td>
            <td>0123456782</td>
            <td>China</td>
          </tr>
          <tr>
            <td>Kevin</td>
            <td>Durant</td>
            <td>34</td>
            <td>Washington</td>
            <td>0123456783</td>
            <td>USA</td>
          </tr>
          <tr>
            <td>Katie</td>
            <td>Ledecky</td>
            <td>27</td>
            <td>Bethesda</td>
            <td>0123456784</td>
            <td>USA</td>
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
    methods: {
      goToHomePage() {
        this.$router.push('/'); // Redirects to the home page
      }
    }
  }
  </script>
  
  <style scoped>
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
  </style>
  