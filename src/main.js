// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.

//window.axios.defaults.baseURL = 'http://localhost:8181'

import Vue from 'vue'
import App from './App'
import store from './store'
import router from './router'
import * as VueGoogleMaps from 'vue2-google-maps'
import headerComponent from '@/components/header.vue'
import eventItem from '@/components/item.vue'
import eventsList from '@/components/events.vue'
import resultsComponent from '@/components/results.vue'
import resultMapComponent from '@/components/result_map.vue'


Vue.config.productionTip = false

/**
 * Google Maps instantiation
 * @type {String}
 */
 Vue.use(VueGoogleMaps, {
     load: {
         key: 'AIzaSyBvWE_sIwKbWkiuJQOf8gSk9qzpO96fhfY',
         libraries: 'places'
     }
 })
/**
 * Inscirption globale des composants avant d'instancier une instance de Vue.js
 * @type {String}
 */
Vue.component('search-header', headerComponent);
Vue.component('events-list', eventsList);
Vue.component('event-item', eventItem);
Vue.component('results', resultsComponent);
Vue.component('result-map', resultMapComponent);

/* Instance vue.js bindée directement sur la racine de la page*/
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
