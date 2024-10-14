<template>
    <div class="participate-container">
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
    name: 'Participate',
    methods: {
      goToHomePage() {
        this.$router.push('/'); // Redirects to the home page
      }
    }
  }
  </script>
  
  <style scoped>
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
  