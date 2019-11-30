<template>
  <v-container class="chapter-view">
    <v-skeleton-loader
      v-for="paper in renderPapers"
      :key="paper.id"
      :loading="!paper.isDoneLoading"
      width="70%"
      height="700"
      type="image"
      class="mx-auto content-expand mb-3"
    >

      <img
        :src="paper.url.blogspot"
        class="paper-img d-block mx-auto"
        @click="onPaperClick"
      >
    </v-skeleton-loader>

    <div
      v-show="!isOnePageMode && everyPapersAreDone"
      v-intersect="onEnding"
      class="text-center mt-10"
    >
      <v-divider class="my-5"/>
      <div class="headline grey--text">
        <span v-if="autoNext">
          - - -&nbsp;
          <span v-if="isLastChapter">Trở về trang truyện</span>
          <span v-else>Chuyển sang chương kế tiếp</span>
          <span>&nbsp;({{ autoNextTimer }}) - - -</span>
        </span>
        <span v-else>- - - HẾT - - -</span>
      </div>
    </div>

    <v-fab-transition>
      <v-btn fixed dark fab bottom right
        v-show="!isOnePageMode && isIntersecting"
        color="pink"
        @click="nextChapter"
      >
        <v-icon>mdi-arrow-right-bold</v-icon>
      </v-btn>
    </v-fab-transition>
    <v-fab-transition>
      <v-btn fixed dark fab bottom left
        v-show="!isOnePageMode && isIntersecting"
        color="pink"
        @click="prevChapter"
      >
        <v-icon>mdi-arrow-left-bold</v-icon>
      </v-btn>
    </v-fab-transition>
  </v-container>
</template>

<script lang="ts">
import { Vue, Component, Mixins, Watch } from 'vue-property-decorator'
import { Paper, Chapter } from '@/models/manga'
import PageMixins from '@/mixins/page-mixin'
import { State } from 'vuex-class'

@Component
export default class ChapterView extends Mixins(PageMixins) {
  @State(state => state.ChapterNavigation.currentChapter)
  readonly chapter!: Chapter
  @State(state => state.ChapterNavigation.savedPapers)
  readonly savedPapers!: Paper[]
  @State(state => state.ChapterNavigation.mangaSelector)
  readonly mangaSelector: any
  @State(state => state.ChapterNavigation.chapterSelector)
  readonly chapterSelector: any
  @State(state => state.ChapterNavigation.chapterSelectList)
  readonly chapterSelectList: any
  @State(state => state.ChapterNavigation.paperSelector)
  readonly paperSelector: any
  @State(state => state.Settings.autoNext)
  readonly autoNext!: boolean
  @State(state => state.Settings.isOnePageMode)
  readonly isOnePageMode!: boolean

  hideAppBarWhenScroll: boolean = true
  isReaderMode: boolean = true

  papers: Paper[] = []
  currentPage: number = 1
  autoNextTimer = 2
  isIntersecting: boolean = false

  get everyPapersAreDone() {
    if (this.papers.length > 0) {
      return this.papers.every(paper => !!paper.isDoneLoading)
    }
    return false
  }
  get currentChapterIndex() {
    if (this.chapter) {
      return this.chapterSelectList.findIndex((chap: any) => chap.value === this.chapter!.id)
    }
    return -1
  }
  get isLastChapter() {
    return this.currentChapterIndex === 0
  }
  get isFirstChapter() {
    return (this.currentChapterIndex) === this.chapterSelectList.length - 1
  }
  get renderPapers() {
    if (this.isOnePageMode) {
      return this.papers.slice(this.currentPage - 1, this.currentPage)
    } else {
      return this.papers
    }
  }

  async created() {
    this.$Progress.start()
    if (!this.chapter || this.$route.params.id !== this.chapter.id) {
      await Promise.all([
        this.fetchPapers(),
        this.fetchChapter()
      ])
    } else {
      this.papers = this.savedPapers
    }
    this.setup()
    this.$Progress.finish()
  }

