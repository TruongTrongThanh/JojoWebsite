<template>
  <div class="reading-layout">
    <reading-header/>
    <router-view :class="{ offset: this.$route.query.mode === 'multi-page' }"/>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import ReadingHeader from '@/components/ReadingHeader.vue'

@Component({
  components: {
    ReadingHeader
  }
})
export default class ReadingLayout extends Vue {}
</script>

<style lang="scss">
</style>