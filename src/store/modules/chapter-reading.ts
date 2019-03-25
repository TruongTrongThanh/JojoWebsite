import { Module, VuexModule, Mutation } from 'vuex-module-decorators';
import { Manga, Chapter } from '@/models/manga';

@Module({ name: 'chapterReading' })
export default class ChapterReading extends VuexModule {
  chapterInfo: Chapter | null = null;
  mangaInfo: Manga | null = null;

  @Mutation
  setChapterInfo(chap: Chapter | null) {
    this.chapterInfo = chap;
  }

  @Mutation
  setMangaInfo(m: Manga | null) {
    this.mangaInfo = m;
  }
}
