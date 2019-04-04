<template lang="pug">
  .c-bars.u-col-left-middle
    .c-bar
    .c-bar.u-my4
    .c-bar
</template>

<style lang="stylus">
  .c-bars
    .c-bar
      border-radius   p(2, 2)
      width           p(400, 200)
      height          p(20, 20)
      background      linear-gradient(90deg, #eee, #ddd)
      background-size 400%
      animation       gradient 2s ease infinite

  @keyframes gradient
    0% {
      background-position 100%
    }
    50% {
      background-position 0%
    }
    100% {
      background-position 100%
    }
</style>
