<template>
  <div class="manga-info">
    <div class="banner">
    </div>
    <div class="content container">
      <div class="mb-4 peak row">
        <div class="text-left col-9">
          <h1 class="font-weight-bold title">Diamond is Unbreakable</h1>
          <h3 class="sub-title">Part IV</h3>
        </div>
        <div class="text-right align-self-end col"><h2>Araki Hirohiko</h2></div>
      </div>
      <div class="details row">
        <div class="border-right border-success text-left info col-4">
          Số chương: 100 <br/>
          Đã dịch: 50 <br/>
          Năm: 1990 - 2000 <br/>
          Thể loại: Thriller <br/>
          Nội dung: In 1999, the Arrow, manifesting latent Stand abilities, travels throughout Morioh, Japan; as high schooler Josuke Higashikata (illegitimate son of Joseph) and his friends seek out the culprits of a series of homicides. 
        </div>
        <ul class="chapter list-group col">
          <li 
            v-for="i in 50" :key="i" 
            :class="i % 2 == 0 ? 'dark' : 'darken'" 
            class="text-right list-group-item"
            v-text="'Chapter ' + i"
          />
        </ul>
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
  }

  .details {
      height: 500px;
      position: relative;
      bottom: 10px;

      .info, .chapter-list {
        width: 200px;
        height: 500px;
        opacity: .7;
        font-size: 19px;
      }

      .info {
        background-color: black;
        position: sticky;
        top: 0;
      }
      .chapter {
        background-color: black;
        .list-group-item {
          &.dark {
            background-color: rgb(26, 26, 26);
          }
          &.darken {
            background-color: black;
          }
        }
      }
    }
</style>
