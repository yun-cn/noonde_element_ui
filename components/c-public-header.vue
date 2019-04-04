<template lang="pug">
  div(id="content")
    el-row(class="header")
      el-menu(heme="dark" default-active="1" class="el-menu-demo" mode="horizontal")
        router-link(class="el-menu-item title" to="") Noonde
        router-link(class="el-menu-item link" to="/debug") Debug
        router-link(class="el-menu-item link"  target="_blank" tag="a" to="/about.html") {{$t('components.public-header.about')}}
        router-link(class="el-menu-item link" to="/auth/login") {{$t('components.public-header.login')}}
        router-link(class="el-menu-item link" to="/auth/sign") {{$t('components.public-header.sign-up')}}
      div(class="line")
</template>
<script>

  export default {
    components: {},
  }
</script>
<style>
</style>
