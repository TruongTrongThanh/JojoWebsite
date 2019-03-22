<template>
  <div class="manga-view container">
    <div v-show="isPageReady" class="list-bar">
      <manga-bar
        v-for="manga in mangaList" 
        :key="manga.id"  
        :manga="manga"
        @completed="finish"
      />
    </div>
    <spinner v-show="!isPageReady"/>
    <div class="araki-quotes">
      Araki quotes...
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator';

import MangaTile from '@/components/MangaTile.vue';
import MangaBar from '@/components/MangaBar.vue';
import Spinner from '@/components/Spinner.vue';

import { Manga } from '@/models/manga.ts';
import * as MangaAPI from '@/apis/manga-api';

@Component({
  components: {
    MangaTile,
    MangaBar,
    Spinner,
  },
})
export default class MangaView extends Vue {
  mangaList: Manga[] = [];
  isPageReady: boolean = false;
  counterLoading: number = 0;

  created() {
    MangaAPI.getMangaList()
    .then(res => this.mangaList = res)
    .catch(err => console.log(err));
  }

  finish() {
    this.counterLoading++;
    if (this.counterLoading === this.mangaList.length) {
      this.isPageReady = true;
    }
  }
}
</script>

<style scoped lang="scss">
  .manga-view {
    display: grid;
    grid-template-columns: 65% 35%;
    grid-gap: 30px;
    $bg-color: rgba(0, 0, 0, 0.53);

    .araki-quotes {
      background-color: $bg-color;
      height: 500px;
    }

    .list-tile {
      display: grid;
      grid-template-columns: 1fr 1fr 1fr;
      grid-gap: 10px;
      //background-color: $bg-color;
      padding: 20px;
    }

    .list-bar {
      .manga-bar {
        margin-bottom: 20px;
      }
    }
  }
</style>
