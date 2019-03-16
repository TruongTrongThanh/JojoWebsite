<template>
  <div class="main-layout">
    <main-header/>
    <router-view class="offset"/>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import MainHeader from '@/components/Header.vue';

@Component({
  components: {
    MainHeader,
  },
})
export default class MainLayout extends Vue {}
</script>

<style lang="scss">
  .offset {
    padding-top: 265px;
    @media (min-width: 992px) {
      padding-top: 90px;
    }
  }
</style>
