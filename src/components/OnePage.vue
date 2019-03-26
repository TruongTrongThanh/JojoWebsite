<template>
  <div class="one-page">
    <div class="position-relative d-inline-block">
      <img :src="UrlRender">
      <div class="clickable prev-zone" @click="jumpToPage(Page - 1)"/>
      <div class="clickable next-zone" @click="jumpToPage(Page + 1)"/>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch } from 'vue-property-decorator';
import { getModule } from 'vuex-module-decorators';
import ChapterReading from '@/store/modules/chapter-reading.ts';
import { Manga, Chapter, Paper } from '@/models/manga.ts';
import { PaperOptions } from '@/models/options.ts';
import * as MangaAPI from '@/apis/manga-api.ts';

@Component
export default class OnePage extends Vue {
  chapterReading = getModule(ChapterReading, this.$store);
  private paper: Paper | null = null;
  private cachedPapers: Paper[] = [];

  get MangaInfo(): Manga {
    return this.chapterReading.mangaInfo!;
  }
  get ChapterInfo(): Chapter {
    return this.chapterReading.chapterInfo!;
  }

  get UrlRender(): string {
    if (this.paper) {
      return this.paper.url.blogspot;
    } else {
      return '';
    }
  }

  get Page(): number {
    return this.strToNumber(this.$route.query.page as string, 1);
  }

  get SelectedPageIndex(): number {
    return this.chapterReading.selectedPageIndex;
  }
  set SelectedPageIndex(val: number) {
    this.chapterReading.setSelectedPageIndex(val);
  }

  get SelectedChapterID(): string {
    return this.chapterReading.selectedChapterID;
  }
  set SelectedChapterID(id: string) {
    this.chapterReading.setSelectedChapterID(id);
  }

  @Watch('SelectedPageIndex')
  onSelectedPageIndexChanged(val: number, oldVal: number) {
    this.jumpToPage(val);
  }

  @Watch('SelectedChapterID')
  onSelectedChapterIDChanged(val: string, oldVal: string) {
    this.cachedInitPage('1');
  }

  @Watch('$route.query.page')
  onPageChanged(val: string, oldVal: string) {
    this.cachedInitPage(val);
  }

  cachedInitPage(val: string) {
    const page = this.strToNumber(val, 1);
    let i = 0;
    const cachedPaper = this.cachedPapers.find((paper, index) => {
      if (paper.chapterRef.id === this.ChapterInfo.id && paper.index === page) {
        i = index;
        return true;
      }
      return false;
    });
    if (cachedPaper) {
      this.paper = cachedPaper;
      // Put the newest cached paper at bottom
      this.cachedPapers.push(this.cachedPapers.splice(i, 1)[0]);
    } else {
      this.$Progress.start();
      this.init();
    }
    this.SelectedPageIndex = Number(page);
  }

  created() {
    this.SelectedPageIndex = Number(this.Page);
    this.init();
  }

  init() {
    MangaAPI.getPaperList(this.ChapterInfo!.id, PaperOptions.ONE_PAGE_MODE(this.Page))
      .then(res => {
        const chapter = this.ChapterInfo;
        if (chapter !== null) {
          chapter.paperList = res;
          this.chapterReading.setChapterInfo(chapter);
          const mangaName = this.chapterReading.mangaInfo!.name;
          this.setTitle('Chapter ' + chapter.index + ' / ' + mangaName);
        }
        this.cachedPapers.push(res[0]);
        if (this.cachedPapers.length > process.env.VUE_APP_CACHED_PAPER_SIZE) {
          this.cachedPapers.shift();
        }
        this.paper = res[0];
        this.$Progress.finish();
      })
      .catch(err => {
        if (err.name === '404') {
          this.$router.push({
            name: 'manga-info',
            params: { mangaID: this.ChapterInfo.mangaRef.id },
          });
        } else {
          this.handleError(err);
        }
      });
  }

  jumpToPage(page: number) {
    if (page > 0) {
      this.$router.push({
        query: { page: String(page) },
      });
    } else {
      this.$router.push({
        name: 'manga-info',
        params: { mangaID: this.ChapterInfo.mangaRef.id },
      });
    }
  }
}
</script>

<style scoped lang="scss">
  .prev-zone, .next-zone {
    display: block;
    position: absolute;
    top: 0;
    width: 50%;
    height: 100%;
  }
  .prev-zone {
    left: 0;
  }
  .next-zone {
    right: 0;
  }
</style>