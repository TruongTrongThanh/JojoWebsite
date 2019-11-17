<template>
  <v-chip-group>
    <v-chip
      v-for="genre in value"
      :key="genre.name"
      :color="genre.color"
      class="mr-1 unclickable"
      @click="() => {}"
    >
      {{ genre.name }}
    </v-chip>
  </v-chip-group>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import { Genre } from '@/models/manga'

@Component
export default class GenreList extends Vue {
  @Prop({type: Array, required: true}) readonly value!: Genre[]
}
</script>

<style scoped lang="scss">
.unclickable {
  pointer-events: none;
}
</style>
