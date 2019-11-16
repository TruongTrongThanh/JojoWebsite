<template>
  <div
    :class="{ 'is-expand': expandToggle }"
    class="manga-bar elevation-20"
    @click.stop="expandToggle = !expandToggle"
  >
    <div class="text">
      <router-link :to="'/manga/' + manga.id">
        <span class="manga-title">{{ manga.name }}</span>
      </router-link>
      <transition name="expand">
        <v-container
          v-show="expandToggle"
          class="expand-text mx-0 font-weight-light grey--text text--lighten-2"
        >
          <v-row no-gutters>
            <v-col cols="3">Số chương:</v-col>
            <v-col class="font-weight-bold">50</v-col>
          </v-row>
          <v-row no-gutters>
            <v-col cols="3">Đã dịch:</v-col>
            <v-col class="font-weight-bold">25</v-col>
          </v-row>
          <v-row class="mt-1"><v-col>{{ manga.desc }}</v-col></v-row>
        </v-container>
      </transition>
    </div>
    <v-skeleton-loader
      v-if="imgLoading"
      :height="expandToggle ? 400 : 100"
      width="722"
      class="loading-bg content-expand"
      type="image"
    >
    </v-skeleton-loader>
    <img v-show="!imgLoading"
      :src="manga.backBarImgSrc"
      class="background"
      @load="imgLoading = false"
    >
  </div>
</template>

<script lang="ts">
import { Vue, Prop, Component } from 'vue-property-decorator'
import { Manga } from '@/models/manga.ts'

@Component
export default class MangaBar extends Vue {
  @Prop({ type: Object, required: true }) readonly manga!: Manga

  expandToggle: boolean = false
  imgLoading: boolean = true
}
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css?family=Abril+Fatface');
//font-family: 'Abril Fatface', cursive;
$bar-height: 100px;
$expand-bar-height: 400px;
$border-radius: 20px;

$outline-color: rgba(197, 197, 197, 0.788);

.manga-bar {
  width: 722px;
  height: $bar-height;
  border-radius: $border-radius;
  position: relative;
  transition: height .5s;
  cursor: pointer;

  a {
    color: #aaa;
    text-decoration: none;
    &:hover {
      color: white;
    }
  }
  
  .content-expand > div {
    width: 100%;
    height: 100%;
  }

  .background {
    width: 100%;
    position: absolute;
    border-radius: $border-radius;
    transition: height .5s;
  }

  .background, .color-overlay {
    left: 0;
    z-index: 0;
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
  &.is-expand {
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
    z-index: 1;

    .manga-title {
      font-family: 'Abril Fatface', cursive;
      font-size: 40px;
      line-height: $bar-height - 5;
    }

    .expand-text {
      font-size: 18px;
      width: 70%;
      background-color: #000000d0;
      padding: 20px;
      border-radius: $border-radius;
    }
  }
}

.expand-enter-active, .expand-leave-active {
  transition: opacity .5s;
}
.expand-enter, .expand-leave-to {
  opacity: 0;
}
</style>