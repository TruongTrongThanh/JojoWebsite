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

    <v-list nav>
      <v-subheader class="text-uppercase">Di chuyển</v-subheader>
      <v-list-item
        dense
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

    <v-list nav flat>
      <v-subheader class="text-uppercase">Cài đặt</v-subheader>
      <v-list-item dense>
        <v-list-item-icon>
          <v-icon>mdi-brightness-4</v-icon>
        </v-list-item-icon>
        <v-list-item-content class="justify-between">
          <v-list-item-title class="body-2">Nền tối</v-list-item-title>
        </v-list-item-content>
        <v-list-item-action class="ma-0">
          <v-switch class="mt-0" hide-details dense v-model="darkModeModel"></v-switch>
        </v-list-item-action>
      </v-list-item>
    </v-list>
  
  </v-navigation-drawer>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import { State } from 'vuex-class'

@Component
export default class Drawer extends Vue {
  @Prop({type: Boolean, required: true}) value!: boolean
  @State(state => state.Settings.isDarkMode) isDarkMode!: boolean

  get darkModeModel(): boolean {
    return this.isDarkMode
  }
  set darkModeModel(val) {
    this.$store.commit('setDarkMode', val)
  }

  get drawerToggle() {
    return this.value
  }
  set drawerToggle(val: boolean) {
    this.$emit('input', val)
  }

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
}
</script>

<style scoped lang="scss">
</style>
