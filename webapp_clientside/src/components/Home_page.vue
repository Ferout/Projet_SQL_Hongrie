<template>
    <div class="home-page">
      <!-- Header -->
      <header class="header">
        <span>{{ currentDate }}</span>
      </header>
  
      <!-- Main Content -->
      <div class="home-container">
        <h1>Information about the Olympics Games of 2024</h1>
  
        <!-- Paragraph inside a centered rectangle -->
        <div class="info-box">
          <p>
            You will find, via the different sections below, some information about the athletes, the sports, the countries, and the events that will occur during those Olympic Games.
          </p>
        </div>
  
        <!-- Navigation Buttons -->
        <div class="button-container">
          <router-link to="/athletes" class="nav-button">- Athletes -</router-link>
          <router-link to="/countries" class="nav-button">- Countries -</router-link>
          <router-link to="/events" class="nav-button">- Events -</router-link>
          <router-link to="/sports" class="nav-button">- Sports -</router-link>
          <router-link to="/participate" class="nav-button">- Participate -</router-link>
        </div>
      </div>
  
      <!-- Footer -->
      <footer class="footer">
        <p>© 2024 Discover_Olympics_Games - Gomez Luka & Feracci Aurélien</p>
      </footer>
    </div>
  </template>
  
  <script>
  export default {
    name: 'Home_page',
    data() {
      return {
        currentDate: new Date().toLocaleDateString()
      }
    }
  }
  </script>
  
  <style scoped>
  /* Global Page Styling */
  .home-page {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
  }
  
  /* Header Styling */
  .header {
    background-color: #42b883;
    color: white;
    padding: 12.5px;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    text-align: left;
    font-size: 1rem;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
  
  /* Main Content Styling */
  .home-container {
    text-align: center;
    margin-top: 10px; /* Adds space for the fixed header */
    font-family: 'Arial', sans-serif;
    flex: 1; /* Ensures main content takes the full available height */
  }
  
  h1 {
    color: #42b883;
    font-size: 3rem;
    margin-bottom: 20px;
  }
  
  /* Info box centered on the page */
  .info-box {
    display: inline-block;
    background-color: #e0e0e0;
    box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
    padding: 20px;
    border-radius: 12px;
    margin-bottom: 40px;
    max-width: 80%;
    margin-left: auto;
    margin-right: auto;
  }
  
  p {
    font-size: 1.5rem;
    margin: 0;
  }
  
  /* Button Container Styling */
  .button-container {
    display: flex;
    justify-content: center;
    gap: 20px;
    flex-wrap: wrap;
  }
  
  .nav-button {
    background-color: #42b883
;
    color: white;
    padding: 15px 30px;
    text-decoration: none;
    font-size: 1rem;
    border-radius: 8px;
    transition: background-color 0.3s ease;
    transition: transform 0.3s ease;
  }
  
  .nav-button:hover {
    background-color: #42b883
    ;
    transform: scale(1.1);
  }

  .vue-logo {
  margin: 12px 5;
}

  
  /* Footer Styling */
  .footer {
    background-color: #42b883
    ;
    color: white;
    text-align: center;
    padding: 20px 0;
    position: relative;
    width: 100%;
    box-shadow: 0 -2px 4px rgba(0, 0, 0, 0.1);
  }
  </style>
  