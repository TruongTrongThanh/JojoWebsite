<template>
  <div v-if="manga" class="manga-details">
    <v-img
      :src="manga.banner"
      class="mt-7"
      width="100%"
      height="400"
    >
    </v-img>
    <v-container class="content">
      <MangaTitle :manga="manga"/>
      <v-row>
        <v-col cols="4">
          <MangaInfo :manga="manga"/>
        </v-col>
        <v-col></v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { Genre, Manga, Chapter } from '@/models/manga.ts'
import { ChapterOptions } from '@/models/options.ts'
import MangaTitle from '@/components/MangaTitle.vue'
import MangaInfo from '@/components/MangaInfo.vue'

@Component({
  components: {
    MangaTitle,
    MangaInfo
  }
})
export default class MangaDetails extends Vue {
  manga: Manga | null = null
  bannerIsCompleted: boolean = false

  get screenWidth(): number {
    return screen.width
  }

  created() {
    this.$Progress.start()
    this.$helper.setTitle('Loading...')
    const mangaPromise = this.$mangaAPI.getMangaByID(this.$route.params.mangaID)
    const chapterListPromise = this.$mangaAPI.getChapterList(this.$route.params.mangaID)
    const genreListPromise = this.$mangaAPI.getGenreList(this.$route.params.mangaID)
    Promise.all([mangaPromise, chapterListPromise, genreListPromise])
    .then(res => {
      this.manga = res[0]
      this.manga.chapterList = res[1]
      this.manga.genres = res[2]
      this.$helper.setTitle(this.manga.name)
      this.$Progress.finish()
    })
    .catch(err => this.$helper.handleError(err))
  }
}
</script>

<style scoped lang="scss">
@import url('https://fonts.googleapis.com/css?family=Abril+Fatface|Francois+One|Russo+One');

.banner {
  width: 100%;
  height: 400px;
  background-color: black;
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

  .info, .chapter {
    background-color: rgba(0, 0, 0, .7);
    width: 200px;
    font-size: 17px;
  }

  .bar-title {
    background-color: rgba(255, 37, 200, .7);
    font-family: 'Francois One', sans-serif;
  }

  .sticky-top-offset {
    top: 100px;
  }

  .info {
    .info-item {
      border-bottom: 1px solid #6f6f6f;
    }
  }

  .chapter {
    .search {
      height: 28px;
    }
    .item {
      .icon {
        max-width: 65px;
      }

      &.dark {
        background-color: rgba(0, 0, 0, .6);
      }
      &.darken {
        background-color: rgba(26, 26, 26, .6);
      }
    }
  }
}
</style>
