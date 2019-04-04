<template lang="pug">
  #favorite-index
    c-user-header

    el-row().p-margin-top-lg
      el-col(:span="22" :offset="1")
        h2.p-font-color {{ $t('pages.favorite.index.title') }}

    el-row().p-margin-top-lg
      el-col(:span="22" :offset="1")
        el-tabs(type="card")
          el-tab-pane(:label="$t('pages.favorite.index.space-list')")

    el-row().p-margin-top-lg
      el-col(:span="22" :offset="1")
        el-row(:gutter="15" style="margin-left: 10px")
          el-col(:sm="6" v-for="(list, index) of userFavoriteTags" :key="index")
            el-card(shadow="hover" :body-style="{ padding: '0px' }").p-card-size
              c-img(:src="list.thumbnails" height="240px" width="100%")
              div(style="padding: 14px;")
                el-tag() {{ list.tag }}
              div()
                el-button(type="text" style="margin-left: 240px; font-size: 18px") {{ $t('pages.favorite.index.delete-tag') }}

    el-row().p-margin-top-lg
      el-col(:span="22" :offset="1")
        .p-border-line
        el-button(type="primary" icon="el-icon-plus" @click="addFavoriteList = true") {{ $t('pages.favorite.index.add-tag') }}


    el-dialog(:visible.sync="addFavoriteList" :close-on-click-modal="false" :close-on-press-escape="false" width="40%" :before-close="handleClose")
      span().p-dialog-title {{ $t('pages.favorite.index.add-tag')  }}

      el-table(:data="userFavoriteTags" style="width: 100%")

        el-table-column(prop="tag" min-width="130px")
          template(slot-scope="scope")
            span(v-if="scope.row.edit === true")
              el-input(v-model="scope.row.tag" size="small")
            div(v-else slot="reference")
              c-svg-icon(icon-class="folder-add").p-svg-size
              el-tag(size="medium") {{ scope.row.tag }}

        el-table-column(style="margin-left: 50px" align="right" min-width="130px")
          template(slot-scope="scope")
            span(v-if="!scope.row.edit")
              el-button(size="small" type="warning" @click="handleEdit(scope.row)") {{ $t('pages.favorite.index.edit-tag') }}
            span(v-else)
              el-button(type="success" size="small" icon="el-icon-circle-check-outline" @click="confirmEdit(scope.$index, scope.row)") OK
            el-button(type="danger" size="small" style="margin-left: 5px" @click="handleDeleteMessage(scope.$index, scope.row)") {{ $t('pages.favorite.index.delete-tag') }}

      span(slot="footer" class="dialog-footer")
        el-input(v-if="inputVisible" style="position:absolute; left: 25px; width: 200px" @keyup.enter.native="handleInputConfirm" v-model="inputValue" ref="saveTagInput")
        el-button(v-if="inputVisible" style="position:absolute; left: 240px;"  @click="inputVisible = false") {{ $t('pages.favorite.index.cancel-tag') }}
        el-button(v-if="inputVisible" style="position:absolute; left: 380px;" type="info" @click="handleInputConfirm" ) {{ $t('pages.favorite.index.add-btn') }}
        el-button(v-else size="small" style="position:absolute;left:25px;" @click="showInput")  {{ $t('pages.favorite.index.add-tag') }}
        div( style="margin-right: 10px" ) {{ &nbsp }}


      el-dialog(append-to-body width="30%" center :visible.sync="existVisible")
        span(slot:title style="font-size:30px; margin-left: 25px; color: #E6A23C") {{ dialogError }}
        span(slot="footer")
          el-button(@click="existVisible = false") {{ $t('pages.favorite.index.hai-button') }}

      el-dialog(append-to-body :visible.sync="delVisible" width="35%" center)
        span(slot="title")
          c-svg-icon(icon-class="warning")
          | {{ $t('pages.favorite.index.presentation-title') }}

        span() {{ $t('pages.favorite.index.delete-message') }}
        span(slot="footer")
          el-button(@click="delVisible = false") {{ $t('pages.favorite.index.cancel-btn') }}
          el-button(type="primary" @click="handleDeleteTag") {{ $t('pages.favorite.index.delete-btn') }}
</template>

