<template>
  <div v-if="chapterReading.chapterInfo" class="chapter-view">
    <ul v-if="this.$route.query.mode === 'multi-page'" class="paper-list">
      <li class="paper-item">
        test test
      </li>
    </ul>
    <one-page
      v-else
      @out="jumpToMangaInfo"
      @prev-chapter="jumpToChapter"
    />
  </div>
</template>

<script lang="ts">
import { Vue, Component, Watch } from 'vue-property-decorator'
import { getModule } from 'vuex-module-decorators'
import ChapterReading from '@/store/modules/chapter-reading.ts'
import OnePage from '@/components/OnePage.vue'
import { Manga, Chapter } from '@/models/manga.ts'
import { Options, ChapterOptions, PaperOptions } from '@/models/options.ts'
import * as MangaAPI from '@/apis/manga-api.ts'

@Component({
  components: {
    OnePage
  }
})
export default class ChapterView extends Vue {
  chapterReading = getModule(ChapterReading, this.$store)

  get MangaInfo(): Manga | null {
    return this.chapterReading.mangaInfo
  }
  get ChapterInfo(): Chapter | null {
    return this.chapterReading.chapterInfo
  }

  get SelectedPageIndex(): number {
    return this.chapterReading.selectedPageIndex
  }
  set SelectedPageIndex(n: number) {
    this.chapterReading.setSelectedPageIndex(n)
  }
  get SelectedChapterID(): string {
    return this.chapterReading.selectedChapterID
  }
  set SelectedChapterID(id: string) {
    this.chapterReading.setSelectedChapterID(id)
  }

  get Page(): number {
    return this.strToNumber(this.$route.query.page as string, 1)
  }

  // default mode
  get isOnePageMode(): boolean {
    return this.$route.query.mode === 'one-page' || this.$route.query.mode === ''
  }
  get isMultiPageMode(): boolean {
    return this.$route.query.mode === 'multi-page'
  }

  @Watch('SelectedChapterID')
  async onSelectedChapterID(val: string, oldVal: string) {
    this.$Progress.start()
    await this.chapterInit()
    await this.papersInit()
    this.$Progress.finish()
  }

  async chapterInit() {
    this.SelectedPageIndex = this.strToNumber(this.$route.query.page as string, 1)
    this.SelectedChapterID = this.$route.params.chapterID
    this.setTitle('Loading...')
    try {
      const chapter = await MangaAPI.getChapterByID(this.$route.params.chapterID)
      this.chapterReading.setChapterInfo(chapter)
      if (chapter.mangaRef) {
        const mangaPromise = MangaAPI.getMangaByID(chapter.mangaRef)
        const chapterListPromise = MangaAPI.getChapterList(chapter.mangaRef)

        const res = await Promise.all([mangaPromise, chapterListPromise])
        const manga = res[0]
        manga.chapterList = res[1]
        this.chapterReading.setMangaInfo(manga)
      }
    } catch (err) {
      this.handleError(err)
    }
  }

  async papersInit() {
    if (this.isOnePageMode) {
      MangaAPI.getPaperList(this.ChapterInfo!.id, PaperOptions.ONE_PAGE_MODE(this.Page))
      .then(res => {
        const chapter = this.ChapterInfo
        if (chapter !== null) {
          chapter.paperList = res
          this.chapterReading.setChapterInfo(chapter)
          const mangaName = this.chapterReading.mangaInfo!.name
          this.setTitle('Chapter ' + chapter.index + ' / ' + mangaName)
        }
        // this.cachedPapers.push(res[0]);
        // if (this.cachedPapers.length > process.env.VUE_APP_CACHED_PAPER_SIZE) {
        //   this.cachedPapers.shift();
        // }
        // this.paper = res[0];
        this.$Progress.finish()
      })
      .catch(err => {
        if (err.name === '404') {
          this.jumpToMangaInfo()
        } else {
          this.handleError(err)
        }
      })
    }
  }

  jumpToMangaInfo() {
    this.$router.push({
      name: 'manga-info',
      params: { mangaID: this.ChapterInfo!.mangaRef.id }
    })
  }
  jumpToChapter(id: string) {
    this.$router.push({
      params: { chapterID: id }
    })
  }

  async created() {
    this.$Progress.start()
    await this.chapterInit()
    await this.papersInit()
    this.$Progress.finish()
  }

  beforeDestroy() {
    this.chapterReading.setChapterInfo(null)
  }
}
</script>

<style scoped lang="scss">
</style>