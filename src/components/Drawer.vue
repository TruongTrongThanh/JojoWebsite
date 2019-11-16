<template>
  <v-navigation-drawer
    fixed
    clipped
    temporary
    v-model="drawerToggle"
  >

    <!-- Drawer header -->
    <v-list-item class="py-1">
      <v-list-item-avatar class="mx-0">
        <v-img :src="require('@/assets/logo.png')"></v-img>
      </v-list-item-avatar>
      <v-list-item-content>
        <v-list-item-title class="text-center title">
          JoJo Group VN
        </v-list-item-title>
      </v-list-item-content>
    </v-list-item>

    <v-divider></v-divider>

    <v-list dense nav>
      <v-list-item
        v-for="item in navList"
        :key="item.title"
        @click="$router.push({name: item.routeName})"
      >
        <v-list-item-icon>
          <v-icon>{{ item.icon }}</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title class="body-2">{{ item.title }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  
  </v-navigation-drawer>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'

@Component
export default class Drawer extends Vue {
  @Prop({type: Boolean, required: true}) value!: boolean

  navList = [
    {
      icon: 'mdi-home',
      title: 'Trang chủ',
      routeName: '#'
    },
    {
      icon: 'mdi-book-open-page-variant',
      title: 'Đọc manga',
      routeName: 'manga-list'
    },
    {
      icon: 'mdi-filmstrip',
      title: 'Xem anime',
      routeName: '#'
    }
  ]

  get drawerToggle() {
    return this.value
  }
  set drawerToggle(val: boolean) {
    this.$emit('input', val)
  }
}
</script>

<style scoped lang="scss">
</style>
