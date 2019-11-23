import { Module, VuexModule, Mutation } from 'vuex-module-decorators'

@Module
export default class Settings extends VuexModule {
  isDarkMode: boolean = true

  @Mutation
  setDarkMode(val: boolean) {
    this.isDarkMode = val
  }
}
