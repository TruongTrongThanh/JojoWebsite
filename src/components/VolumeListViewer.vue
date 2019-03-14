<template>
  <ul class="volume list-group">
    <li
      v-for="(vol, index) in volList" 
      :key="vol.id"
      :class="index === volList.length - 1 ? '' : 'border-bottom'"
      class="p-0 list-group-item"
    >
      <div class="p-3 vol-info">
        <span>vol {{ vol.id }}</span>
        <span @click="vol.isExpand = !vol.isExpand" class="clickable">+</span>
      </div>
      <chapter-list-viewer class="px-3" v-show="vol.isExpand" :vol-id="vol.id"/>
    </li>
  </ul>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import ChapterListViewer from '@/components/ChapterListViewer.vue';

@Component({
  components: {
    ChapterListViewer,
  },
})
export default class VolumeListViewer extends Vue {
  volList: object[] = [
    {
      id: 1,
      isExpand: false,
    },
    {
      id: 2,
      isExpand: false,
    },
    {
      id: 3,
      isExpand: false,
    },
    {
      id: 4,
      isExpand: false,
    },
  ]
}
</script>

<style scoped lang="scss">
  .list-group-item {
    background-color: rgba(26, 26, 26, .6);
  }

  .vol-info {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  
</style>