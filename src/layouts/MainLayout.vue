<template>
  <div class="main-layout">
    <main-header/>
    <keep-alive exclude="MangaInfo">
      <router-view class="offset"/>
    </keep-alive>
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
</style>
