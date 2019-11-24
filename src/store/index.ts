import Vue from 'vue'
import Vuex from 'vuex'
import ChapterNavigation from './modules/chapter-navigation'
import Settings from './modules/settings'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {},
  modules: {
    ChapterNavigation,
    Settings
  }
})
