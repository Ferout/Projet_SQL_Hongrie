<template>
  <div class="countries-container">
    <header class="header">
      <div class="header-content">
        <span>{{ currentDate }}</span>
        <div class="nav-buttons">
          <router-link to="/athletes">
            <button>Athletes</button>
          </router-link>
          <router-link to="/events">
            <button>Events</button>
          </router-link>
          <router-link to="/sports">
            <button>Sports</button>
          </router-link>
          <router-link to="/participate">
            <button>Participate</button>
          </router-link>
        </div>
      </div>
    </header>
    <h2>Countries Medal Standings</h2>
    <table class="info-table">
      <thead>
        <tr>
          <th>Country Name</th>
          <th>Gold</th>
          <th>Silver</th>
          <th>Bronze</th>
          <th>Total Medals</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>United States</td>
          <td>40</td>
          <td>44</td>
          <td>42</td>
          <td>126</td>
        </tr>
        <tr>
          <td>China</td>
          <td>40</td>
          <td>27</td>
          <td>24</td>
          <td>91</td>
        </tr>
        <tr>
          <td>Japan</td>
          <td>20</td>
          <td>12</td>
          <td>13</td>
          <td>45</td>
        </tr>
        <tr>
          <td>Australia</td>
          <td>18</td>
          <td>19</td>
          <td>16</td>
          <td>53</td>
        </tr>
        <tr>
          <td>France</td>
          <td>16</td>
          <td>26</td>
          <td>22</td>
          <td>64</td>
        </tr>
        <tr>
          <td>Netherlands</td>
          <td>15</td>
          <td>7</td>
          <td>12</td>
          <td>34</td>
        </tr>
        <tr>
          <td>Great Britain</td>
          <td>14</td>
          <td>22</td>
          <td>29</td>
          <td>65</td>
        </tr>
        <tr>
          <td>South Korea</td>
          <td>13</td>
          <td>9</td>
          <td>10</td>
          <td>32</td>
        </tr>
        <tr>
          <td>Italy</td>
          <td>12</td>
          <td>13</td>
          <td>15</td>
          <td>40</td>
        </tr>
        <tr>
          <td>Germany</td>
          <td>12</td>
          <td>13</td>
          <td>8</td>
          <td>33</td>
        </tr>
      </tbody>
    </table>
    <button @click="goToHomePage" class="home-button">Back to Home</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      currentDate: new Date().toLocaleDateString()
    };
  },
  methods: {
    goToHomePage() {
      this.$router.push('/'); 
    }
  }
}
</script>

<style scoped>
.header {
  background-color: #42b883;
  color: white;
  padding: 5px 10px;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.header-content {
  display: flex;
  justify-content: space-between;
  width: 95%;
  align-items: center;
}

.nav-buttons {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 30px;
}

.nav-buttons button {
  background-color: #42b883;
  color: white;
  padding: 8px 16px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 14px;
  transition: background-color 0.3s;
}

.nav-buttons button:hover {
  background-color: #36a76e;
}

.countries-container {
  text-align: center;
  margin: 40px;
}

.info-table {
  width: 50%;
  border-collapse: collapse;
  margin: 0 auto;
}

.info-table th,
.info-table td {
  border: 1px solid #ddd;
  padding: 10px;
  text-align: center;
}

.info-table th {
  background-color: #42b883;
  color: white;
}

.home-button {
  background-color: #42b883;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  margin-top: 20px;
  transition: background-color 0.3s;
}

.home-button:hover {
  background-color: #36a76e;
}
</style>
