import { Module, VuexModule, Mutation } from 'vuex-module-decorators'
import { Manga, Chapter } from '@/models/manga'

@Module
export default class ChapterNavigation extends VuexModule {
  currentChapter: Chapter | null = null

  mangaSelector: any | null = null
  mangaSelectList: any[] = []

  chapterSelector: any | null = null
  chapterSelectList: any = []

  @Mutation
  setCurrentChapter(chap: Chapter | null) {
    this.currentChapter = chap
  }

  @Mutation
  setMangaSelector(val: any) {
    this.mangaSelector = val
  }
  @Mutation
  setMangaSelectList(val: any) {
    this.mangaSelectList = val
  }
  @Mutation
  setChapterSelector(val: any) {
    this.chapterSelector = val
  }
  @Mutation
  setChapterSelectList(val: any) {
    this.chapterSelectList = val
  }
}
