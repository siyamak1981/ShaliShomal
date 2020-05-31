import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

// import Gate from "./Gate";
// Vue.prototype.$gate = new Gate(window.user);

Vue.component(
  'not-found',
  require('./views/dashboard/component/NotFound.vue').default
);
import NotFound from './views/dashboard/component/NotFound.vue';


export default new Router({
  // mode: 'hash',
  mode: "history",
  base: process.env.BASE_URL,
  routes: [{
      path: '/auth',
      component: () => import('@/views/dashboard/AuthIndex'),
      children: [

        {
          name: 'Login',
          path: 'login',
          component: () => import('@/views/dashboard/auth/Login'),
          meta: {
            requiresVisitor: true
          }
        },
        // logout dashboard
        {
          name: 'Logout',
          path: 'logout',
          component: () => import('@/views/dashboard/auth/Logout'),
        },
        {
          name: 'Register',
          path: 'register',
          component: () => import('@/views/dashboard/auth/Register'),
          meta: {
            requiresVisitor: true
          }
        },
        {
          name: 'Token',
          path: 'token',
          component: () => import('@/views/dashboard/auth/Token'),

        },
        {
          name: 'ForgetPassword',
          path: 'forgetpassword',
          component: () => import('@/views/dashboard/auth/ForgetPassword'),

        },
      ],
    },
    {

      path: '/',
      component: () => import('@/views/dashboard/Index'),
      meta: {
        requiresAuth: true
      },

      children: [{
          name: 'Dashboard',
          path: '',
          component: () => import('@/views/dashboard/component/Dashboard'),

        },

        {
          name: 'Profile',
          path: '/pages/profile',
          component: () => import('@/views/dashboard/pages/Profile'),
        },
        {
          name: 'Notifications',
          path: 'components/notifications',
          component: () => import('@/views/dashboard/component/Notifications'),
        },
        {
          name: 'Icons',
          path: 'components/icons',
          component: () => import('@/views/dashboard/component/Icons'),
        },
        {
          name: 'Tabs',
          path: 'components/tabs',
          component: () => import('@/views/dashboard/component/Tabs'),
        },
        {
          name: 'Grid',
          path: 'components/grid',
          component: () => import('@/views/dashboard/component/Grid'),
        },
        {
          name: 'Typography',
          path: 'components/typography',
          component: () => import('@/views/dashboard/component/Typography'),
        },
        // Tables
        {
          name: 'User',
          path: 'tables/user',
          component: () => import('@/views/dashboard/tables/User'),
        },
        // Maps
        {
          name: 'Google Maps',
          path: 'maps/google-maps',
          component: () => import('@/views/dashboard/maps/GoogleMaps'),
        },
        {
          name: 'Timeline',
          path: 'pages/timeline/',
          component: () => import('@/views/dashboard/pages/Timeline'),
        },

        {
          name: 'edit-user',
          path: 'tables/edit-user/:userid',
          component: () => import('@/views/dashboard/tables/Edit'),

        },
        {
          path: '*',
          component: NotFound
        },
      ],
    },
  ],
})
