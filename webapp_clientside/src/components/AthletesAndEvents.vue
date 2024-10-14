<template>
  <div class="hello">
<<<<<<< Updated upstream
    <h1>{{ msg }}</h1>
    <h2>Essential Links</h2>
    <ul>
      <li>
        <a
          href="/#/test"
          target="_blank"
        >
          Core Docs
        </a>
      </li>
      <li>
        <a
          href="https://forum.vuejs.org"
          target="_blank"
        >
          Forum
        </a>
      </li>
      <li>
        <a
          href="https://chat.vuejs.org"
          target="_blank"
        >
          Community Chat
        </a>
      </li>
      <li>
        <a
          href="https://twitter.com/vuejs"
          target="_blank"
        >
          Twitter
        </a>
      </li>
      <br>
      <li>
        <a
          href="http://vuejs-templates.github.io/webpack/"
          target="_blank"
        >
          Docs for This Template
        </a>
      </li>
    </ul>
    <h2>Ecosystem</h2>
    <ul>
      <li>
        <a
          href="http://router.vuejs.org/"
          target="_blank"
        >
          vue-router
        </a>
      </li>
      <li>
        <a
          href="http://vuex.vuejs.org/"
          target="_blank"
        >
          vuex
        </a>
      </li>
      <li>
        <a
          href="http://vue-loader.vuejs.org/"
          target="_blank"
        >
          vue-loader
        </a>
      </li>
      <li>
        <a
          href="https://github.com/vuejs/awesome-vue"
          target="_blank"
        >
          awesome-vue
        </a>
      </li>
    </ul>
=======
    <p>
      ACTION = {{ action }}<br />
      ID = {{ id }}<br />
      <a href="/#/athletes/list/all">Back to the list</a><br />
      <a href="/#/athletes/edit/0">Add a new athlete</a><br />
    </p>
    
    <!-- For Datasheet: /athletes/show/42 -->
    <table v-if="action === 'show'" class="table table-striped table-bordered table-hover">
      <tr><td>ID</td><td>{{ oneAthlete.ID_Athlete }}</td></tr>
      <tr><td>FIRST NAME</td><td>{{ oneAthlete.First_name }}</td></tr>
      <tr><td>FAMILY NAME</td><td>{{ oneAthlete.Family_name }}</td></tr>
      <tr><td>AGE</td><td>{{ oneAthlete.Age }}</td></tr>
      <tr><td>ADDRESS</td><td>{{ oneAthlete.Adress }}</td></tr>
      <tr><td>PHONE NUMBER</td><td>{{ oneAthlete.Phone_number }}</td></tr>
      <tr><td>COUNTRY</td><td>{{ getCountryName(oneAthlete.ID_country) }}</td></tr>
    </table>

    <!-- For Form: /athletes/edit/23 -->
    <table v-if="action === 'edit'" class="table table-striped table-bordered table-hover">
      <tr><td>FIRST NAME</td>
        <td><input type="text" v-model="oneAthlete.First_name" /></td></tr>
      <tr><td>FAMILY NAME</td>
        <td><input type="text" v-model="oneAthlete.Family_name" /></td></tr>
      <tr><td>AGE</td>
        <td><input type="number" v-model="oneAthlete.Age" /></td></tr>
      <tr><td>ADDRESS</td>
        <td><input type="text" v-model="oneAthlete.Adress" /></td></tr>
      <tr><td>PHONE NUMBER</td>
        <td><input type="text" v-model="oneAthlete.Phone_number" /></td></tr>
      <tr><td>COUNTRY</td>
        <td>
          <select v-model="oneAthlete.ID_country">
            <option v-for="country of countries" :key="country.ID_country" :value="country.ID_country">
              {{ country.Country_name }}
            </option>
          </select>
        </td></tr>
      <tr><td colspan="2">
        <input type="button" value="SEND" @click="sendEditRequest()" />
      </td></tr>
    </table>

    <!-- For List: /athletes/list/all -->
    <table v-if="action === 'list'" class="table table-striped table-bordered table-hover">
      <tr>
        <td>ID</td><td>FIRST NAME</td><td>FAMILY NAME</td><td>SHOW DATASHEET</td><td>EDIT ATHLETE</td><td>DELETE ATHLETE</td>
      </tr>
      <tr v-for="athlete of athletes" :key="athlete.ID_Athlete">
        <td>{{ athlete.ID_Athlete }}</td>
        <td>{{ athlete.First_name }}</td>
        <td>{{ athlete.Family_name }}</td>
        <td><a :href="'/#/athletes/show/' + athlete.ID_Athlete">[SHOW]</a></td>
        <td><a :href="'/#/athletes/edit/' + athlete.ID_Athlete">[EDIT]</a></td>
        <td><input type="button" value="DELETE" @click="sendDeleteRequest(athlete.ID_Athlete)" /></td>
      </tr>
    </table>
>>>>>>> Stashed changes
  </div>
</template>

<script>
export default {
<<<<<<< Updated upstream
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
=======
  name: 'Athletes',
  props: ['action', 'id'],
  data () {
    return {
      athletes: [],
      countries: [],
      oneAthlete: {
        ID_Athlete: 0,
        First_name: '',
        Family_name: '',
        Age: 0,
        Adress: '',
        Phone_number: '',
        ID_country: 0
      }
    }
  },
  methods: {
    async getAllData() {
      try {
        /* 
        let responseAthletes = await this.$http.get("xxxx"); // Remplace "xxxx" par l'URL de l'API pour Athletes
        this.athletes = responseAthletes.data;
        let responseCountries = await this.$http.get("xxxx"); // Remplace "xxxx" par l'URL de l'API pour Country
        this.countries = responseCountries.data;
        */
        this.countries = [
          {
>>>>>>> Stashed changes
