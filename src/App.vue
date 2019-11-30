<template>
  <v-app>
    <Drawer v-model="drawerToggle"/>

    <v-app-bar
      app 
      clipped-left
      :hide-on-scroll="hideAppBarWhenScroll"
      :scroll-off-screen="hideAppBarWhenScroll"
      :extension-height="isReaderMode && $vuetify.breakpoint.mdAndDown ? 60 : 0"
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

      <v-spacer></v-spacer>

      <ChapterNavigation
        v-if="isReaderMode && $vuetify.breakpoint.lgAndUp"
      />

      <template slot="extension">
        <ChapterNavigation
          v-if="isReaderMode && $vuetify.breakpoint.mdAndDown"
          class="mb-4"
        />
      </template>
    </v-app-bar>

    <v-content>
      <router-view :key="$route.fullPath"/>
    </v-content>

    <vue-progress-bar></vue-progress-bar>
  </v-app>
</template>

<script lang="ts">
import { Vue, Component, Watch } from 'vue-property-decorator'
import { State } from 'vuex-class'
import Drawer from '@/components/Drawer.vue'
import ChapterNavigation from '@/components/ChapterNavigation.vue'

@Component({
  components: {
    Drawer,
    ChapterNavigation
  }
})
export default class App extends Vue {
  @State(state => state.Settings.isDarkMode)
  readonly isDarkMode!: boolean
  @State(state => state.Settings.isReaderMode)
  readonly isReaderMode!: boolean
  @State(state => state.Settings.hideAppBarWhenScroll)
  readonly hideAppBarWhenScroll!: boolean
  @State(state => state.Settings.isOnePageMode)
  readonly isOnePageMode!: boolean

  drawerToggle: boolean = false

  @Watch('isDarkMode')
  onChangedDarkMode(newVal: boolean, oldVal: boolean) {
    this.$vuetify.theme.dark = newVal
  }

  @Watch('isOnePageMode')
  onChangedOnePageMode(newVal: boolean, oldVal: boolean) {
    if (newVal) {
      this.$router.push({
        query: { page: this.$route.query.page || '1' }
      })
    } else {
      this.$router.push({
        query: {}
      })
    }
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
