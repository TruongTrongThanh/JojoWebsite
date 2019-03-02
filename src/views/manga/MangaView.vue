<template>
  <div class="manga-view container">
    <div v-for="manga in mangaList" :key="manga.id" class="card">
      <img :src="manga.cardImgSrc" class="card-img-top" :alt="manga.name">
      <div class="card-body text-left">
        <h5 class="card-title">{{ manga.name }}</h5>
        <h6 class="card-subtitle text-muted mb-2">{{ manga.subName }}</h6>
        <div class="manga-status">
          <div>Tình trạng</div>
          <div class="text-right text-danger">Unfinished</div>
          <div>Số chương</div>
          <div class="text-right">200</div>
          <div>Đã dịch</div>
          <div class="text-right">100</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class MangaView extends Vue {
  private mangaList = [
    {
      id: 'phantom-blood',
      name: 'Phantom Blood',
      cardImgSrc: require('@/assets/pb_card.png'),
      subName: 'Part 1',
    },
    {
      id: 'diamond-is-unbreakable',
      name: 'Diamond is Unbreakable',
      cardImgSrc: require('@/assets/dib_card.png'),
      subName: 'Part 4',
    },
  ];
}
</script>

<style lang="scss">
  @import url('https://fonts.googleapis.com/css?family=Abril+Fatface');

  .card {
    width: 290px;
    display: inline-block;
    margin: 20px;

    .card-title {
      font-family: 'Abril Fatface', cursive;
    }

    .manga-status {
      display: grid;
      grid-template-columns: 1fr 1fr;
    }

    .card-img-top {
      height: 290px;
    }
  }
</style>
