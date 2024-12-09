import Vue from 'vue';
import Router from 'vue-router';
import Athletes from '@/components/Athletes';
import Countries from '@/components/Countries';
import Events from '@/components/Events';
import Sports from '@/components/Sports';
import Participate from '@/components/Participate';
import Home_page from '@/components/Home_page';
import AuthModule from '@/components/AuthModule';

Vue.use(Router);

export default new Router({
  routes: [
    { path: '/', name: 'Home_page', component: Home_page }, 
    { path: '/athletes', name: 'Athletes', component: Athletes },
    { path: '/countries', name: 'Countries', component: Countries },
    { path: '/events', name: 'Events', component: Events },
    { path: '/sports', name: 'Sports', component: Sports },
    { path: '/participate', name: 'Participate', component: Participate },
    { path: '/authmodule', name: 'AuthModule', component: AuthModule },
  ],
});
