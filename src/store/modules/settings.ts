import { Module, VuexModule, Mutation } from 'vuex-module-decorators'

@Module
export default class Settings extends VuexModule {
  isDarkMode: boolean = true
  isReaderMode: boolean = false
  hideAppBarWhenScroll: boolean = false

  @Mutation
  setDarkMode(val: boolean) {
    this.isDarkMode = val
  }
  @Mutation
  setReaderMode(val: boolean) {
    this.isReaderMode = val
  }
  @Mutation
  setHideAppBarWhenScroll(val: boolean) {
    this.hideAppBarWhenScroll = val
  }
}
