<template lang="pug">
  img.c-img(v-lazy="src" :style="style")
</template>

<!-- ============================================================================ -->

<style lang="stylus">
  .c-img
    transition opacity .4s
    opacity    0

    &[lazy=loaded]
      opacity 1
</style>

<!-- ============================================================================ -->

<script>
  export default {
    props: {
      width:  String,
      height: String,
      src:    String,
      round:  Boolean,
    },

    computed: {
      style () {
        let data = {};

        if (this.width)  data.width        = this.width;
        if (this.height) data.height       = this.height;
        if (this.round)  data.borderRadius = '50%';

        return data
      },
    },

    methods: {
      show (e) {
        e.el.parentNode.classList.add('loaded')
      },
    },
  }
</script>
