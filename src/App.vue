<template>
  <v-app id="app">
    <Drawer v-model="drawerToggle"/>

    <v-app-bar app clipped-left
      height="75"
    >
      <v-app-bar-nav-icon
        class="d-none d-sm-block"
        @click="drawerToggle = !drawerToggle"
      />

      <v-avatar class="ml-2">
        <v-img :src="require('@/assets/logo.png')"></v-img>
      </v-avatar>
      <v-toolbar-title class="headline font-weight-bold">
        JoJo Group Vietnam
      </v-toolbar-title>
    </v-app-bar>

    <v-content>
      <router-view/>
    </v-content>

    <vue-progress-bar></vue-progress-bar>
  </v-app>
</template>

<script lang="ts">
import { Vue, Component, Watch } from 'vue-property-decorator'
import { State } from 'vuex-class'
import Drawer from '@/components/Drawer.vue'

@Component({
  components: {
    Drawer
  }
})
export default class App extends Vue {
  drawerToggle: boolean = false
  @State(state => state.Settings.isDarkMode) isDarkMode!: boolean

  @Watch('isDarkMode')
  onChangeDarkMode(newVal: boolean, oldVal: boolean) {
    this.$vuetify.theme.dark = newVal
  }
}
</script>

<style lang="scss">
@import './assets/css/reset.css';

#app {
  &.theme--light {
    background-image: url('assets/bg-light.png');
  }
  &.theme--dark {
    background-image: url('assets/bg-dark.png');
  }
  
  .loading-bg {
    background-color: var(--v-secondary-darken1);
  }
  .content-expand > div {
    width: 100%;
    height: 100%;
  }
}
</style>
