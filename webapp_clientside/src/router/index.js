import Vue from 'vue';
import Router from 'vue-router';
import AthletesAndEvents from '@/components/AthletesAndEvents';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'AthletesAndEvents',
      component: AthletesAndEvents
    }
  ]
});
