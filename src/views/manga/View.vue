<template>
  <div class="manga-view container">
    <div class="list-bar">
      <manga-bar
        v-for="manga in mangaList" 
        :key="manga.id"  
        :manga="manga"
      />
    </div>
    <div class="araki-quotes">
      Araki quotes...
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import MangaTile from '@/components/MangaTile.vue';
import MangaBar from '@/components/MangaBar.vue';
import { Manga } from '@/models/manga.ts';

@Component({
  components: {
    MangaTile,
    MangaBar,
  },
})
export default class MangaView extends Vue {
  private mangaList: Manga[] = [
    {
      id: 'phantom-blood',
      name: 'Phantom Blood',
      cardImgSrc: require('@/assets/pb_card.png'),
      backImgSrc: require('@/assets/dib_back.png'),
      subName: 'Part 1',
      desc: 'The story follows Jonathan Joestar as he matures with and eventually combats his adoptive brother, the cunning and merciless Dio Brando.',
    },
    {
      id: 'diamond-is-unbreakable',
      name: 'Diamond is Unbreakable',
      cardImgSrc: require('@/assets/dib_card.png'),
      backImgSrc: require('@/assets/dib_back.png'),
      subName: 'Part 4',
      desc: 'In 1999, the Arrow, manifesting latent Stand abilities, travels throughout Morioh, Japan; as high schooler Josuke Higashikata (illegitimate son of Joseph) and his friends seek out the culprits of a series of homicides. ',
    },
  ];
}
</script>

<style scoped lang="scss">
  .manga-view {
    display: grid;
    grid-template-columns: 65% 35%;
    grid-gap: 30px;
    $bg-color: rgba(0, 0, 0, 0.53);

    .araki-quotes {
      background-color: $bg-color;
      height: 500px;
    }

    .list-tile {
      display: grid;
      grid-template-columns: 1fr 1fr 1fr;
      grid-gap: 10px;
      //background-color: $bg-color;
      padding: 20px;
    }

    .list-bar {
      .manga-bar {
        margin-bottom: 20px;
      }
    }
  }
</style>
