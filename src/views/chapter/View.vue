<template>
  <div v-if="chapterReading.chapterInfo" class="chapter-view">
    <ul v-if="this.$route.query.mode === 'multi-page'" class="paper-list">
      <li class="paper-item">
        test test
      </li>
    </ul>
    <one-page v-else/>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Watch } from 'vue-property-decorator';
import { getModule } from 'vuex-module-decorators';
import ChapterReading from '@/store/modules/chapter-reading.ts';
import OnePage from '@/components/OnePage.vue';
import { Manga, Chapter } from '@/models/manga.ts';
import * as MangaAPI from '@/apis/manga-api.ts';

@Component({
  components: {
    OnePage,
  },
})
export default class ChapterView extends Vue {
  chapterReading = getModule(ChapterReading, this.$store);

  get SelectedPageIndex(): number {
    return this.chapterReading.selectedPageIndex;
  }
  set SelectedPageIndex(n: number) {
    this.chapterReading.setSelectedPageIndex(n);
  }
  get SelectedChapterID(): string {
    return this.chapterReading.selectedChapterID;
  }
  set SelectedChapterID(id: string) {
    this.chapterReading.setSelectedChapterID(id);
  }

  @Watch('SelectedChapterID')
  onSelectedChapterID(val: string, oldVal: string) {
    this.init();
  }

  async init() {
    this.$Progress.start();
    this.SelectedPageIndex = this.strToNumber(this.$route.query.page as string, 1);
    this.SelectedChapterID = this.$route.params.chapterID;
    this.setTitle('Loading...');
    try {
      const chapter = await MangaAPI.getChapterByID(this.$route.params.chapterID);
      this.chapterReading.setChapterInfo(chapter);
      if (chapter.mangaRef) {
        const mangaPromise = MangaAPI.getMangaByID(chapter.mangaRef);
        const chapterListPromise = MangaAPI.getChapterList(chapter.mangaRef);

        const res = await Promise.all([mangaPromise, chapterListPromise]);
        const manga = res[0];
        manga.chapterList = res[1];
        this.chapterReading.setMangaInfo(manga);
      }
    } catch (err) {
      this.handleError(err);
    }
  }

  async created() {
    this.init();
  }

  beforeDestroy() {
    this.chapterReading.setChapterInfo(null);
  }
}
</script>

<style scoped lang="scss">
</style>