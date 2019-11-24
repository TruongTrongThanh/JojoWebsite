import { Component, Vue } from 'vue-property-decorator'

@Component({
  beforeRouteLeave(to, from, next) {
    this.$store.commit('setHideAppBarWhenScroll', false)
    this.$store.commit('setReaderMode', false)
    next()
}
})
export default class PageMixin extends Vue {
  created() {
    // @ts-ignore
    if (this.title) {
      // @ts-ignore
      this.$helper.setTitle(this.title)
    }
     // @ts-ignore
    if (this.hideAppBarWhenScroll) {
      this.$store.commit('setHideAppBarWhenScroll', true)
    }
    // @ts-ignore
    if (this.isReaderMode) {
      this.$store.commit('setReaderMode', true)
    }
  }
}
