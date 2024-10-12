<template>
  <div>
    <h1>Liste des Athlètes</h1>
    <table>
      <tr>
        <th>ID</th><th>Prénom</th><th>Nom</th><th>Âge</th><th>Pays</th>
      </tr>
      <tr v-for="athlete in athletes" :key="athlete.ID_Athlete">
        <td>{{ athlete.ID_Athlete }}</td>
        <td>{{ athlete.First_name }}</td>
        <td>{{ athlete.Family_name }}</td>
        <td>{{ athlete.Age }}</td>
        <td>{{ athlete.ID_country }}</td>
      </tr>
    </table>

    <h1>Liste des Événements</h1>
    <table>
      <tr>
        <th>ID</th><th>Nom</th><th>Lieu</th><th>Date</th><th>Places</th>
      </tr>
      <tr v-for="event in events" :key="event.ID_events">
        <td>{{ event.ID_events }}</td>
        <td>{{ event.Event_name }}</td>
        <td>{{ event.Event_place }}</td>
        <td>{{ event.Event_date }}</td>
        <td>{{ event.Number_of_place }}</td>
      </tr>
    </table>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      athletes: [],
      events: []
    };
  },
  created() {
    this.getAthletes();
    this.getEvents();
  },
  methods: {
    async getAthletes() {
      try {
        const response = await axios.get('http://localhost:3000/athletes');
        this.athletes = response.data;
      } catch (error) {
        console.error(error);
      }
    },
    async getEvents() {
      try {
        const response = await axios.get('http://localhost:3000/events');
        this.events = response.data;
      } catch (error) {
        console.error(error);
      }
    }
  }
};
</script>

<style>
table {
  width: 100%;
  border-collapse: collapse;
}

table, th, td {
  border: 1px solid black;
}

th, td {
  padding: 10px;
  text-align: left;
}
</style>
