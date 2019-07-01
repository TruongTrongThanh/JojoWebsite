<template>
  <div class="spinner-border text-light" role="status">
    <span class="sr-only">Loading...</span>
</div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'

@Component
export default class Spinner extends Vue {}
</script>

<style scoped lang="scss">
</style>