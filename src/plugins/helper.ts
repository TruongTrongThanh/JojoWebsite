import { Vue as _Vue } from 'vue/types/vue'

export interface Helper {
  setTitle(title: string): void
  handleError(err: Error): void
  strToNumber(str: string, defaultNumber: number): number
}

export function HelperPlugin(Vue: typeof _Vue, options?: any): void {
  Vue.prototype.$helper = {
    setTitle(title: string) {
      document.title = title + ' - ' + process.env.VUE_APP_WEB_NAME
    },
    strToNumber(str: string, defaultNumber: number = 0): number {
      if (isNaN(Number(str))) return defaultNumber
      else return Number(str)
    },
    handleError(err: Error) {
      console.log(err)
      this.$Progress.fail()
      const btn = document.getElementById('modal-open-btn')
      if (btn) {
        btn.click()
      }
    }
  }
}
