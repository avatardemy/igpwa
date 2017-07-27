import Vue from 'vue';
import Router from 'vue-router';
import { auth } from '@/services/firebase';

// import Login from '@/pages/Login';
const Login = () => import('@/pages/Login');
const Home = () => import('@/pages/Home');

Vue.use(Router);
const router = new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
      beforeEnter: (to, from, next) => {
        if (auth.currentUser) {
          next();
        } else {
          next('/login');
        }
      },
      meta: {
        showShell: true,
      },
    },
    {
      path: '/login',
      name: 'Login',
      component: Login,
      beforeEnter: (to, from, next) => {
        if (auth.currentUser) {
          next('/');
        } else {
          next();
        }
      },
      meta: {
        showShell: false,
      },
    },
  ],
});

export default router;
