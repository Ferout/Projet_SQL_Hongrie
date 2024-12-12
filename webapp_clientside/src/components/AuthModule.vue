<template>
  <div class="hello">
    <header class="header">
        <span>{{ currentDate }}</span>
      </header>
    <h1>Authentication</h1>
    <p>{{ msg }}</p>
    <form @submit.prevent="handleLogin">
      <label for="username">Username:</label>
      <input type="text" v-model="username" id="username" required />

      <label for="password">Password:</label>
      <input type="password" v-model="password" id="password" required />

      <button type="submit" class="auth-button">Login</button>
    </form>
    <button v-if="isAuthenticated" @click="handleLogout" class="auth-button">Logout</button>
    <router-link to="/" class="auth-button">Back to Home</router-link>


  <footer class="footer">
      <p>© 2024 Discover_Olympics_Games - Gomez Luka & Feracci Aurélien</p>
      </footer>

  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "AuthModule",
  data() {
    return {
      currentDate: new Date().toLocaleDateString(),
      msg: "",
      username: "",
      password: "",
      isAuthenticated: false,
      isAdmin: false,
    };
  },
  methods: {
    async handleLogin() {
      console.log("Sending login request with:", {
        username: this.username,
        password: this.password,
      });

      try {
        const response = await axios.post("http://localhost:3000/auth/login", {
          username: this.username,
          password: this.password,
        });

        console.log("Login response received:", response.data);

        if (response.data.user) {
          this.isAdmin = response.data.user.isAdmin; 
          this.isAuthenticated = true;
          localStorage.setItem("username", response.data.user.username); 
          localStorage.setItem("isAdmin", this.isAdmin);
          this.$router.push({ name: "Home_page" });
        } else {
          this.msg = "Login failed.";
        }
      } catch (error) {
        console.error("Login error:", error);
        this.msg = "An error occurred during login.";
      }
    },
    handleLogout() {
      console.log("Logout triggered");
      localStorage.removeItem("username");
      localStorage.removeItem("isAdmin");
      this.isAuthenticated = false;
      this.isAdmin = false;
      this.$router.push({ name: "AuthModule" });
    },
  },
  mounted() {
    const username = localStorage.getItem("username");
    const isAdmin = parseInt(localStorage.getItem("isAdmin"), 10);

    if (username) {
      console.log("Username loaded from localStorage:", username);
      this.username = username;
      this.isAuthenticated = true;
    } else {
      console.warn("Username not found in localStorage");
    }

    if (isAdmin === 1) {
      console.log("Admin status loaded from localStorage:", isAdmin);
      this.isAdmin = true;
    } else {
      console.warn("Admin status not found or not admin");
      this.isAdmin = false;
    }
  },
};
</script>

<style scoped>


.auth-button {
  background-color: #42b883;
  color: white;
  padding: 10px 20px; 
  text-decoration: none;
  font-size: 0.9rem; 
  border-radius: 6px; 
  transition: background-color 0.3s ease, transform 0.3s ease;
  border: none;
  cursor: pointer;
}

.auth-button:hover {
  background-color: #58c4a3;
  transform: scale(1.05);
}

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


  .hello home-page {
  position: relative; 
  min-height: 100vh;
  padding-bottom: 60px;
}

.footer {
  position: absolute; 
  bottom: 10px; 
  left: 10px; 
  right: 10px; 
  background-color: #42b883;
  color: white;
  text-align: center;
  padding: 20px; 
  box-shadow: 0 -2px 4px rgba(0, 0, 0, 0.1);
  border-radius: 8px; 
}



</style>

