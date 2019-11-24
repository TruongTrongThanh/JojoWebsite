<template>
  <div v-if="manga" class="manga-details">
    <v-skeleton-loader
      :loading="bannerLoading"
      width="100%"
      height="400"
      type="image"
      class="content-expand"
      transition="fade-transition"
    >
      <v-img
        :src="manga.banner"
        class="mt-7"
        width="100%"
        height="400"
      >
      </v-img>
    </v-skeleton-loader>
    <v-container class="content">
      <Title :manga="manga"/>
      <v-row>
        <v-col cols="4">
          <Info :manga="manga"/>
        </v-col>
        <v-col>
          <ChapterList :manga="manga"/>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Mixins } from 'vue-property-decorator'
import { Genre, Manga, Chapter } from '@/models/manga.ts'
import Title from '@/components/MangaTitle.vue'
import Info from '@/components/MangaInfo.vue'
import ChapterList from '@/components/MangaChapterList.vue'
import PageMixins from '@/mixins/page-mixin'

@Component({
  components: {
    Title,
    Info,
    ChapterList
  }
})
export default class MangaList extends Mixins(PageMixins) {
  manga: Manga | null = null
  bannerLoading: boolean = true

  get screenWidth(): number {
    return screen.width
  }

  async created() {
    this.$Progress.start()
    await this.fetchManga()
    await this.$helper.fetchImage(this.manga!.banner)
    this.bannerLoading = false
    this.$Progress.finish()
  }

  async fetchManga() {
    this.$helper.setTitle('Loading...')
    const mangaPromise = this.$mangaAPI.getMangaByID(this.$route.params.mangaID)
    const chapterListPromise = this.$mangaAPI.getChapterList(this.$route.params.mangaID)
    const genreListPromise = this.$mangaAPI.getGenreList(this.$route.params.mangaID)
    try {
      const [manga, chapterList, genres] = await Promise.all([
        mangaPromise,
        chapterListPromise,
        genreListPromise
      ])
      this.manga = manga
      this.manga.chapterList = chapterList
      this.manga.genres = genres

      // DUMMY
      this.manga.themeColor = { r: 255, g: 37, b: 200, a: 1 }

      this.$helper.setTitle(this.manga.name)
    } catch (err) {
      this.$helper.handleError(err)
    }
  }
}
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css?family=Abril+Fatface|Russo+One');

.manga-details {
  .banner {
    width: 100%;
    height: 400px;
  }
  .content {
    position: relative;

    @media (min-width: 992px) {
      bottom: 170px;
    }
  }
  .details {
    position: relative;
    bottom: 10px;

    .sticky-top-offset {
      top: 100px;
    }
    .info {
      .info-item {
        border-bottom: 1px solid #6f6f6f;
      }
    }
  }
}
</style>
