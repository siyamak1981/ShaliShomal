import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/base'
import './plugins/chartist'
import './plugins/vee-validate'
import vuetify from './plugins/vuetify'
import i18n from './i18n'
import axios from 'axios'
import VueAxios from 'vue-axios'

axios.defaults.baseURL = 'http://localhost:8000/api'
Vue.use(VueAxios, axios)
Vue.config.productionTip = false

// filter
Vue.filter('capitalize', function (value) {
  if (!value) return ''
  value = value.toString()
  return value.charAt(0).toUpperCase() + value.slice(1)
})
// moments
import moment from 'moment';
Vue.filter('myDate', function (created) {
  return moment(created).format('MMMM Do YYYY');
});



// router auth permission or gate
router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!store.getters.loggedIn) {
      next({
        name: 'Login',
      })
    } else {
      next()
    }

  } else if (to.matched.some(record => record.meta.requiresVisitor)) {
    if (store.getters.loggedIn) {
      next({
        name: "Dashboard"
      })
    } else {
      next()
    }
  } else {
    next()
  }
})

// //sweetalert
import Swal from 'sweetalert2'
window.Fire = new Vue();
window.Swal = Swal;

// progressBar
import VueProgressBar from 'vue-progressbar';
Vue.use(VueProgressBar, {
  color: '#bffaf3',
  failedColor: '#874b4b',
  thickness: '5px',
  transition: {
    speed: '0.2s',
    opacity: '0.6s',
    termination: 300
  },
  autoRevert: true,
  inverse: false
})


// pagination
Vue.component('pagination', require('laravel-vue-pagination'));


new Vue({
  router,
  store,
  vuetify,
  i18n,
  render: h => h(App),
}).$mount('#app')
