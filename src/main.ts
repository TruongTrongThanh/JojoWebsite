import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import global from './mixins/global';
import firebase from 'firebase';

Vue.config.productionTip = false;

// Firebase config
const config = {
  apiKey: process.env.VUE_APP_API_KEY,
  databaseURL: process.env.VUE_APP_DATABASE_URL,
  projectId: process.env.VUE_APP_PROJECT_ID,
};
firebase.initializeApp(config);

Vue.mixin(global);

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
