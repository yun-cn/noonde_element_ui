<template lang="pug">
  #space-show
    c-public-header

    el-row()
      el-col(:span="24")
        no-ssr
          c-img(:src="thumbnails[0]" @click.native="index = 0" :style="{ cursor: 'pointer'}").p-center-img
          gallery(:images="thumbnails" :index="index" @close="index = null")

    el-row()
      el-col(:span="24")
        el-button.p-show-image-btn(type="primary" plain @click.native="index = 0" ) {{ $t('pages.space.show.show-image-btn') }}

    el-row()
      el-col(:span="18" :offset="3" )
        el-tabs(@tab-click="handleClick")
          el-tab-pane(:label="$t('pages.space.show.about-space')" name="about-space"  style="color: #787878")
          el-tab-pane(:label="$t('pages.space.show.all-online-price')" name="all-online-price")
          el-tab-pane(:label="$t('pages.space.show.access-info')" name="access-info")
          el-tab-pane(:label="$t('pages.space.show.amenity-list')" name="amenity-list")
          el-tab-pane(:label="$t('pages.space.show.review-list')" name="review-list")
          el-tab-pane(name="write-review")
            span(slot="label")
              c-svg-icon(icon-class="write-review" style="width: 18px; height: 18px;")
              | {{ $t('pages.space.show.white-review') }}
          el-tab-pane(name="add-favorite-list")
            span(slot="label")
              c-svg-icon(icon-class="star" style="width: 18px; height: 18px;")
              | {{ $t('pages.space.show.space-save') }}

      #about-space
      el-row()
        el-col(:span="18" :offset="3")
          el-tag(size="medium").p-tag-color {{ $t('pages.space.show.title-abs.space') }}

      el-row().p-margin-size
        el-col(:span="18" :offset="3" class="p-title")
          h3 {{ space.name }}

      el-row().p-margin-size
        el-col(:span="8" :offset="3" class="p-title")
          c-svg-icon(icon-class="peoples" ).p-icon-size
          span.u-ml8.p-font-color {{ fromIcon }}  {{ space.capacity }} {{ peopleFont }}
          c-svg-icon.u-ml10(icon-class="map" style="margin-le").p-icon-size
          span.u-ml8.p-font-color {{ space.prefecture }} {{ space.ward }}
        el-col(:span="7" :offset="2")
          el-rate(v-model="space.total_rate" disabled text-color="#ff9900" style="width: 60%" show-score)
          span.u-ml8.p-font-color {{ leftBracket }} {{ reviews.length }} {{ reviewCountFont }} {{ rightBracket }}

      el-row().p-margin-size
        el-col(:span="18" :offset="3")
          no-ssr
            .p-border-line
            span(v-html="nl2br(space.description)").p-description-css

      #all-online-price
      el-row(id="#access-other-web").p-margin-size
        el-col(:span="18" :offset="3")
          .p-border-line
          el-tag(size="medium").p-margin-size.p-tag-color {{ $t('pages.space.show.title-abs.reservation-site') }}
          el-table(style="width: 100%" :data="space.reservation_list")
            el-table-column(prop="platform", :label="$t('pages.space.show.platform')")
              template(slot-scope="scope")
                c-img(:src="displayValueForPlatform(space.platform)" height="35px" width="50%")
            el-table-column(prop="price" :label="$t('pages.space.show.price')")
            el-table-column(:label="$t('pages.space.show.details')")
              template(slot-scope="scope")
                el-button(size="mini" click="handleJumpSide(scope.$index, scope.row)") {{ $t('pages.space.show.details') }}


      #access-info
      el-row().p-margin-size
        el-col(:span="18" :offset="3")
          el-tag(size="medium").p-margin-size.p-tag-color {{ $t('pages.space.show.title-abs.access') }}
          c-room-map(:center="showMapCenter(space)" :room="space").p-margin-size

      #amenity-list
      el-row().p-margin-size
        el-col(:span="18" :offset="3")

          .p-border-line
          el-tag(size="medium").p-margin-size.p-tag-color {{ $t('pages.space.show.title-abs.amenity') }}
          el-row(:gutter="30" style="margin-left: 10px")
            el-col(:xl="6" :lg="8" :md="8" :sm="12" v-for="(amenity, index) in showAmenities" :key="index")
              c-svg-icon(:icon-class="addString(amenity.value)" v-bind:class="{'p-not-show-icon': amenity.show }").p-amenity-css
              span(v-bind:class="{'p-not-show-icon': amenity.show }" style="color: #787878").u-ml8 {{ amenity.label }}

      #review-list
      el-row().p-margin-size
        el-col(:span="18" :offset="3")
          .p-border-line
          el-tag(size="medium").p-margin-size.p-tag-color {{ $t('pages.space.show.title-abs.reviews') }}
          h2.p-user-review-title {{ reviews.length }}  {{ $t('pages.space.show.user-review-count') }}

      el-row().p-review-margin
        el-col(:span="2" :offset="3")
          h2.p-review-point {{ space.total_rate }} {{ pointFont }}
        el-col(:span="3")
          el-progress(type="circle" :percentage="4.3*2*10" color="#4ab7bd" :width="circleSize" status="text").p-review-circle {{ 4.3 }}

        el-col(:span="3")
          el-progress(type="circle" :percentage="4.3*2*10" color="#4ab7bd" :width="circleSize" status="text").p-review-circle {{ 4.3 }}

        el-col(:span="3")
          el-progress(type="circle" :percentage="4.3*2*10" color="#4ab7bd" :width="circleSize" status="text").p-review-circle {{ 4.3 }}

        el-col(:span="3")
          el-progress(type="circle" :percentage="4.3*2*10" color="#4ab7bd" :width="circleSize" status="text").p-review-circle {{ 4.3 }}

        el-col(:span="3")
          el-progress(type="circle" :percentage="4.3*2*10" color="#4ab7bd" :width="circleSize" status="text").p-review-circle {{ 4.3 }}

        el-col(:span="3")
          el-progress(type="circle" :percentage="4.3*2*10" color="#4ab7bd" :width="circleSize" status="text").p-review-circle {{ 4.3 }}

      el-row().p-margin-size
        el-col(:span="2" :offset="3")
          h2.p-review-point {{ "&nbsp" }}
        el-col(:span="3")
          span.p-review-font-1 {{ $t('pages.space.show.review-locale') }}

        el-col(:span="3")
          span.p-review-font-2 {{ $t('pages.space.show.review-server') }}

        el-col(:span="3")
          span.p-review-font-3 {{ $t('pages.space.show.review-cleaning') }}

        el-col(:span="3")
          span.p-review-font-4 {{ $t('pages.space.show.review-comfort') }}

        el-col(:span="3")
          span.p-review-font-5 {{ $t('pages.space.show.review-facility') }}

        el-col(:span="3")
          span.p-review-font-6 {{ $t('pages.space.show.review-cost-per') }}

      el-row().p-margin-review-btn
        el-col(:offset="3" :push="15")
          el-button(size="mini" type="warning" @click.native="reviewDialogVisible = true")  {{ $t('pages.space.show.review-white-btn') }}

      el-row().p-margin-size
        el-col(:span="18" :offset="3")
          .p-border-line

      el-row().p-margin-size
        el-col(:span="18" :offset="3" v-for="(review, index) in reviews" :key="index").p-review-box
          el-col(:span="3").u-row-left-middle
            c-img.u-mr8(:src="review.user_avatar_url" height="37%" width="37%" round style="padding: 1px")
            span.u-fs16.p-review-user-name {{ review.user_name }}
          el-col(:span="16" :push="1")
            span.p-description-css {{ review.description }}
            el-rate(v-model="review.review_total_rate" disabled show-score text-color="#ff9900").p-review-rate
            span(v-if="review.response.length")
              el-col(:span="24" v-for="(resp, index) in review.response" :key="index")
                c-img.u-fs16.u-mr8(:src="resp.user_avatar_url"  height="20.8px" width="20.8px" round )
                span().p-review-resp-user-name {{ resp.user_name }} {{ colon }} {{ &nbsp }}
                span(v-if="resp.to_reply_user_name").p-reply-message {{ $t('pages.space.show.reply-font') }} {{ resp.to_reply_user_name }} {{ colon }}
                span().p-comment-font  {{ &nbsp }} {{ resp.comments }}
                el-button(type="text" style="margin-left: 10px")  {{ $t('pages.space.show.reply-font') }}
            el-input(type="textarea" :autosize="{ minRows: 3, maxRows: 8}" @focus="showResponseBtn(index)" @blur="closeResponseBtn").p-margin-lg
            el-button(size="small" type="primary" v-show="showRespBtn === index").p-margin-lg {{ $t('pages.space.show.send-response-btn') }}

          el-col(:span="4" :push="3")
            c-svg-icon(icon-class="like" @click.native="addLike()" :style="{ cursor: 'pointer'}").p-add-like-icon
            span(v-if="review.add_like > 0").p-add-like-count {{ pushSymbol }} {{ review.add_like }}


      el-dialog(:visible.sync="reviewDialogVisible" width="80%" :close-on-click-modal="false" :close-on-press-escape="false")
        span(slot="title").p-dialog-title {{ space.name }}
        el-form(:model="writeReviewForm"  ref="writeReviewForm" :rules="writeReviewRules" style="margin-left: 40px" size="mini" label-position="right"  label-width="150px")

          el-form-item(:label="$t('pages.space.show.review-total')" prop="review_total_rate")
            el-rate(v-model="writeReviewForm.review_total_rate" :colors="['#99A9BF', '#F7BA2A', '#FF9900']" :texts="[oneStarReview, twoStarReview, threeStarReview, fourStarReview, fiveStarReview]" allow-half show-text).p-review-star

          el-form-item(:label="$t('pages.space.show.review-locale')" prop="review_locale_rate")
            el-rate(v-model="writeReviewForm.review_locale_rate" :colors="['#99A9BF', '#F7BA2A', '#FF9900']" :texts="[oneStarReview, twoStarReview, threeStarReview, fourStarReview, fiveStarReview]" allow-half show-text).p-review-star

          el-form-item(:label="$t('pages.space.show.review-server')" prop="review_server_rate")
            el-rate(v-model="writeReviewForm.review_server_rate" :colors="['#99A9BF', '#F7BA2A', '#FF9900']" :texts="[oneStarReview, twoStarReview, threeStarReview, fourStarReview, fiveStarReview]" allow-half show-text).p-review-star

          el-form-item(:label="$t('pages.space.show.review-cleaning')" prop="review_cleaning_rate")
            el-rate(v-model="writeReviewForm.review_cleaning_rate" :colors="['#99A9BF', '#F7BA2A', '#FF9900']" :texts="[oneStarReview, twoStarReview, threeStarReview, fourStarReview, fiveStarReview]" allow-half show-text).p-review-star

          el-form-item(:label="$t('pages.space.show.review-comfort')" prop="review_comfort_rate")
            el-rate(v-model="writeReviewForm.review_comfort_rate" :colors="['#99A9BF', '#F7BA2A', '#FF9900']" :texts="[oneStarReview, twoStarReview, threeStarReview, fourStarReview, fiveStarReview]" allow-half show-text).p-review-star

          el-form-item(:label="$t('pages.space.show.review-facility')" prop="review_facility_rate")
            el-rate(v-model="writeReviewForm.review_facility_rate" :colors="['#99A9BF', '#F7BA2A', '#FF9900']" :texts="[oneStarReview, twoStarReview, threeStarReview, fourStarReview, fiveStarReview]" allow-half show-text).p-review-star

          el-form-item(:label="$t('pages.space.show.review-cost-per')" prop="review_cost_rate")
            el-rate(v-model="writeReviewForm.review_cost_rate" :colors="['#99A9BF', '#F7BA2A', '#FF9900']" :texts="[oneStarReview, twoStarReview, threeStarReview, fourStarReview, fiveStarReview]" allow-half show-text).p-review-star

          el-form-item(:label="$t('pages.space.show.review-description-text')" prop="description")
            el-input(type="textarea"  :autosize="{ minRows: 5, maxRows: 6}" style="width: 70%")

        span(slot="footer")
          el-button(@click="handleAddReview('writeReviewForm')" type="warning") {{ $t('pages.space.show.review-update-review-btn') }}

      el-dialog(:visible.sync="addFavoriteList" :close-on-click-modal="false" :close-on-press-escape="false" width="40%")
        span(slot="title").p-dialog-title {{ $t('pages.space.show.favorite-lists.add-space-tags') }}

        el-table(:data = "userfavoriteTags" style="width: 100%")

          el-table-column(prop="tag" min-width="130px")
            template(slot-scope="scope")
              span(v-if="scope.row.edit")
                el-input(v-model="scope.row.tag" class="edit-input" size="small")
              div(v-else slot="reference" class="name-wrapper")
                c-svg-icon(icon-class="folder-add").p-svg-size
                el-tag(size="medium") {{ scope.row.tag }}

          el-table-column(style="margin-left: 50px" align="right" min-width="130px")
            template(slot-scope="scope")
              span(v-if="!scope.row.edit")
                el-button(@click="confirmEdit(scope.row)"  size="small" type="warning") {{ $t('pages.space.show.favorite-lists.edit-tag') }}
              span(v-else)
                el-button(type="success" size="small" icon="el-icon-circle-check-outline" @click="confirmEdit(scope.row)") OK
              el-button( type="danger" size="small" style="margin-left: 5px") {{ $t('pages.space.show.favorite-lists.delete-tag') }}

        span(slot="footer")
          el-input(v-if="inputVisible")
          el-button(v-else  size="small" style="position:absolute;left:25px;")  {{ $t('pages.space.show.favorite-lists.add-tag') }}
          el-button(size="small" style="margin-right: 10px") {{ $t('pages.space.show.favorite-lists.complete-tag') }}

