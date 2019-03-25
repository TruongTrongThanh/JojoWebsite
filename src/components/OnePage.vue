<template>
  <div class="one-page container">
    <div class="mb-4 justify-content-center row">
      <button class="btn btn-primary col-1" @click="jumpToPage(Page - 1)">Back</button>
      <div class="input-group col-3">
        <div class="input-group-prepend">
          <div class="input-group-text">Trang</div>
        </div>
        <select class="form-control" v-model="selectedPage">
          <option
            v-for="i in ChapterInfo.paperListSize"
            :key="i"
            v-text="i"
          />
        </select>
      </div>
      <button class="btn btn-primary col-1" @click="jumpToPage(Page + 1)">Next</button>
    </div>
    <img :src="UrlRender" class="clickable" @click="jumpToPage(Page + 1)">
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch } from 'vue-property-decorator';
import { getModule } from 'vuex-module-decorators';
import ChapterReading from '@/store/modules/chapter-reading.ts';
import { Chapter, Paper } from '@/models/manga.ts';
import { PaperOptions } from '@/models/options.ts';
import * as MangaAPI from '@/apis/manga-api.ts';

@Component
export default class OnePage extends Vue {
  chapterReading = getModule(ChapterReading, this.$store);
  private paper: Paper | null = null;
  private cachedPapers: Paper[] = [];

  private selectedPage: number = 1;

  get ChapterInfo(): Chapter | null {
    return this.chapterReading.chapterInfo;
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

  @Watch('selectedPage')
  onSelectedPageChanged(val: string, oldVal: string) {
    this.jumpToPage(Number(val));
  }

  @Watch('$route.query.page')
  onPageChanged(val: string, oldVal: string) {
    const page = this.strToNumber(val, 1);
    let i = 0;
    const cachedPaper = this.cachedPapers.find((paper, index) => {
      if (paper.chapterRef.id === this.ChapterInfo!.id && paper.index === page) {
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
    this.selectedPage = Number(page);
  }

  created() {
    this.selectedPage = Number(this.Page);
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
            params: { mangaID: this.ChapterInfo!.mangaRef.id },
          });
        } else {
          this.handleError(err);
        }
      });
  }

  jumpToPage(page: number) {
    if (page > 0) {
      this.$router.push({
        query: { page: String(page) }
      })
    } else {
      this.$router.push({
        name: 'manga-info',
        params: { mangaID: this.ChapterInfo!.mangaRef.id },
      });
    }
  }
}
</script>

<style scoped lang="scss">
</style>