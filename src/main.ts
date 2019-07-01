import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import global from './mixins/global'
import firebase from 'firebase/app'
import 'firebase/database'
import VueProgressBar from 'vue-progressbar'

Vue.config.productionTip = false

// Firebase config
const firebaseConfig = {
  apiKey: process.env.VUE_APP_API_KEY,
  databaseURL: process.env.VUE_APP_DATABASE_URL,
  projectId: process.env.VUE_APP_PROJECT_ID
}
firebase.initializeApp(firebaseConfig)

// Vue-progressbar config
const progressBarConfig = {
  color: 'green',
  thickness: '5px',
  autoRevert: true,
  autoFinish: false
}
Vue.use(VueProgressBar, progressBarConfig)

Vue.mixin(global)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
