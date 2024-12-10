<template>
  <div class="hello">
    <h1>Authentication Demo</h1>
    <p>{{ msg }}</p>
    <form @submit.prevent="handleLogin">
      <label for="username">Username:</label>
      <input type="text" v-model="username" id="username" required />

      <label for="password">Password:</label>
      <input type="password" v-model="password" id="password" required />

      <button type="submit">Login</button>
    </form>
    <button v-if="isAuthenticated" @click="handleLogout">Logout</button>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "AuthModule",
  data() {
    return {
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
          this.isAdmin = response.data.user.isAdmin; // Stocker directement le statut admin
          this.isAuthenticated = true;
          localStorage.setItem("username", response.data.user.username); // Stocker le nom d'utilisateur
          localStorage.setItem("isAdmin", this.isAdmin); // Sauvegarder le statut admin
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
