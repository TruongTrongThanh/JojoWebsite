<template>
  <v-card class="manga-info">
    <v-card-title
      :style="{
        'background-color': `rgba(${themeColor})`
      }"
      class="text-uppercase justify-center"
    >
      Thông tin truyện
    </v-card-title>
    <v-card-text>
      <div
        v-for="info in mangaInfoList" :key="info.label"
      >
        <v-row>
          <v-col cols="6">
            <v-icon class="icon-offset mr-3">{{ info.icon }}</v-icon>
            <span class="subtitle-1">{{ info.label }}</span>
          </v-col>
          <v-col>
            <span class="subtitle-1">
              {{ info.value }}
            </span>
          </v-col>
        </v-row>
        <v-divider/>
      </div>
      <GenreList class="my-2" :value="[
        {color: 'red', name: 'thriller'},
        {color: 'green', name: 'slice of life'},
        {color: 'purple', name: 'fantasy'}
      ]"/>
      <v-divider/>
      <div class="mt-3 subtitle-1">
        {{manga.desc}}
      </div>
    </v-card-text>
    <v-card-actions
      v-if="manga.chapterList.length > 0"
      class="justify-end"
    >
      <v-btn text>
        Đọc chương đầu ({{ manga.chapterList[0].index.toString().padStart(3, '0') }})
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import { Manga, Genre } from '@/models/manga'
import GenreList from '@/components/GenreList.vue'

@Component({
  components: {
    GenreList
  }
})
export default class MangaInfo extends Vue {
  @Prop({type: Object, required: true}) readonly manga!: Manga

  get themeColor() {
    return [Object.values(this.manga.themeColor)].join(',')
  }

  mangaInfoList = [
    {
      label: 'Số chương',
      value: 50,
      icon: 'mdi-bookmark'
    },
    {
      label: 'Đã dịch',
      value: 25,
      icon: 'mdi-bookmark-check'
    },
    {
      label: 'Năm',
      value: '2000 - 2004',
      icon: 'mdi-calendar-month-outline'
    }
  ]
}
</script>

<style lang="scss" scoped>
.icon-offset {
  position: relative;
  bottom: 1px;
}
</style>