<template>
    <div class="events">
      <h2>Events</h2>
      <table class="table table-striped">
        <tr>
          <th>ID</th><th>Event Name</th><th>Place</th><th>Date</th>
        </tr>
        <tr v-for="event in events" :key="event.ID_events">
          <td>{{ event.ID_events }}</td>
          <td>{{ event.Event_name }}</td>
          <td>{{ event.Event_place }}</td>
          <td>{{ event.Event_date }}</td>
        </tr>
      </table>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        events: []
      };
    },
    methods: {
      fetchEvents() {
        // Simulated data, replace with API call
        this.events = [
          { ID_events: 1, Event_name: '100 meters', Event_place: 'Défense Arena', Event_date: '2024-07-25' },
          { ID_events: 2, Event_name: 'Football Final', Event_place: 'Wembley Stadium', Event_date: '2024-07-27' }
        ];
      }
    },
    created() {
      this.fetchEvents();
    }
  };
  </script>
  
  <style scoped>
  .table {
    width: 100%;
  }
  </style>
  