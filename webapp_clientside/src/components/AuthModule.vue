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
    };
  },
  methods: {
    async handleLogin() {
  console.log("Login button clicked");
  console.log("Username entered:", this.username);
  console.log("Password entered:", this.password);

  try {
    console.log("Sending request to backend...");
    const response = await axios.post(
      "http://localhost:3000/auth/login",
      { username: this.username, password: this.password },
      { withCredentials: true }
    );
    console.log("Response received:", response); // Log si une réponse est reçue

    if (response.status === 200) {
      this.msg = "Connexion réussie : " + response.data.user.Username;
      console.log("User authenticated:", response.data.user);
    } else {
      this.msg = "Connexion échouée";
      console.warn("Unexpected response:", response);
    }
  } catch (error) {
    console.error("Error during Axios request:", error); // Log si une erreur survient
    this.msg = (error.response && error.response.data && error.response.data.message) || "Une erreur est survenue.";
  }
}
  }}
</script>
