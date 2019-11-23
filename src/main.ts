import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from '@/plugins/vuetify'

// Firebase config
import FirebaseAPI from '@/apis/firebase'
FirebaseAPI.config()

// Dependency injection resolve
import 'reflect-metadata'
import Client from '@/apis/client'
import { container } from 'tsyringe'
import { MangaAPI } from '@/apis/manga-api'
container.register('IMangaAPI', { useClass: MangaAPI })
const client = container.resolve(Client)

// API settings
Vue.prototype.$mangaAPI = client.mangaAPI

// Vue-progressbar config
import VueProgressBar from 'vue-progressbar'
const progressBarConfig = {
  color: 'green',
  thickness: '5px',
  autoRevert: true,
  autoFinish: false
}
Vue.use(VueProgressBar, progressBarConfig)

// Plugin settings
import { HelperPlugin } from '@/plugins/helper'
Vue.use(HelperPlugin)

Vue.config.errorHandler = (err, vm, info) => {
  console.log('catch error in handler')
  console.error(err)
}

Vue.config.productionTip = false

new Vue({
  router,
  store,
  // @ts-ignore
  vuetify,
  render: h => h(App)
}).$mount('#app')
