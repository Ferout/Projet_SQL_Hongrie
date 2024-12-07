<template>
    <div class="hello">
      <h1>Authentication demo</h1>
      <p>{{ msg }}</p>
      <input type="button" @click="sendRequest('post', 'login', { username: 'joeuser', userpass: 'joeXXX' })" value="LOGIN BAD" />
      <input type="button" @click="sendRequest('post', 'login', { username: 'joeuser', userpass: 'joepass' })" value="LOGIN USER" />
      <input type="button" @click="sendRequest('post', 'login', { username: 'joeadmin', userpass: 'joepass' })" value="LOGIN ADMIN" />
      <input type="button" @click="sendRequest('get', 'user')" value="ACCESS /user" />
      <input type="button" @click="sendRequest('get', 'admin')" value="ACCESS /admin" />
      <input type="button" @click="sendRequest('get', 'protected')" value="ACCESS /protected" />
      <input type="button" @click="sendRequest('get', 'logout')" value="LOGOUT" />
    </div>
  </template>
  
  <script>
  export default {
    name: 'AuthModule',
    data () {
      return {
        msg: 'Welcome to Your Vue.js App'
      }
    },
    methods: {
      async sendRequest(method, endpoint, params) {
        try {
          let response = null;
          if (method === "post") 
            response = await this.$http.post("http://localhost:8080/auth/"+endpoint, params);
          else
            response = await this.$http.get("http://localhost:8080/auth/"+endpoint);
          this.msg = JSON.stringify(response.data);
        } catch (error) {
          console.log(error);
        }
      }
    },
  
  }
  </script>
  