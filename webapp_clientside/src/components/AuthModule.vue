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
export default {
  name: "AuthModule",
  data() {
    return {
      msg: "Welcome to Your Vue.js App",
      username: "",
      password: "",
    };
  },
  methods: {
    async handleLogin() {
      try {
        const response = await this.$http.post(
          "http://localhost:8080/auth/login",
          { username: this.username, userpass: this.password }
        );

        this.msg = response.data.message; // Affiche le message de succès
        console.log("User:", response.data.user);
      } catch (error) {
        this.msg = error.response && error.response.data && error.response.data.message 
        ? error.response.data.message 
        : "Une erreur est survenue";

        console.error(error);
      }
    },
  },
};
</script>
