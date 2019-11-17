import Vue from 'vue'
// @ts-ignore
import Vuetify from 'vuetify/lib'

Vue.use(Vuetify)

const opts = {
  theme: {
    dark: true,
    options: {
      customProperties: true
    }
  }
}

export default new Vuetify(opts)
