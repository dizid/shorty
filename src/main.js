import Vue from 'vue'
import App from './App.vue'
import router from './router'
require('dotenv').config()

var VueFire = require('vuefire')
import firebase from 'firebase/app';
import 'firebase/firestore';
Vue.use(VueFire)

firebase.initializeApp({
  projectId: 'takk-eec44',
  databaseURL: 'https://takk-eec44.firebaseio.com'
})
const firestore = firebase.firestore();
  const settings = {timestampsInSnapshots: true};
  firestore.settings(settings);
  
export const db = firebase.firestore()

Vue.config.productionTip = false

new Vue({
  router,
  render: function (h) { return h(App) }
}).$mount('#app')
