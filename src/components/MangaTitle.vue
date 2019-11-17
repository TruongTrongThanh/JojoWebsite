<template>
  <div class="manga-title">
    <v-row class="mb-2 peak">
      <v-col
        cols="10"
        class="font-weight-bold d-none d-lg-block text-uppercase display-1 m-title"
      >
        {{ manga.name }}
      </v-col>
    </v-row>
    <v-row justify="space-between" class="mb-4 d-none d-lg-flex">
      <v-col cols="3" class="text-left m-sub-title headline">{{ manga.subName }}</v-col>
      <v-col cols="4" class="text-right align-self-end m-author headline">{{ manga.author }}</v-col>
    </v-row>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import { Manga } from '@/models/manga'

@Component
export default class MangaTitle extends Vue {
  @Prop({type: Object, required: true}) readonly manga!: Manga
}
</script>

<style scoped lang="scss">
.m-title {
  padding: 5px 20px;
  font-family: 'Russo One', sans-serif !important;
  background-image: linear-gradient(to right, rgba(255, 37, 200, 1) , transparent);
}

.m-sub-title {
  padding: 5px 20px;
  font-family: 'Abril Fatface', cursive !important;
  background-image: linear-gradient(to right, rgba(24, 24, 24, 1) , transparent);
}

.m-author {
  padding: 5px 20px;
  font-family: 'Russo One', sans-serif !important;
  background-image: linear-gradient(to left, rgba(24, 24, 24, 1) , transparent);
}
</style>
