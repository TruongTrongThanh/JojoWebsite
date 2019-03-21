<template>
  <div class="chapter-list-viewer no-gutters align-items-center row">
    <img class="col" :src="require('@/assets/dib_vol_cover.png')">
    <ul class="list-group col">
      <li 
        v-for="i in 10" 
        :key="i" 
        class="list-group-item">
        Vol {{ volId }} - chapter {{ i }}
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { Vue, Prop, Component } from 'vue-property-decorator';

@Component
export default class ChapterListViewer extends Vue {
  @Prop(Number) volId!: number;
}
</script>

<style scoped lang="scss">
  .list-group-item {
    background-color: transparent;
    border: none;
  }
</style>