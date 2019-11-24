<template>
  <v-container class="chapter-view">
    <v-skeleton-loader
      v-for="paper in papers"
      :key="paper.id"
      :loading="!paper.isDoneLoading"
      width="70%"
      height="700"
      type="image"
      class="mx-auto content-expand mb-3"
    >
      <img :src="paper.url.blogspot" class="paper-img d-block mx-auto">
    </v-skeleton-loader>
  </v-container>
</template>

<script lang="ts">
import { Vue, Component, Mixins, Watch } from 'vue-property-decorator'
import { Paper, Chapter } from '@/models/manga'
import PageMixins from '@/mixins/page-mixin'
import { State } from 'vuex-class'

@Component
export default class ChapterView extends Mixins(PageMixins) {
  @State(state => state.ChapterNavigation.mangaSelector)
  mangaSelector: any
  @State(state => state.ChapterNavigation.chapterSelector)
  chapterSelector: any

  hideAppBarWhenScroll: boolean = true
  isReaderMode: boolean = true

  chapter: Chapter | null = null
  papers: Paper[] = []

  async created() {
    this.$Progress.start()
    await Promise.all([
      this.fetchPapers(),
      this.fetchChapter()
    ])
    this.$Progress.finish()
  }

  async fetchChapter() {
    this.chapter = await this.$mangaAPI.getChapterByID(this.$route.params.id)
    this.$store.commit('setCurrentChapter', this.chapter)
  }
  async fetchPapers() {
    this.papers = await this.$mangaAPI.getPaperList(this.$route.params.id)

    for (let i = 0; i < this.papers.length; i++) {
      this.$helper.fetchImage(this.papers[i].url.blogspot)
      .then(() => this.$set(this.papers[i], 'isDoneLoading', true))
    }
  }
}
</script>

<style scoped lang="scss">
.chapter-view {
  .paper-img {
    max-width: 100%;
  }
}
</style>
