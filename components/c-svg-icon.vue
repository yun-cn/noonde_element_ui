<template lang="pug">
  svg(:class="svgClass" aria-hidden="true")
    use(:xlink:href="iconName")
</template>

<!-- ============================================================================ -->
<script>
  export default {
    name: 'SvgIcon',
    props: {
      iconClass: {
        type: String,
        require: true,
      },
      className: {
        type: String,
        default: ''
      }
    },
    computed: {
      iconName() {
        return `#icon-${this.iconClass}`
      },
      svgClass() {
        if (this.className) {
          return 'svg-icon' + this.className
        } else {
          return 'svg-icon'
        }
      }
    }
  }
</script>

<!-- ============================================================================ -->

<style lang="stylus">
  .svg-icon
    width 1em
    height 1em
    vertical-align -0.15em
    fill currentColor
    overflow hidden
</style>