</template>
<!-- ============================================================================ -->

<script>
    const spaceshowData = require('@/utils/spaceshow.json');
    const userInfoData = require('@/utils/userinfo.json');
    const reviewData  = require('@/utils/reviews.json');
    export default {
      async asyncData({app, query}) {
        try {
          let data = spaceshowData;
          let userData = userInfoData;
          return {
            space: data,
            thumbnails: data.thumbnails.map(thumbnail => {
              return thumbnail.url
            }),
            reviews: reviewData.reviews,
            amenities: data.amenities,
            userfavoriteTags: userData.favorite_space_list
          }
        } catch (error) {
          console.log(error)
        }
      },
      data () {
        const validateReviewTotalRate = (rule, value, callback) => {
          if (value === '' || value == undefined || value == 0) {
            console.log(value);
          } else {
            console.log(value)
          }
        };
        return {
          space: null,
          thumbnail: null || '/images/default.png' ,
          thumbnails: [],
          index: null,
          fromIcon: '〜',
          peopleFont: this.$t('pages.space.show.people-font'),
          reviews: [],
          leftBracket: '（',
          rightBracket: '）',
          reviewCountFont: this.$t('pages.space.show.review-count-font'),
          amenities: [],
          showAmenities: [],
          pointFont: this.$t('pages.space.show.point-font'),
          circleSize: 77,
          pushSymbol: '＋',
          reviewDialogVisible: false,
          addFavoriteList: false,
          inputVisible: false,
          showRespBtn: null,
          colon: ':',
          writeReviewForm: {
            review_total_rate: 0,
            review_locale_rate: 0,
            review_server_rate: 0,
            review_cleaning_rate: 0,
            review_comfort_rate: 0,
            review_facility_rate: 0,
            review_cost_rate: 0,
            description: null,
          },
          writeReviewRules: {
            review_total_rate: [
              { required: true, message: this.$t('pages.space.show.total_rate_validate_message'), trigger: ['blur', 'change'] },
              { type: 'number',  min: 0.5, max: 5, message: this.$t('pages.space.show.total_rate_validate_message') },
            ],
            review_locale_rate: [
              { required: true, message: this.$t('pages.space.show.total_rate_validate_message'), trigger: ['blur', 'change'] },
              { type: 'number',  min: 0.5, max: 5, message: this.$t('pages.space.show.total_rate_validate_message') },
            ],
            review_server_rate: [
              { required: true, message: this.$t('pages.space.show.total_rate_validate_message'), trigger: ['blur', 'change'] },
              { type: 'number',  min: 0.5, max: 5, message: this.$t('pages.space.show.total_rate_validate_message') },
            ],
            review_cleaning_rate: [
              { required: true, message: this.$t('pages.space.show.total_rate_validate_message'), trigger: ['blur', 'change'] },
              { type: 'number',  min: 0.5, max: 5, message: this.$t('pages.space.show.total_rate_validate_message') },
            ],
            review_comfort_rate: [
              { required: true, message: this.$t('pages.space.show.total_rate_validate_message'), trigger: ['blur', 'change'] },
              { type: 'number',  min: 0.5, max: 5, message: this.$t('pages.space.show.total_rate_validate_message') },
            ],
            review_facility_rate: [
              { required: true, message: this.$t('pages.space.show.total_rate_validate_message'), trigger: ['blur', 'change'] },
              { type: 'number',  min: 0.5, max: 5, message: this.$t('pages.space.show.total_rate_validate_message') },
            ],
            review_cost_rate: [
              { required: true, message: this.$t('pages.space.show.total_rate_validate_message'), trigger: ['blur', 'change'] },
              { type: 'number',  min: 0.5, max: 5, message: this.$t('pages.space.show.total_rate_validate_message') },
            ],
            description: [
              { required: true, message: this.$t('pages.space.show.description_validate_message'), trigger: 'blur' },
              { min: 2, max: 5000, message: this.$t('pages.space.show.description_min_message'), trigger: 'blur' }
            ]
          },
          oneStarReview: this.$t('pages.space.show.review-one'),
          twoStarReview: this.$t('pages.space.show.review-two'),
          threeStarReview: this.$t('pages.space.show.review-three'),
          fourStarReview: this.$t('pages.space.show.review-four'),
          fiveStarReview: this.$t('pages.space.show.review-five'),
          amenityType: [
            { value: 'tables', label: this.$t('pages.space.index.amenity-type.tables')},
            { value: 'chairs', label: this.$t('pages.space.index.amenity-type.chairs')},
            { value: 'projector', label: this.$t('pages.space.index.amenity-type.projector')},
            { value: 'parking', label: this.$t('pages.space.index.amenity-type.parking')},
            { value: 'wifi', label: this.$t('pages.space.index.amenity-type.wifi')},
            { value: 'whiteboard', label: this.$t('pages.space.index.amenity-type.whiteboard')},
            { value: 'printer', label: this.$t('pages.space.index.amenity-type.printer')},
            { value: 'kitchen_facilities', label: this.$t('pages.space.index.amenity-type.kitchen_facilities')},
            { value: 'kitchen_equipment', label: this.$t('pages.space.index.amenity-type.kitchen_equipment')},
            { value: 'tv', label: this.$t('pages.space.index.amenity-type.tv')},
            { value: 'lockers', label: this.$t('pages.space.index.amenity-type.lockers')},
            { value: 'catering_services', label: this.$t('pages.space.index.amenity-type.catering_services')},
            { value: 'bar', label: this.$t('pages.space.index.amenity-type.bar')},
            { value: 'sound_system', label: this.$t('pages.space.index.amenity-type.sound_system')},
            { value: 'mirrors', label: this.$t('pages.space.index.amenity-type.mirrors')},
            { value: 'showers', label: this.$t('pages.space.index.amenity-type.showers')},
            { value: 'changing_room', label: this.$t('pages.space.index.amenity-type.changing_room')},
            { value: 'photography_equipment', label: this.$t('pages.space.index.amenity-type.photography_equipment')},
            { value: 'film_equipment', label: this.$t('pages.space.index.amenity-type.film_equipment')},
            { value: 'public_transportation', label: this.$t('pages.space.index.amenity-type.public_transportation')},
            { value: 'toilet', label: this.$t('pages.space.index.amenity-type.toilet')},
            { value: 'refrigerator', label: this.$t('pages.space.index.amenity-type.refrigerator')},
            { value: 'power_equipment', label: this.$t('pages.space.index.amenity-type.power_equipment')},
            { value: 'air_conditioner', label: this.$t('pages.space.index.amenity-type.air_conditioner')},
            { value: 'restaurant', label: this.$t('pages.space.index.amenity-type.restaurant')},
            { value: 'market', label: this.$t('pages.space.index.amenity-type.market')},
            { value: 'accessibility', label: this.$t('pages.space.index.amenity-type.accessibility')},
            { value: 'drinking', label: this.$t('pages.space.index.amenity-type.drinking')},
            { value: 'pet', label: this.$t('pages.space.index.amenity-type.pet')},
            { value: 'child', label: this.$t('pages.space.index.amenity-type.child')},
            { value: 'smoking', label: this.$t('pages.space.index.amenity-type.smoking')},
          ],
        }
      },
      methods: {
        handleClick(tab, event) {
          switch (tab.name) {
            case 'about-space':
              return setTimeout(() => this.$scrollTo('#about-space'));
            case 'all-online-price':
              return setTimeout(() => this.$scrollTo('#all-online-price'));
            case 'access-info':
              return setTimeout(() => this.$scrollTo('#access-info'));
            case 'amenity-list':
              return setTimeout(() => this.$scrollTo('#amenity-list'));
            case 'review-list':
              return setTimeout(() => this.$scrollTo('#review-list'));
            case 'write-review':
              return this.reviewDialogVisible = true;
            case 'add-favorite-list':
              return this.addFavoriteList = true;
          }
        },

        nl2br (text) {
          if (!text) return;
          return text.split('\n').join('<br/>')
        },

        handleJumpSide(index, row) {
        },

        showMapCenter(space) {
          return { lat: parseFloat(space.lat), lng: parseFloat(space.lng) }
        },

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

        displayValueForAmenities() {
          this.showAmenities = this.amenityType.map(amenity => {
            let { value }= amenity;
            this.amenities.includes(value)　? amenity['show'] = true : amenity['show'] = false;
            return amenity
          });
        },

        addString(value) {
          return 'amenity-' + value
        },

        addLike() {
          console.log('add Like');
        },

        handleAddReview(writeReviewForm) {
          this.$refs['writeReviewForm'].validate(async (valid) => {
            if (valid) {
              console.log('add Review!');
              this.reviewDialogVisible = false;
            }
          })
        },

        confirmEdit(row) {
          row.edit = true;
          let tempData = row.tag;
          row.tag = "原因不明";
          row.tag = tempData;
          console.log(row);
          this.$message({
            message: 'The title has been edited',
            type: 'success'
          })
        },

        showResponseBtn(index) {
          this.showRespBtn = index;
        },

        closeResponseBtn() {
          this.showRespBtn = null
        }
      },
      mounted() {
        this.displayValueForAmenities()
      },
    }
