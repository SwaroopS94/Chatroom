
import Vue from 'vue';
import Router from 'vue-router';
import room from './pages/room';
import home from './pages/home';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path:`/room/:id`,
      name: "room",
      component: room
    },
    {
      path:'/register',
      name: "register",
      component: home
    },
    {
      path:'/',
      component:home
    }
  ]
});