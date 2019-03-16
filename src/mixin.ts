import { Vue, Component } from 'vue-property-decorator';
import MobileDetect from 'mobile-detect';

@Component
export default class Mixin extends Vue {
  isMobile(): boolean {
    const md = new MobileDetect(window.navigator.userAgent);
    return md.isPhoneSized();
  }
}
