<template>
  <div class="manga-tile rounded-top">
    <img class="w-100 rounded-top" :src="manga.bgSrc" :alt="manga.text">
    <div class="text"><span>{{ manga.desc }}</span></div>
  </div>
</template>

<script lang="ts">
import { Vue, Prop, Component } from 'vue-property-decorator';
import { Manga } from '@/models/manga.ts';

@Component
export default class MangaTile extends Vue {
  @Prop() private readonly manga!: Manga;
}
</script>

<style scoped lang="scss">
  @import url('https://fonts.googleapis.com/css?family=Abril+Fatface');
  //font-family: 'Abril Fatface', cursive;
  .manga-tile {
    width: 200px;
    height: 200px;
    position: relative;

    .text {
      font-family: 'Abril Fatface', cursive;
      position: absolute;
      font-size: 40px;
      bottom: 0;
      width: 100%;
      text-align: left;
      background-color: #0009;

      span {
        margin-left: 10px;
      }
    }
  }
</style>