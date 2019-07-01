<template>
  <div class="one-page">
    <div class="position-relative d-inline-block">
      <img :src="UrlRender">
      <div class="clickable prev-zone" @click="prevPage"/>
      <div class="clickable next-zone" @click="nextPage"/>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch } from 'vue-property-decorator'
import { getModule } from 'vuex-module-decorators'
import ChapterReading from '@/store/modules/chapter-reading.ts'
import { Manga, Chapter, Paper } from '@/models/manga.ts'
import { PaperOptions } from '@/models/options.ts'
import * as MangaAPI from '@/apis/manga-api.ts'

@Component
export default class OnePage extends Vue {
  // private cachedPapers: Paper[] = [];

  get MangaInfo(): Manga {
    return this.chapterReading.mangaInfo!
  }
  get ChapterInfo(): Chapter {
    return this.chapterReading.chapterInfo!
  }

  get UrlRender(): string {
    if (this.paper) {
      return this.paper.url.blogspot
    } else {
      return ''
    }
  }

  get Page(): number {
    return this.strToNumber(this.$route.query.page as string, 1)
  }

  get SelectedPageIndex(): number {
    return this.chapterReading.selectedPageIndex
  }
  set SelectedPageIndex(val: number) {
    this.chapterReading.setSelectedPageIndex(val)
  }

  get SelectedChapterID(): string {
    return this.chapterReading.selectedChapterID
  }
  set SelectedChapterID(id: string) {
    this.chapterReading.setSelectedChapterID(id)
  }

  chapterReading = getModule(ChapterReading, this.$store)
  private paper: Paper | null = null

  prevPage() {
    if (this.Page <= 1) {
      if (this.ChapterInfo.index <= 1) this.$emit('out')
      else {
        const prevChapter = this.MangaInfo.chapterList.find(c => c.index === this.ChapterInfo.index - 1)
        this.$emit('prev-chapter', prevChapter!.id)
      }
    } else {
      this.jumpToPage(this.Page - 1)
    }
  }
  nextPage() {
    if (this.Page >= this.ChapterInfo.paperListSize) {
      if (this.ChapterInfo.index >= this.MangaInfo.transChapterNumber) this.$emit('out')
      else this.$emit('next-chapter')
    } else {
      this.jumpToPage(this.Page + 1)
    }
  }

  jumpToPage(p: number) {
    this.$router.push({
      query: { page: String(p) }
    })
  }

  // cachedInitPage(val: string) {
  //   const page = this.strToNumber(val, 1);
  //   let i = 0;
  //   const cachedPaper = this.cachedPapers.find((paper, index) => {
  //     if (paper.chapterRef.id === this.ChapterInfo.id && paper.index === page) {
  //       i = index;
  //       return true;
  //     }
  //     return false;
  //   });
  //   if (cachedPaper) {
  //     this.paper = cachedPaper;
  //     // Put the newest cached paper at bottom
  //     this.cachedPapers.push(this.cachedPapers.splice(i, 1)[0]);
  //   } else {
  //     this.$Progress.start();
  //     this.init();
  //   }
  //   this.SelectedPageIndex = Number(page);
  // }
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