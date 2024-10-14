<template>
    <div class="participations">
      <h2>Participations</h2>
      <table class="table table-striped">
        <tr>
          <th>Athlete ID</th><th>Event ID</th><th>Result</th>
        </tr>
        <tr v-for="participation in participations" :key="participation.ID_Athlete + '-' + participation.ID_events">
          <td>{{ participation.ID_Athlete }}</td>
          <td>{{ participation.ID_events }}</td>
          <td>{{ participation.Result }}</td>
        </tr>
      </table>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        participations: []
      };
    },
    methods: {
      fetchParticipations() {
        // Simulated data, replace with API call
        this.participations = [
          { ID_Athlete: 1, ID_events: 5, Result: '1st place' },
          { ID_Athlete: 2, ID_events: 4, Result: '2nd place' }
        ];
      }
    },
    created() {
      this.fetchParticipations();
    }
  };
  </script>
  
  <style scoped>
  .table {
    width: 100%;
  }
  </style>
  