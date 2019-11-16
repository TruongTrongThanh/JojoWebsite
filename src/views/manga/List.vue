<template>
  <div class="manga-list">
    <!-- skeleton-loader design -->
    <div v-if="mangaListLoading">
      <v-skeleton-loader
        v-for="i in 3"
        :key="i"
        width="722"
        height="100"
        class="mb-3 loading-bg"
        type="image"
      >
      </v-skeleton-loader>
    </div>
    <!-- actual content -->
    <div v-else class="list-bar">
      <MangaBar
        v-for="manga in mangaList"
        :key="manga.id"
        :manga="manga"
      />
    </div>

    <AuthorNote/>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch, Mixins } from 'vue-property-decorator'
import MangaBar from '@/components/MangaBar.vue'
import AuthorNote from '@/components/AuthorNote.vue'
import { Manga } from '@/models/manga.ts'
import PageMixins from '@/mixins/page-mixin'

@Component({
  components: {
    MangaBar,
    AuthorNote
  }
})
export default class MangaList extends Mixins(PageMixins) {
  title: string = 'Danh sách truyện'
  mangaList: Manga[] = []
  mangaListLoading: boolean = true

  created() {
    this.$Progress.start()

    this.$mangaAPI.getMangaList()
    .then(res => {
      this.mangaList = res
      this.mangaListLoading = false
      this.$Progress.finish()
    })
    .catch(err => this.$helper.handleError(err))
  }
}
</script>

<style scoped lang="scss">
.manga-list {
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
