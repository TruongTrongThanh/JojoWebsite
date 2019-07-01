<template>
  <div class="manga-view container">
    <div class="list-bar">
      <manga-bar
        v-for="manga in mangaList"
        :key="manga.id"
        :manga="manga"
      />
    </div>
    <div v-if="!isMobile" class="araki-quotes">
      Araki quotes...
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator'

import MangaBar from '@/components/MangaBar.vue'

import { Manga } from '@/models/manga.ts'
import * as MangaAPI from '@/apis/manga-api'

@Component({
  components: {
    MangaBar
  }
})
export default class MangaView extends Vue {
  mangaList: Manga[] = []

  created() {
    this.setTitle('Danh sách truyện')
    this.$Progress.start()

    MangaAPI.getMangaList()
    .then(res => {
      this.mangaList = res
      this.$Progress.finish()
    })
    .catch(err => this.handleError(err))
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

    .list-bar {
      .manga-bar {
        margin-bottom: 20px;
      }
    }
  }
</style>
