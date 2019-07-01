<template>
  <div id="app">
    <router-view/>
    <error-modal/>
    <button id="modal-open-btn" class="invisible" type="button" data-toggle="modal" data-target="#errorModal">Launch modal</button>
    <vue-progress-bar></vue-progress-bar>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import ErrorModal from '@/components/ErrorModal.vue'

@Component({
  components: {
    ErrorModal
  }
})
export default class App extends Vue {}
</script>

<style lang="scss">
  // Small devices (landscape phones, 576px and up)
  // @media (min-width: 576px) { ... }

  // Medium devices (tablets, 768px and up)
  // @media (min-width: 768px) { ... }

  // Large devices (desktops, 992px and up)
  // @media (min-width: 992px) { ... }

  // Extra large devices (large desktops, 1200px and up)
  // @media (min-width: 1200px) { ... }

  @import './assets/css/reset.css';

  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: white;

    .offset {
      padding-top: 100px;
    }

    .clickable {
      cursor: pointer;
    }
  }
</style>
