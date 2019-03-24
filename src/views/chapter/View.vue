<template>
  <div class="chapter-view">
    <ul v-if="this.$route.query.mode === 'multi-page'" class="paper-list">
      <li class="paper-item">
        test test
      </li>
    </ul>
    <one-page v-else/>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import OnePage from '@/components/OnePage.vue';

@Component({
  components: {
    OnePage,
  },
})
export default class ChapterView extends Vue {}
</script>

<style scoped lang="scss">
</style>