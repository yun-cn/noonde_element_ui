<template lang="pug">
  #favorite-show
    c-user-header

    el-row().p-margin-top-lg
      el-col(:span="18" :offset="3")
        el-row(:gutter="15" style="margin-left: 10px")
          router-link(to="/plan/favorite").p-router-item 戻る

    el-row().p-margin-top-lg
      el-col(:span="18" :offset="3")
        el-row(:gutter="15")
          h2.p-font-color {{ favoriteTags }}

    el-row().p-margin-top-xs
      el-col(:span="18" :offset="3")
        el-row(:gutter="15")
          span.p-font-color {{ spaceList.length }} {{ $t('pages.favorite.show.tag-space-font') }}


    el-row().p-margin-top-lg
      el-col(:span="18" :offset="3")
        el-row()
          el-col(:span="24" v-for="(space, index) in spaceList" :key="index")
            .p-border-line
              el-col(:xs="24" :sm="6" :md="5")
                c-img(:src="space.thumbnails[0].url").p-margin-top-xs.p-image-size
              el-col(:xs="24" :sm="18" :md="17")
                el-row()
                  el-col(:xs="24" style="margin-top: 13px")
                    span.p-margin-top-xs.p-font-color.p-font-space-title {{ space.name }}
                el-row
                  el-col(:xs="3" :sm="3")
                    c-svg-icon(icon-class="peoples" ).p-icon-size
                    span.u-ml8.p-font-color.p-font-space-info {{ fromIcon }}  {{ space.capacity }} {{ peopleFont }}
                  el-col(:xs="7" :sm="7")
                    c-svg-icon.u-ml10(icon-class="map" style="margin-le").p-icon-size
                    span.u-ml8.p-font-color.p-font-space-info {{ space.prefecture }} {{ space.ward }}
                  el-col(:xs="10" :sm="10")
                    el-rate(v-model="space.total_rate" disabled text-color="#ff9900" style="width: 100%" show-score)
                el-row
                  el-col(:span="21")
                    c-img.u-mr8(:src="displayValueForPlatform(space.platform)").p-platform-png-size
                  el-col(:span="3")
                    el-button(size="mini" type="primary") 削除
</template>

<!-- ============================================================================ -->
<script>
    const tagSpaceData = require('@/utils/tagspace.json');
    export default {
      async asyncData({ app, query }) {
        try {
          let data = tagSpaceData
          return {
            favoriteTags: data.tag,
            spaceList: data.spaces,
          }
        } catch (error) {
          console.log(error)
        }
      },
      data () {
        return {
          fromIcon: '〜',
          peopleFont: this.$t('pages.favorite.show.people-font'),
          leftBracket: '（',
          rightBracket: '）',
          reviewCountFont: this.$t('pages.space.show.review-count-font'),
        }
      },

      methods: {
        displayValueForPlatform(type) {
          switch (type) {
            case 'spacemarket':
              return '/platforms/spacemarket.png';
            case 'spacee':
              return '/platforms/spacee.png';
            case 'instabase':
              return '/platforms/instabase.png';
            case 'supenavi':
              return 'supenavi.png';
          }
        },
      }
    }
</script>

<!-- ============================================================================ -->


<style lang="stylus">
  $font-color=#787878
  $theme-color=#4ab7bd
  #favorite-show
    .p-margin-top-lg
      margin-top 30px
    .p-margin-top-xs
      margin-top 15px
    .p-margin-top-sm
      margin-top 10px
    .p-router-item
      display inline-block
      padding 0 8px
      height 100%
      font-size 18px
      color #5a5e66
      vertical-align text-bottom
    .p-font-color
      color $font-color
    .p-div-box
      min-width t(300)
      border 1px solid #ddd
      background-color #fff
    .p-border-line
      border 0.7px solid #dee2e2
      margin-top 5px
      margin-bottom 10px
    .p-icon-size
      @media screen and (max-width: 768px)
        width 10px
        height 10px
      @media (min-width: 768px) and (max-width: 992px)
        width 10px
        height 10px
        color $font-color
      @media (min-width: 993px)
        width 10px
        height 10px
        color $font-color
    .p-image-size
      width 130px
      height 130px
      display block
      margin-left auto
      margin-right auto
      @media (max-width: 768px)
        width 100%
        height 300px
      @media (min-width: 768px) and (max-width: 992px)
        width 130px
        height 130px
      @media (min-width: 992px) and (max-width: 1200px)
        height 130px
        height 130px
    .p-font-space-title
      @media (max-width: 768px)
        font-size 14px
      @media (min-width: 768px) and (max-width: 992px)
        font-size 13px
      @media (min-width: 993px)
        font-size 13px
    .p-font-space-info
      @media (max-width: 768px)
        font-size 10px
      @media (min-width: 768px) and (max-width: 992px)
        font-size 9px
      @media (min-width: 993px)
        font-size 10px
    .p-platform-png-size
      @media screen and (max-width: 768px)
        width 120px
        height 25px
      @media (min-width: 768px) and (max-width: 992px)
        width 120px
        height 25px
      @media (min-width: 993px)
        width 120px
        height 25px
</style>
