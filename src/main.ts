import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import global from './mixins/global';
import firebase from 'firebase';

Vue.config.productionTip = false;

// Firebase config
const config = {
  apiKey: 'AIzaSyAyaWKrUEnRMLql7-7KGoPTsw17cNjm22s',
  databaseURL: 'https://thermal-pattern-175815.firebaseio.com',
  projectId: 'thermal-pattern-175815',
};
firebase.initializeApp(config);

Vue.mixin(global);

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
