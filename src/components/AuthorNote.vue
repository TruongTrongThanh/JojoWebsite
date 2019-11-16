<template>
  <v-card
    width="300"
    class="py-4"
  >
    <div class="text-center">
      <img
        class="note-image"
        src="https://vignette.wikia.nocookie.net/jjba/images/8/88/Araki3.png/revision/latest/scale-to-width-down/180?cb=20140611232702"
      >
    </div>

    <v-divider class="mt-6"/>

    <v-card-text class="text--primary">
      <v-icon>mdi-format-quote-open</v-icon>
      <div class="px-3">
        {{note}}
      </div>
      <div class="text-right"><v-icon>mdi-format-quote-close</v-icon></div>
    </v-card-text>

    <v-card-title class="py-0 justify-end">Araki Hirohiko</v-card-title>
  </v-card>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'

@Component
export default class AuthorNote extends Vue {
  note: string = `I'm often asked by my friends, "If your house was on fire, what would you take?". Let me see... (time passes). Nothing! I wouldn't take a thing. Not my treasures, luxury goods, my Koseki autograph or even regrets. None of them. That's pretty sad. Well, I thought about it and searched for something desperately... There is one thing. What is it? You'll have to wait until volume 4 to find out. `
}
</script>

<style scoped lang="scss">
.note-image {
  border-radius: 50% !important;
}
</style>