<!-- ============================================================================ -->
<script>
    const userInfoData = require('@/utils/userinfo.json');
    export default {
      async asyncData({app, query}) {
        try {
          let data = userInfoData;
          return {
             userFavoriteTags: data.favorite_space_list,
             tempUserfavoriteTags: JSON.parse(JSON.stringify(data.favorite_space_list)),
          }
        } catch (error) {
          console.log(error)
        }
      },
      data () {
        return {
          addFavoriteList: false,
          favoriteSpaceList: null,
          inputVisible: false,
          existVisible: false,
          delVisible: false,
          tempUserfavoriteTags: [],
          inputValue: '',
          dialogError: '',
          deleteRow: null,
          deleteIndex: null,
        }
      },

      methods: {
        handleEdit(row)  {
          row.edit = true
          let tempData = row.tag
          row.tag = "原因不明"
          row.tag = tempData
        },

        confirmEdit(index, row) {
          let ii = index
          let tempData = row.tag

          if (tempData.length < 1 || tempData.length > 16) {
            this.dialogError = this.$t('pages.favorite.index.input-tag-error')
            this.existVisible = true
            return
          }
          let existsData = this.userFavoriteTags.some((el, index) => {
            return (el.tag === tempData && index != ii)
          })
          if (existsData === true) {
            let rowData = this.tempUserfavoriteTags[ii]
            row = rowData
            row.edit = true
            this.dialogError = this.$t('pages.favorite.index.exist-error-title')
            console.log(this.dialogError)
            this.existVisible = true
          }　else {
            row.edit = false
            row.tag = "原因不明"
            row.tag = tempData
          }
        },

        showInput() {
          this.inputVisible = true;
          this.$nextTick(_ => {
            this.$refs.saveTagInput.$refs.input.focus();
          });
        },

        handleInputConfirm() {
          let inputValue = this.inputValue;
          if (inputValue.length < 1 || inputValue.length > 16) {
            this.dialogError = this.$t('pages.favorite.index.input-tag-error')
            this.existVisible = true
            return
          }

          let existsData = this.userFavoriteTags.some((el, index) => {
            return (el.tag === inputValue)
          })
          if (existsData === true) {
            this.dialogError = this.$t('pages.favorite.index.exist-error-title')
            this.existVisible = true
          } else {
            let pushData = { "tag": inputValue, "space_ids": [], "thumbnails": "/images/default.png"}
            this.userFavoriteTags.push(pushData)
            console.log(pushData);
            this.inputVisible = false;
            this.inputValue = '';
          }
        },

        handleDeleteMessage(index, row) {
          this.delVisible = true;
          this.deleteIndex = index;
          this.deleteRow = row;
        },

        handleClose(done) {

          this.$confirm(this.$t('pages.favorite.index.close-message'))
            .then(_ => {
              this.userFavoriteTags.filter((el, index) => {
                let rowData = this.tempUserfavoriteTags[index]
                el.tag = '原因不明'
                el.tag = rowData.tag
                el.edit = false
                this.inputVisible = false
              })
              done();
            })
            .catch(_ => {});
        },

        handleDeleteTag() {
          this.userFavoriteTags.splice(this.deleteIndex, 1);
          this.delVisible = false;
        },

        handleCancelTag() {
          this.delVisible = false
          this.deleteIndex = null
          this.deleteRow = null
        }
      }
    }
</script>

<!-- ============================================================================ -->

<style lang="stylus">
  $font-color=#787878
  $theme-color=#4ab7bd
  $warning-color=#E6A23C
  #favorite-index
    min-height 80vh
    .p-dialog-title
      font-size 20px
      color #4ab7bd
    .p-svg-size
      width 20px
      height 20px
      color $font-color
      margin-right 10px
      margin-top 2px
    .p-border-line
      border 0.7px solid #dee2e2
      margin-top 5px
      margin-bottom 10px
    .p-margin-top-lg
      margin-top 30px
    .p-font-color
      color $font-color
    .p-border-line
      border 0.7px solid #dee2e2
      margin-top 5px
      margin-bottom 10px
    .p-dialog-title
      font-size 20px
      color #4ab7bd
    .el-dialog__footer
      height 65px
    .p-dialog-presentation
      font-size 30px
      color $warning-color
    .p-dialog-svg
      width 20px
      height 20px
      color $warning-color
</style>