</script>

<!-- ============================================================================ -->

<style lang="stylus">
  $font-color=#787878
  $theme-color=#4ab7bd
  #space-show
    min-height 80vh
    .p-margin-lg
      margin-top 20px
    .el-tabs__item
      color $font-color
    .p-review-resp-user-name
      color #ff9d00 !important
      font-size 12px
      padding-top 3px
    .p-comment-font
      color $font-color
      font-size 12px
    .p-reply-message
      color $font-color
      margin-left 7px
      font-size 12px
    .p-space-title
      display inline
      font-weight normal
    .p-box-div
      min-width t(300)
      border 1px solid #ddd
      background-color #fff
    .p-border-line
      border 0.7px solid #dee2e2
      margin-top 5px
      margin-bottom 10px
    .p-left-div
      min-width t(300)
      /*max-height 97vh*/
      height 1100px
    .p-center-img
      display block
      width 100%
      height 500px
    .p-card-size
      max-width 660px
      min-width 400px
      width 100%
      margin-top 10px
    .p-show-image-btn
      position absolute
      margin-left 160px
      margin-top -100px
    .p-margin-size
      margin-top 10px
    .p-font-color
      color $font-color
    .p-icon-size
      width 15px
      height 15px
      color: $font-color
    .p-review-count
      margin-right 10 !important;
    .p-description-css
      font-size small
      color $font-color
      font-family: 'Helvetica Neue', sans-serif;
    .p-amenity-css
      color $font-color
      width 40px
      height 40px
      margin-top 15px
      margin-right 5px
    .p-not-show-icon
      text-decoration line-through
      color #ccc
    .p-user-review-title
      text-align center
      margin-top 30px
      color $font-color
    .p-review-margin
      margin-top 25px
    .p-margin-review-btn
      margin-top 20px
    .p-review-point
      color $theme-color
      margin-top 20px
    .p-review-circle
      color $theme-color
    .p-review-font-1
      color $theme-color
      /*margin-left 1px*/
    .p-review-font-2
      color $theme-color
      margin-left 1px
    .p-review-font-3
      color $theme-color
      margin-left 16px
    .p-review-font-4
      color $theme-color
      margin-left 16px
    .p-review-font-5
      color $theme-color
      margin-left 25px
    .p-review-font-6
      color $theme-color
      margin-left 15px
    .p-review-box
      border:none
      border-bottom 1px dashed #dfdfdf
      padding 30px 15px 10px 0px
    .p-review-user-img
      height 35px
      width 50%
      border-radius 50%
    .p-review-user-name
      font-size xx-small !important
      color $theme-color
      margin-top -20px
    .p-review-rate
      margin-top 5px
    .p-add-like-icon
      color $theme-color
      width 30px
      height 30px
      margin-top 15px
      margin-right 5px
    .p-add-like-count
      color $theme-color
      font-size 14px
    .p-dialog-title
      color $font-color
    .p-review-total-star
      width 30px
    .p-tag-color
      background #4ab7bd
      color #fff
    .p-review-star
      margin-top 4px
    .p-title h1,
    .p-title h2,
    .p-title h3
      color $font-color
    .p-svg-size
      width 20px
      height 20px
      color $font-color
      margin-right 10px
      margin-top 2px
    .p-dialog-title
      font-size 20px
      color #4ab7bd
    #map
      min-width 100%
      height 501px
</style>
