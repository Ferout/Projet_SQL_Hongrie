import Vue from 'vue';
import Router from 'vue-router';
import test from '@/components/test';
import AthletesAndEvents from '@/components/AthletesAndEvents';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'AthletesAndEvents',
      component: AthletesAndEvents
    },

    {
      path: '/test',
      name: 'test',
      component: test
    }
  ]
});