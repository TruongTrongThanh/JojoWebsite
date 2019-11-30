<template>
  <div class="chapter-nav pa-0">
    <v-row no-gutters justify-lg="end">
      <v-col cols="7" lg="5" class="mr-3">
        <v-select
          v-model="mangaSelectorModel"
          :items="mangaSelectList"
          label="Truyện"
          class="d-flex"
          outlined
          hide-details
          dense
        ></v-select>
      </v-col>
      <v-col cols="4" lg="3">
        <v-select
          v-model="chapterSelectorModel"
          :items="chapterSelectList"
          label="Chương"
          class="d-flex"
          outlined
          hide-details
          dense
        ></v-select>
      </v-col>
    </v-row>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Watch } from 'vue-property-decorator'
import { State } from 'vuex-class'
import { Chapter, Manga } from '@/models/manga'

@Component
export default class ChapterNavigation extends Vue {
  @State(state => state.ChapterNavigation.currentChapter)
  readonly currentChapter!: Chapter

  @State(state => state.ChapterNavigation.mangaSelector)
  readonly mangaSelector: any
  @State(state => state.ChapterNavigation.mangaSelectList)
  readonly mangaSelectList: any
  @State(state => state.ChapterNavigation.chapterSelector)
  readonly chapterSelector: any
  @State(state => state.ChapterNavigation.chapterSelectList)
  readonly chapterSelectList: any
  @State(state => state.Settings.isOnePageMode)
  readonly isOnePageMode!: boolean

  get mangaSelectorModel() {
    return this.mangaSelector
  }
  set mangaSelectorModel(val) {
    this.$store.commit('setMangaSelector', val)
    this.$router.push({
      name: 'manga-details',
      params: { mangaID: val }
    })
  }
  get chapterSelectorModel() {
    return this.chapterSelector
  }
  set chapterSelectorModel(val) {
    this.$store.commit('setChapterSelector', val)
    this.$router.push({
      name: 'chapter-view',
      params: { id: val },
      query: this.isOnePageMode ? { page: '1' } : undefined
    })
  }

  async created() {
    const mangaList = await this.$mangaAPI.getMangaList()
    this.$store.commit('setMangaSelectList', mangaList.map(manga => {
      return {
        text: manga.name,
        value: manga.id
      }
    }))
  }

  @Watch('currentChapter')
  async onChangedChapter(newVal: Chapter, oldVal: Chapter) {
    this.$store.commit('setChapterSelector', this.currentChapter.id)

    if (!oldVal || (oldVal.mangaRef !== newVal.mangaRef)) {
      const [manga, chapterList] = await Promise.all([
        this.$mangaAPI.getMangaByID(newVal.mangaRef),
        this.$mangaAPI.getChapterList(newVal.mangaRef)
      ])
      this.$store.commit('setChapterSelectList', chapterList.map(chap => {
        return {
          text: `${chap.index.toString().padStart(3, '0')} - ${chap.name}`,
          value: chap.id
        }
      }))
      this.$store.commit('setMangaSelector', manga.id)
    }
  }
}
</script>

<style scoped lang="scss">
</style>
