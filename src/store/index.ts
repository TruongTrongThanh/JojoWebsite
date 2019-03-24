import Vue from 'vue';
import Vuex from 'vuex';
import chapterReading from './modules/chapter-reading';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    chapterReading,
  },
});
