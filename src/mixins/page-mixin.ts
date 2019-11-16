import { Component, Vue } from 'vue-property-decorator'

@Component
export default class PageMixin extends Vue {
  created() {
    // @ts-ignore
    if (this.title) {
      // @ts-ignore
      this.$helper.setTitle(this.title)
    }
  }
}
