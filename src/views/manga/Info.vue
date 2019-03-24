<template>
  <div v-if="manga" class="manga-info">
    <img
      v-if="!isMobile"
      v-show="bannerIsCompleted"
      :src="manga.banner" 
      class="banner"
      @load="bannerIsCompleted = true"
    >
    <image-loading
      v-if="!isMobile"
      v-show="!bannerIsCompleted"
      class="mx-auto"
      name="mangaBanner" :width="screenWidth" :height="400"
    />
    <div class="content container">
      <div class="mb-2 peak row">
        <div class="text-left w-75">
          <h2 class="font-weight-bold d-none d-lg-block text-uppercase title">{{ manga.name }}</h2>
        </div>
      </div>
      <div class="mb-4 d-none d-lg-flex row">
        <h4 class="text-left sub-title col">{{ manga.subName }}</h4>
        <h3 class="text-right font-italic align-self-end author col">{{ manga.author }}</h3>
      </div>
      <div class="mx-lg-4 no-gutters align-items-start details row">
        <div 
          :class="{ 'sticky-top sticky-top-offset': isMobile ? false : true }" 
          class="text-left mb-3 mb-lg-0 mr-lg-4 info align-self-start col-12 col-lg-4"
        >
          <h4 class="m-0 p-2 text-center bar-title">Thông tin truyện</h4>
          <div class="py-3 px-4 bar-content">
            <div class="text-left">
              <div class="py-2 info-item no-gutters row">
                <span class="col">Số chương:</span>
                <span class="text-left col">{{ manga.chapterNumber }}</span>
              </div>
              <div class="py-2 info-item no-gutters row">
                <span class="col">Đã dịch:</span>
                <span class="text-left col">{{ manga.transChapterNumber }}</span>
              </div>
              <div class="py-2 info-item no-gutters row">
                <span class="col">Năm:</span>
                <span class="text-left col">{{ manga.yearStart }} - {{ manga.yearEnd !== -1 ? manga.yearEnd : 'Hiện tại' }}</span>
              </div>
              <div class="py-2 info-item no-gutters row">
                <span class="col">Thể loại:</span>
                <div class="text-left text-danger col">
                  <span 
                    v-for="(genre, index) in manga.genres"
                    :key="genre.name"
                    :style="`color: ${genre.color}`"
                  >
                    {{ index == 0 ? genre.name : '&nbsp;' + genre.name }}
                  </span>
                </div>
              </div>
              <div class="py-2">{{ manga.desc }}</div>
            </div>
            <div v-if="manga.chapterList.length > 0" class="text-center buttons">
              <button class="my-3 px-4 py-2 btn btn-success rounded-pill">Đọc chương đầu ({{ manga.chapterList[0].index }})</button>
            </div>
          </div>
        </div>
        <div class="chapter col-12 col-lg">
          <h4 class="m-0 p-2 text-center bar-title">Danh sách chương</h4>
          <div class="pr-3 py-3 align-items-center no-gutters row">
            <span class="mr-3 text-right col col-lg">Tìm kiếm</span>
            <input class="px-2 search form-control col-8 col-lg-4" type="text">
          </div>
          <ul v-if="manga.chapterList.length > 0" class="list container">
            <router-link 
              v-for="(chapter, index) in manga.chapterList" :key="chapter.id" 
              :class="index % 2 == 0 ? 'dark' : 'darken'"
              :to="`/chapter/${chapter.id}`"
              class="py-3 align-items-center item row"
            >
              <div class="col-8 col-lg-9">
                <div class="no-gutters align-items-center mr-3 mr-lg-0 row">
                  <img class="mr-2 mr-lg-3 col-4 icon col-lg-2" :src="chapter.cardSrc || require('@/assets/no-image-icon.png')">
                  <div class="text-left text-truncate chapter-title col">
                    {{ 'Chapter 00' + chapter.index }}{{ isMobile ? '' : ' - ' + chapter.name }}
                  </div>
                </div>
              </div>
              <div class="text-right col col-lg-3">
                <span class="mr-lg-2">{{ chapter.createdAt.toLocaleDateString("en-US") }}</span>
              </div>
            </router-link>
          </ul>
          <h5 v-else class="py-3 text-muted text-center">
            Không có chương nào :(
          </h5>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { Genre, Manga, Chapter } from '@/models/manga.ts';
import { ChapterOptions } from '@/models/options.ts';
import * as MangaAPI from '@/apis/manga-api.ts';
import ImageLoading from '@/components/ImageLoading.vue';

@Component({
  components: {
    ImageLoading,
  },
})
export default class MangaInfo extends Vue {
  manga: Manga | null = null;

  bannerIsCompleted: boolean = false;

  get screenWidth(): number {
    return screen.width;
  }

  created() {
    console.log('manga view');
    this.$Progress.start();

    MangaAPI.getManga(this.$route.params.mangaID, ChapterOptions.ALPHABET_ASC)
    .then(res => {
      this.manga = res;
      this.$Progress.finish();
    })
    .catch(err => {
      console.log(err);
      this.$Progress.fail();
    });
  }
}
</script>

<style scoped lang="scss">
  @import url('https://fonts.googleapis.com/css?family=Abril+Fatface|Francois+One|Russo+One');

  .banner {
    width: 100%;
    height: 400px;
    background-color: black;

    object-fit: contain;
  }

  .content {
    position: relative;

    @media (min-width: 992px) { 
      bottom: 170px;
    }

    .title {
      padding: 5px 20px;
      font-family: 'Russo One', sans-serif;
      background-image: linear-gradient(to right, rgba(255, 37, 200, 0.9) , transparent);
    }

    .sub-title {
      padding: 5px 20px;
      font-family: 'Abril Fatface', cursive;
      background-image: linear-gradient(to right, rgba(24, 24, 24, 0.9) , transparent);
    }

    .author {
      padding: 5px 20px;
      background-image: linear-gradient(to left, rgba(24, 24, 24, 0.9) , transparent);
    }
  }

  .details {
      position: relative;
      bottom: 10px;

      .info, .chapter {
        background-color: rgba(0, 0, 0, .7);
        width: 200px;
        font-size: 17px;
      }

      .bar-title {
        background-color: rgba(255, 37, 200, .7);
        font-family: 'Francois One', sans-serif;
      }

      .sticky-top-offset {
        top: 100px;
      }

      .info {
        .info-item {
          border-bottom: 1px solid #6f6f6f;
        }
      }

      .chapter {
        .search {
          height: 28px;
        }
        .item {
          .icon {
            max-width: 65px;
          }

          &.dark {
            background-color: rgba(0, 0, 0, .6);
          }
          &.darken {
            background-color: rgba(26, 26, 26, .6);
          }
        }
      }
    }
</style>
