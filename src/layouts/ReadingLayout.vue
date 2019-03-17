<template>
  <div class="reading-layout">
    <reading-header/>
    <router-view/>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import ReadingHeader from '@/components/ReadingHeader.vue';

@Component({
  components: {
    ReadingHeader,
  },
})
export default class ReadingLayout extends Vue {}
</script>

<style scoped lang="scss">
</style>