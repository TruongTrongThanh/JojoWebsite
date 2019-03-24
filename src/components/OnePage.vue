<template>
  <div class="one-page">
    <img :src="UrlRender">
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import { getModule } from 'vuex-module-decorators';
import ChapterReading from '@/store/modules/chapter-reading.ts';
import { Chapter, Paper } from '@/models/manga.ts';
import { PaperOptions } from '@/models/options.ts';
import * as MangaAPI from '@/apis/manga-api.ts';

@Component
export default class OnePage extends Vue {
  chapterReading = getModule(ChapterReading, this.$store);
  isCompleted: boolean = false;

  get Paper(): Paper | undefined {
    if (this.chapterReading.chapterInfo !== null)
      return this.chapterReading.chapterInfo.paperList[0];
  }

  get UrlRender(): string {
    if (this.Paper) {
      return this.Paper.url.blogspot;
    } else {
      return '';
    }
  }

  created() {
    this.$Progress.start();
    const page = this.strToNumber(this.$route.query.page as string, 1);
    MangaAPI.getChapter(this.$route.params.chapterID, PaperOptions.ONE_PAGE_MODE(page))
      .then(res => {
        this.chapterReading.setChapterInfo(res);
        this.isCompleted = true;
        this.$Progress.finish();
      })
      .catch(err => console.log(err));
  }

  beforeDestroy() {
    this.chapterReading.setChapterInfo(null);
  }
}
</script>

<style scoped lang="scss">
</style>