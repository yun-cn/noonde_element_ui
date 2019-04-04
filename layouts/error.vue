<template lang="pug">
  h1(v-if="error.statusCode === 404") Not Found Page
  h1(v-else) Page Error
</template>

<!-- ============================================================================ -->
<script>
    export default {
      props: ['error'],
      layout: 'plant'
    }
</script>

<!-- ============================================================================ -->

<style lang="stylus">

</style>
