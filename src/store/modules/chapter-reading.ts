import { Module, VuexModule, Mutation } from 'vuex-module-decorators';
import { Chapter } from '@/models/manga';

@Module({ name: 'chapterReading' })
export default class ChapterReading extends VuexModule {
  chapterInfo: Chapter | null = null;

  @Mutation
  setChapterInfo(chapter: Chapter | null) {
    this.chapterInfo = chapter;
  }

  get getChapterInfo(): any {
    return this.chapterInfo;
  }
}
