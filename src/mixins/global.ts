import { Vue, Component } from 'vue-property-decorator';

@Component
export default class Global extends Vue {
  private readonly lgMedia: MediaQueryList = window.matchMedia('(min-width: 992px)');
  // Media detect
  get isMobile(): boolean {
    return !this.lgMedia.matches;
  }

  strToNumber(str: string, defaultNumber: number = 0): number {
    if (isNaN(Number(str))) return defaultNumber;
    else return Number(str);
  }
}

declare module 'vue/types/vue' {
  interface Vue {
    strToNumber(str: string, defaultNumber?: number): number;
  }
}
