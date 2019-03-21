<template>
  <div 
    :class="{ 'expand': isExpand }" 
    class="manga-bar"
    @click="shouldExpand($event)"
  >
    <img
      :src="manga.frontBarImgSrc" 
      :alt="manga.name"
      class="w-100"
      @load="finish"
    >
    <div class="text">
      <router-link :to="'/manga/' + manga.id"><span class="title">{{ manga.name }}</span></router-link>
      <div v-show="isExpand" class="expand-text rounded">
        Số chương: 100 <br/>
        Đã dịch: 50 <br/>
        Nội dung: {{ manga.desc }}
      </div>
    </div>
    <img 
      :src="manga.backBarImgSrc"
      class="background w-100 position-absolute" 
      @load="finish"
    >
  </div>
</template>

<script lang="ts">
import { Vue, Prop, Emit, Component } from 'vue-property-decorator';
import { Manga } from '@/models/manga.ts';

@Component
export default class MangaBar extends Vue {
  @Prop() readonly manga!: Manga;

  isExpand: boolean = false;
  counterLoading: number = 0;

  created() {
    console.log('manga-bar created');
  }

  shouldExpand(e: any) {
    if (e.target.className === 'title') this.isExpand = false;
    else this.isExpand = !this.isExpand;
  }

  finish() {
    this.counterLoading++;
    if (this.counterLoading === 2) this.$emit('completed');
  }
}
</script>

<style lang="scss">
  @import url('https://fonts.googleapis.com/css?family=Abril+Fatface');
  //font-family: 'Abril Fatface', cursive;
  $bar-height: 100px;
  $expand-bar-height: 400px;

  $outline-color: rgba(197, 197, 197, 0.788);

  .manga-bar {
    width: 722px;
    height: $bar-height;
    position: relative;

    a {
      color: rgb(204, 204, 204);
      &:hover {
        color: white;
        text-decoration: none;
      }
    }
    
    .background, .color-overlay {
      left: 0;
      filter: brightness(.4);
      z-index: -1;
    }
    .color-overlay {
      background-color: black;
      opacity: .5;
      height: 100%;
      top: 0;
    }

    img {
      object-fit: cover;
      object-position: 100% 0;
      height: $bar-height;
    }
    &.expand {
      height: $expand-bar-height;
      img {
        height: $expand-bar-height;
      }
    }

    .text {
      position: absolute;
      width: 100%;
      text-align: left;
      padding: 0 20px;
      top: 0;

      .title {
        font-family: 'Abril Fatface', cursive;
        font-size: 40px;
        line-height: $bar-height - 5;
      }

      .expand-text {
        font-size: 18px;
        width: 70%;
        background-color: #0009;
        padding: 20px;
      }
    }
  }
</style>