  async fetchChapter() {
    const chapter = await this.$mangaAPI.getChapterByID(this.$route.params.id)
    this.$store.commit('setCurrentChapter', chapter)
  }
  async fetchPapers() {
    this.papers = await this.$mangaAPI.getPaperList(this.$route.params.id)
    this.$store.commit('setSavedPapers', this.papers)
  }

  setup() {
    // set loading for papers
    for (let i = 0; i < this.papers.length; i++) {
      this.$helper.fetchImage(this.papers[i].url.blogspot)
      .then(() => this.$set(this.papers[i], 'isDoneLoading', true))
    }

    if (this.isOnePageMode) {
      this.$store.commit('setHideAppBarWhenScroll', false)
    }
    if (this.$route.query.page && !isNaN(Number(this.$route.query.page))) {
      this.currentPage = Number(this.$route.query.page)
      this.$store.commit('setOnePageMode', true)
    }
    if (this.currentPage < 0 && this.currentPage >= this.papers.length) {
      this.$router.push({
        name: 'manga-details',
        params: { mangaID: this.mangaSelector.value }
      })
    }
  }

  onPaperClick(e: any) {
    const imgWidth = e.target.naturalWidth
    const clickCoordWidth = e.layerX - e.target.offsetLeft

    if (imgWidth / clickCoordWidth >= 2) {
      // left click
      this.prevPage()
    } else {
      // right click
      this.nextPage()
    }
  }

  nextChapter() {
    const nextIndex = this.currentChapterIndex - 1

    if (nextIndex >= 0) {
      this.$router.push({
        params: { id: this.chapterSelectList[nextIndex].value },
        query: this.isOnePageMode ? { page: '1' } : undefined
      })
    } else {
      this.$router.push({
        name: 'manga-details',
        params: { mangaID: this.mangaSelector }
      })
    }
  }
  async prevChapter(atLastPage?: boolean) {
    const prevIndex = this.currentChapterIndex + 1

    if (prevIndex < this.chapterSelectList.length) {

      if (atLastPage) {
        this.$Progress.start()
        const papersPromise = this.$mangaAPI.getPaperList(this.chapterSelectList[prevIndex].value)
        const chapterPromise = this.$mangaAPI.getChapterByID(this.chapterSelectList[prevIndex].value)
        const [papers, chapter] = await Promise.all([papersPromise, chapterPromise])
        this.$Progress.finish()

        this.$store.commit('setSavedPapers', papers)
        this.$store.commit('setCurrentChapter', chapter)

        this.$router.push({
          params: { id: this.chapterSelectList[prevIndex].value },
          query: { page: papers.length.toString() }
        })
      } else {
        this.$router.push({
          params: { id: this.chapterSelectList[prevIndex].value },
          query: { page: '1' }
        })
      }
    } else {
      this.$router.push({
        name: 'manga-details',
        params: { mangaID: this.mangaSelector }
      })
    }
  }
  nextPage() {
    const nextIndex = this.currentPage + 1
    if (nextIndex <= this.papers.length) {
      this.$router.push({
        query: { page: nextIndex.toString() }
       })
    } else {
      this.nextChapter()
    }
  }
  prevPage() {
    const prevIndex = this.currentPage - 1
    if (prevIndex > 0) {
      this.$router.push({
        query: { page: prevIndex.toString() }
       })
    } else {
      this.prevChapter(true)
    }
  }

  onEnding(entries: IntersectionObserverEntry[], observer: IntersectionObserver, isIntersecting: boolean) {
    this.isIntersecting = isIntersecting
    if (this.autoNext) this.setAutoNextInterval()
  }

  setAutoNextInterval() {
    const autoNextId = setInterval(() => {
      if (!this.autoNext) {
        clearInterval(autoNextId)
        return
      }
      if (this.isIntersecting) {
        this.autoNextTimer--
      }
      if (this.autoNextTimer === 0) {
        clearInterval(autoNextId)
        this.nextChapter()
      }
    }, 1000)
    if (!this.isIntersecting) {
      this.autoNextTimer = 2
      clearInterval(autoNextId)
    }
  }
}
</script>

<style scoped lang="scss">
.chapter-view {
  .paper-img {
    max-width: 100%;
    cursor: pointer;
  }
}
</style>
