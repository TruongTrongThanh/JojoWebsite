import { Module, VuexModule, Mutation } from 'vuex-module-decorators'
import { Manga, Chapter } from '@/models/manga'

@Module
export default class ChapterReading extends VuexModule {
  chapterInfo: Chapter | null = null
  mangaInfo: Manga | null = null
  selectedPageIndex: number = 1
  selectedChapterID: string = ''

  @Mutation
  setChapterInfo(chap: Chapter | null) {
    this.chapterInfo = chap
  }

  @Mutation
  setMangaInfo(m: Manga | null) {
    this.mangaInfo = m
  }

  @Mutation
  setSelectedPageIndex(n: number) {
    this.selectedPageIndex = n
  }

  @Mutation
  setSelectedChapterID(id: string) {
    this.selectedChapterID = id
  }
}
