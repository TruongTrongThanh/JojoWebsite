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
      <v-container>
        <router-view/>
      </v-container>
    </v-content>

    <vue-progress-bar></vue-progress-bar>
  </v-app>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import Drawer from '@/components/Drawer.vue'

@Component({
  components: {
    Drawer
  }
})
export default class App extends Vue {
  drawerToggle: boolean = false
}
</script>

<style lang="scss">
@import './assets/css/reset.css';

#app {
  &.theme--dark {
    background-image: url('assets/bg2.png');
  }
  .loading-bg {
    background-color: var(--v-secondary-darken1);
  }
}
</style>
