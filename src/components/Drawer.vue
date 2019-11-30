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

      <v-list-item
        v-for="settingItem in settingList"
        :key="settingItem.title"
        dense
      >
        <v-list-item-icon>
          <v-icon>{{ settingItem.icon }}</v-icon>
        </v-list-item-icon>
        <v-list-item-content class="justify-between">
          <v-list-item-title class="body-2">
            <v-tooltip
              v-if="settingItem.tooltipText"
              bottom
            >
              <template v-slot:activator="{ on }">
                <span v-on="on">{{ settingItem.title }}</span>
              </template>
              <span>{{ settingItem.tooltipText }}</span>
            </v-tooltip>
            <span v-else>{{ settingItem.title }}</span>
          </v-list-item-title>
        </v-list-item-content>
        <v-list-item-action class="ma-0">
          <v-switch class="mt-0"
            hide-details
            dense
            v-model="settingItem.model"
          />
        </v-list-item-action>
      </v-list-item>
    </v-list>
  
  </v-navigation-drawer>
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch } from 'vue-property-decorator'
import { State } from 'vuex-class'

@Component
export default class Drawer extends Vue {
  @Prop({type: Boolean, required: true}) readonly value!: boolean

  @State(state => state.Settings.isDarkMode)
  readonly isDarkMode!: boolean
  @State(state => state.Settings.autoNext)
  readonly autoNext!: boolean
  @State(state => state.Settings.isOnePageMode)
  readonly isOnePageMode!: boolean

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

  settingList = [
    { // index: 0
      _vue: this,
      icon: 'mdi-brightness-4',
      title: 'Nền tối',

      _model: false,
      get model() {
        return this._model
      },
      set model(val: boolean) {
        this._model = val
        this._vue.$store.commit('setDarkMode', val)
      }
    },
    { // index: 1
      _vue: this,
      icon: 'mdi-arrow-decision-auto',
      title: 'Chuyển chương',

      _model: false,
      get model() {
        return this._model
      },
      set model(val: boolean) {
        this._model = val
        this._vue.$store.commit('setAutoNext', val)
      },

      tooltipText: 'Tự động chuyển sang chương kế tiếp.'
    },
    { // index: 2
      _vue: this,
      icon: 'mdi-file-outline',
      title: 'Một trang',

      _model: false,
      get model() {
        return this._model
      },
      set model(val: boolean) {
        this._model = val
        this._vue.$store.commit('setOnePageMode', val)
      },

      tooltipText: 'Chuyển sang chế độ đọc một trang.'
    }
  ]

  created() {
    this.setInitModelForSettingList()
  }

  setInitModelForSettingList() {
    Vue.set(this.settingList[0], 'model', this.isDarkMode)
    Vue.set(this.settingList[1], 'model', this.autoNext)
    Vue.set(this.settingList[2], 'model', this.isOnePageMode)
  }

  @Watch('isOnePageMode')
  onChangedOnePageMode(newVal: boolean, oldVal: boolean) {
    Vue.set(this.settingList[2], 'model', newVal)
  }
}
</script>

<style scoped lang="scss">
</style>
