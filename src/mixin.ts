import { Vue, Component } from 'vue-property-decorator';

@Component
export default class Mixin extends Vue {
  private readonly media: MediaQueryList = window.matchMedia('(min-width: 992px)');

  get isMobile(): boolean {
    return !this.media.matches;
  }
}
