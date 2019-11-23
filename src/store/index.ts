import Vue from 'vue'
import Vuex from 'vuex'
import chapterReading from './modules/chapter-reading'
import Settings from './modules/settings'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {},
  modules: {
    chapterReading,
    Settings
  }
})
