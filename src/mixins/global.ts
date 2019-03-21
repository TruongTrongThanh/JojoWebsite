import { Vue, Component } from 'vue-property-decorator';

@Component
export default class Global extends Vue {
  // Media detect
  private readonly lgMedia: MediaQueryList = window.matchMedia('(min-width: 992px)');
  get isMobile(): boolean {
    return !this.lgMedia.matches;
  }
}
