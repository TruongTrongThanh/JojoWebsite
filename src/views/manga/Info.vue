<template>
  <div class="manga-info">
    <div class="banner">
    </div>
    <div class="content container">
      <div class="mb-5 peak row">
        <div class="text-left col-9">
          <h2 class="font-weight-bold title">DIAMOND IS UNBREAKABLE</h2>
          <h4 class="sub-title">Part IV</h4>
        </div>
        <div class="text-right font-italic align-self-end author col"><h3>Araki Hirohiko</h3></div>
      </div>
      <div class="mx-4 no-gutters details row">
        <div class="text-left mr-4 info col-4">
          <h4 class="m-0 p-2 text-center bar-title">Thông tin truyện</h4>
          <div class="p-3 bar-content">
            Số chương: 100 <br/>
            Đã dịch: 50 <br/>
            Năm: 1990 - 2000 <br/>
            Thể loại: Thriller <br/>
            Nội dung: In 1999, the Arrow, manifesting latent Stand abilities, travels throughout Morioh, Japan; as high schooler Josuke Higashikata (illegitimate son of Joseph) and his friends seek out the culprits of a series of homicides. 
          </div>
        </div>
        <div class="chapter col">
          <h4 class="m-0 p-2 text-center bar-title">Danh sách chương</h4>
          <div class="pr-3 py-3 justify-content-end form-inline">
            <span class="mr-3">Tìm kiếm</span>
            <input class="search form-control" type="text">
          </div>
          <ul class="list-group">
            <li 
              v-for="i in 50" :key="i" 
              :class="i % 2 == 0 ? 'dark' : 'darken'" 
              class="text-left list-group-item"
            >
              <img class="icon" :src="require('@/assets/no-image-icon.png')">
              <span class="ml-3 chapter-title">Chapter 00{{ i }} - A long long chapter title</span>
              <span class="">52 likes</span>
              <span class="text-right">2018-08-02</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class MangaInfo extends Vue {}
</script>

<style scoped lang="scss">
  @import url('https://fonts.googleapis.com/css?family=Abril+Fatface|Francois+One|Russo+One');

  .banner {
    width: 100%;
    height: 400px;
    background-color: black;
    background-image: url('../../assets/dib-large-banner.png');
    background-repeat: no-repeat;
    background-position: center; 
  }

  .content {
    position: relative;
    bottom: 170px;

    .title {
      padding: 5px 20px;
      font-family: 'Russo One', sans-serif;
      background-image: linear-gradient(to right, rgba(255, 37, 200, 0.9) , rgba(255, 255, 255, 0));
    }

    .sub-title {
      padding: 5px 20px;
      font-family: 'Abril Fatface', cursive;
      background-image: linear-gradient(to right, rgba(24, 24, 24, 0.9) , rgba(255, 255, 255, 0));
    }

    .author {
      padding: 5px 20px;
      background-image: linear-gradient(to left, rgba(24, 24, 24, 0.9) , rgba(255, 255, 255, 0));
    }
  }

  .details {
      height: 500px;
      position: relative;
      bottom: 10px;

      .info, .chapter {
        background-color: rgba(0, 0, 0, .7);
        width: 200px;
        height: 500px;
        font-size: 17px;
      }

      .bar-title {
          background-color: rgba(255, 37, 200, .7);
          font-family: 'Francois One', sans-serif;
        }

      .chapter {
        .search {
          height: 28px;
        }
        .list-group-item {

          display: grid;
          grid-template-columns: 10% 1fr 20% 15%;
          justify-items: center;
          align-items: center;

          .icon {
            //max-width: 60px;
            width: 100%;
          }
          .chapter-title {
            justify-self: start;
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
