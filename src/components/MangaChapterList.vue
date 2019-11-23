<template>
  <v-card class="manga-chapter-list">
    <v-card-title
      :style="{
      'background-color': `rgba(${themeColor})`
      }"
      class="title-bg text-uppercase justify-center"
    >
      Danh sách chương
    </v-card-title>

    <v-card-text v-if="manga.chapterList.length > 0" class="pa-0">
      <v-list-item-group>
        <v-list-item
          three-line
          v-for="chapter in manga.chapterList"
          :key="chapter.id"
        >
          <v-list-item-avatar tile>
            <v-img :src="chapter.cardImgSrc || defaultChapterIcon"></v-img>
          </v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-title class="title">{{ getChapterIndex(chapter) }}</v-list-item-title>
            <v-list-item-subtitle>{{ chapter.name }}</v-list-item-subtitle>
          </v-list-item-content>

          <v-list-item-content class="text-right">
            <v-list-item-title>{{ getDateString(chapter) }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list-item-group>
    </v-card-text>

    <v-card-text v-else>
      <v-list-item-content>
        <v-alert class="mb-0" type="error">Không có chương nào :(</v-alert>
      </v-list-item-content>
    </v-card-text>
  </v-card>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import { Manga, Chapter } from '@/models/manga'

@Component
export default class MangaChapterList extends Vue {
  @Prop({ type: Object, required: true }) readonly manga!: Manga

  get defaultChapterIcon() {
    return require('@/assets/no-image-icon.png')
  }
  get themeColor() {
    return [Object.values(this.manga.themeColor)].join(',')
  }

  getDateString(chapter: Chapter) {
    return new Date(chapter.createdAt).toLocaleString()
  }
  getChapterIndex(chapter: Chapter) {
    return 'Chương ' + chapter.index.toString().padStart(3, '0')
  }
}
</script>

<style scoped lang="scss">
</style>
