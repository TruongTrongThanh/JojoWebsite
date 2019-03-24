<template>
  <div
    ref="imageLoading"
    :style="{
      'width': width + 'px',
      'height': height + 'px',
      'animation-duration': duration,
      'animation-name': `placeHolderShimmer-${name}`,
      'background-size': backgroundSize,

    }"
    class="image-loading gradient"
  />
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';

@Component
export default class ImageLoading extends Vue {
  @Prop(String) readonly name!: string;
  @Prop(Number) readonly width!: number;
  @Prop(Number) readonly height!: number;

  private readonly ratio: number = 1 / 400;

  get animationWidth(): number {
    return this.width + 1300;
  }

  get backgroundSize(): string {
    return this.animationWidth + 'px ' + this.height + 'px';
  }

  get duration(): string {
    return (this.animationWidth * this.ratio) + 's';
  }

  mounted() {
    const keyframes = `
      @keyframes placeHolderShimmer-${this.name} {
      0% {
        background-position: -${this.animationWidth}px 0;
      }
      100% {
        background-position: ${this.animationWidth}px 0;
      }
    }`;
    const style = document.createElement('style');
    style.innerHTML = keyframes;
    document.body.appendChild(style);
  }
}
</script>

<style scoped lang="scss">
  .gradient {
    animation-fill-mode: forwards;
    animation-iteration-count: infinite;
    animation-timing-function: linear;
    background: white;
    background: linear-gradient(to right, #131313 8%, #353535 38%, #131313 54%);
    background-repeat: none;
    position: relative; 
  }
</style>