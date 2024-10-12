import Vue from 'vue';
import App from './App.vue'; // Assurez-vous que ce chemin est correct
import router from './router'; // Assurez-vous que le routeur est bien importé

Vue.config.productionTip = false;

new Vue({
  router,
  render: h => h(App),
}).$mount('#app');
