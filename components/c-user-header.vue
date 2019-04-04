<template lang="pug">
  div(class="navbar")
    el-dropdown(class="avatar-container right-menu-item hover-effect")
      div(class="avatar-wrapper" style="outline:none;")
        c-img(src="http://i.pravatar.cc/300" round style="width: 40px; height:40px")
        i(class="el-icon-caret-bottom")
      el-dropdown-menu(slot="dropdown" style="width: 230px;")
        router-link(to="/plan/favorite_lists" ).router-link-active

          el-dropdown-item(icon="el-icon-star-off")
            c-svg-icon(icon-class="star-off").svg-star
            | {{ &nbsp }} {{ $t('components.user-header.favorite-lists') }}

        router-link(to="/auth/setting" ).router-link-active
          el-dropdown-item()
            c-svg-icon(icon-class="setting").svg-size
            | {{ &nbsp }} {{ $t('components.user-header.setting') }}

          el-dropdown-item()
            c-svg-icon(icon-class="reset-password").svg-size
            | {{ &nbsp }} {{ $t('components.user-header.reset-password') }}

          el-dropdown-item(divided)
            span(style="display:block;" @click.native="logout")
              c-svg-icon(icon-class="exit").svg-size
              | {{ &nbsp }}  {{ $t('components.user-header.logout') }}

</template>

<!-- ============================================================================ -->
<script>
    export default {
      methods: {
        logout() {

        }
      }
    }
</script>

<!-- ============================================================================ -->

<style lang="stylus">
  .navbar
    height 50px
    overflow hidden
    background-color #4ab7bd
    .right-menu-item
      display inline-block
      padding 0 8px
      height 100%
      font-size 18px
      color #5a5e66
      vertical-align text-bottom
    .avatar-container
      margin-right 30px
      float right
    .el-icon-caret-bottom
      cursor: pointer
      position: absolute
      right: -20px
      top: 25px
      font-size: 12px
  .router-link-active
    text-decoration none
  .svg-star
    height 18px
    width 18px
  .svg-size
    height 20px
    width 20px
</style>
