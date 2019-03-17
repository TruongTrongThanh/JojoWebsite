<template>
  <div class="chapter-view">
    Chapter {{ $route.params.chapterID }}
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';

@Component
export default class ChapterView extends Vue {}
</script>

<style scoped lang="scss">
</style>