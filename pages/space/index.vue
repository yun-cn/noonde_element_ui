<template lang="pug">
  #space-index
    c-public-header

    div.u-col-center-middle
      el-card(style="width:100%")
        div(slot="header" style="margin: 10 10 0")
          el-select(:placeholder="$t('pages.space.index.search-keywords')"  style="width: 33%" class="filter-item" v-model="searches" multiple filterable allow-create default-first-option)
            el-option(v-for="item in searchesOptions" :key="item.key" :value="item.value")
          el-date-picker(type="date" v-model="checkInDay" :placeholder="$t('pages.space.index.from-day')" class="filter-item" style="width: 12%;" :picker-options="pickerOptionsStartDay" @change="changeEnd" )
          el-time-select(:placeholder="$t('pages.space.index.start-time')" v-model="checkInTime" class="filter-item" style="width: 11%;" :picker-options="{start: '00:00', step: '00:60',end: '24:00'}")
          el-date-picker(type="date" v-model="checkOutDay" :placeholder="$t('pages.space.index.end-day')" class="filter-item" style="width: 12%;" :picker-options="pickerOptionsEndDay" @change="changeStart")
          el-time-select(:placeholder="$t('pages.space.index.end-time')" v-model="checkOutTime" class="filter-item" style="width: 11%;" :picker-options="{start: '00:00', step: '00:60',end: '24:00', minTime: checkInTime}")
          el-input-number(controls-position="right" class="filter-item" style="width: 7%;" :min="1" v-model="guestOfNumber" :placeholder="$t('pages.space.index.number-of-guest')")
          el-button(type="primary" class="filter-item" style="margin-left:10px; width: 10%") {{ $t('pages.space.index.search-button') }}
        div
          el-select(:placeholder="$t('pages.space.index.review')" v-model="starScore" )
            el-option(v-for="item in reviewOptions" :key="item.value" :label="item.label" :value="item.value")

          el-select(:placeholder="$t('pages.space.index.purpose-of-use')" multiple v-model="eventType" style="width: 33%")
            el-option(v-for="item in purposeOfUse" :key="item.value" :label="item.label" :value="item.value")

          el-select(:placeholder="$t('pages.space.index.amenity')" multiple filterable v-model="amenityKeyWords" style="width: 33%")
            el-option(v-for="item in amenityType" :key="item.value" :label="item.label" :value="item.value")

          <!--el-select(:placeholder="$t('pages.space.index.sorts-type')" v-model="sort")-->
            <!--el-option(v-for="item in sortsOptions" :key="item.value" :label="item.label" :value="item.value")-->


    .u-pa24
      .u-row-between-top.u-mb8.u-wrap
        .p-left-div.u-full.u-col-stretch-top.u-pr20.u-mb16
          el-row(:gutter="15" style="margin-left: 10px")
            el-col(:xs="24" :sm="24" :md="12" :lg="12" :xl="8" v-for="(space, index) in spaces" :key="index")
              el-card(shadow="hover" @mouseenter.native="showMapInfo(space)" @mouseleave.native="closeMapInfo(space)").p-card-size
                el-carousel(:interval="setInterval" indicator-position="none")
                  el-carousel-item(v-for="(img, index) in space.thumbnails" :key="index")
                    c-img(width="280px" :src="img.url").p-center-img
                div(style="margin-top: -7px; font-weight: bold; height: 55px"  @click="showSpaceDetails(space)" :style="{ cursor: 'pointer'}") {{ space.name.substring(0,35) }}
                div(@click="showSpaceDetails(space)" :style="{ cursor: 'pointer'}").p-guest-and-access
                  c-svg-icon(icon-class="peoples")
                  span.u-ml8 {{ fromIcon }}  {{ space.capacity }} {{ peopleFont }}
                  c-svg-icon.u-ml10(icon-class="map" style="margin-le")
                  span.u-ml13 野田/玉川駅3分 野田/玉川駅3分野田/玉川駅3分
                div.u-full.u-col-stretch-top.u-mb5.p-review-star
                  h3 {{ space.price_range }}
                  el-rate(v-model="space.review_count" disabled text-color="#ff9900" style="width: 50%")
                  c-img.u-mr8(height="35px" width="50%" :src="displayValueForPlatform(space.platform)" )
                div.u-full.u-col-stretch-top.u-mb5
                  el-button(@click="jumpPlatform()").p-detailed-btn 詳細

          el-row(:gutter="20")
            el-col(el-col :span="12" :offset="6")
              el-pagination(background layout="prev, pager, next" :total="1000")

        .p-right-div.u-full.u-col-stretch-top.u-mb16.p-map-top
          .p-form-div.u-pa24
            c-room-list-map(:rooms="showMapRooms(spaces)" :center="showMapCenter(spaces)" :hovered-room="hoveredSpace")
</template>

<!-- ============================================================================ -->
<script>
    import twix from 'twix';
    import moment from 'moment';
    import queryString from 'query-string';
    const spacesData = require('@/utils/space.json');

    export default {
      data () {
        return {
          pickerOptionsStartDay: {
            disabledDate(time) {
              return (time.getTime() + 3600 * 1000 * 24) < Date.now();
            }
          } || {},
          pickerOptionsEndDay: {
            disabledDate(time) {
              return (time.getTime() + 3600 * 1000 * 24) < Date.now();
            }
          } || {},
          reviewOptions: [
            { value: '5', label: this.$t('pages.space.index.review-five-star')},
            { value: '4', label: this.$t('pages.space.index.review-four-star')},
            { value: '3', label: this.$t('pages.space.index.review-three-star')},
            { value: '2', label: this.$t('pages.space.index.review-two-star')},
            { value: '1', label: this.$t('pages.space.index.review-one-star')},
          ],
          purposeOfUse: [
            { value: 'party', label: this.$t('pages.space.index.event-type.party')},
            { value: 'class', label: this.$t('pages.space.index.event-type.class')},
            { value: 'photo_shoot', label: this.$t('pages.space.index.event-type.photo-shoot')},
            { value: 'film_shoot', label: this.$t('pages.space.index.event-type.film-shoot')},
            { value: 'event', label: this.$t('pages.space.index.event-type.event')},
            { value: 'performance', label: this.$t('pages.space.index.event-type.performance')},
            { value: 'studio', label: this.$t('pages.space.index.event-type.studio')},
            { value: 'sports', label: this.$t('pages.space.index.event-type.sports')},
            { value: 'office', label: this.$t('pages.space.index.event-type.office')},
            { value: 'wedding', label: this.$t('pages.space.index.event-type.wedding')},
            { value: 'stay-business', label: this.$t('pages.space.index.event-type.stay-business')},
            { value: 'stay-trip', label: this.$t('pages.space.index.event-type.stay-trip')},
            { value: 'stay-group', label: this.$t('pages.space.index.event-type.stay-group')},
            { value: 'stay-vacation', label: this.$t('pages.space.index.event-type.stay-vacation')},
            { value: 'other', label: this.$t('pages.space.index.event-type.other')},
          ],
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
          sortsOptions: [
            { value: 'price asc', label: this.$t('pages.space.index.sorts.price-asc')},
            { value: 'price desc', label: this.$t('pages.space.index.sorts.price-desc')},
          ],
          temPicuter: [
            'http://i.pravatar.cc/300',
            'http://i.pravatar.cc/300',
            'http://i.pravatar.cc/300',
            'http://i.pravatar.cc/300',
          ],
          searches: null || [],
          searchesOptions: [],
          checkInDay: null,
          checkInTime: null,
          checkOutDay: null,
          checkOutTime: null,
          guestOfNumber: 1 ,
          starScore: null,
          eventType: [],
          amenityKeyWords: [],
          searchRange: [],
          page: null || 1,
          size: null || 24,
          total: null || 0,
          sort: null || 'id asc',
          spaces: [],
          setInterval: 9000000,
          fromIcon: "〜",
          peopleFont: this.$t('pages.space.index.people-font'),
          hoveredSpace: null
        }
      },
      async asyncData({ app, query }) {
        console.log(query);
        try {
          // let searches = !query.searches ? [] : query.searches;
          let searches = [];
          if (!query.searches) {
            searches = []
          } else if(typeof query.searches === 'string') {
            searches.push(query.searches);
          } else {
            searches = query.searches
          }
          let guestOfNumber = !query.guestOfNumber ? 1 : parseInt(query.guestOfNumber);
          let page = parseInt(query.page || 1);
          let size = parseInt(query.size || 24);
          let sort = query.sort || 'price asc';
          let total = 0;

          let spaces = []


          let checkInDay = !query.checkInDay ? moment().format('YYYY-MM-DD') : moment(query.checkInDay).format('YYYY-MM-DD');
          let checkInTime = !query.checkInTime ? moment().add(2, 'hours').format('hh:00') : moment(checkInDay + 'T' + query.checkInTime).format('hh:00');
          let checkOutDay = !query.checkOutDay ? checkInDay: moment(query.checkOutDay).format('YYYY-MM-DD');
          let checkOutTime = !query.checkOutTime ? moment(checkInDay + 'T' + checkInTime).add(3, 'hours').format('hh:00') : moment(checkOutDay + 'T' + query.checkOutTime).format('hh:00');

          var startDate = String(checkInDay + 'T' + checkInTime);
          var endDate = String(checkOutDay + 'T' + checkOutTime);


          var itr = moment.twix(new Date(startDate),new Date(endDate)).iterate(1,"hours");
          var range=[];
          while(itr.hasNext()){
            range.push(moment(itr.next().toDate()).format('YYYY-MM-DD,hh:00'))
          }
          console.log(range);
          let sq = queryString.stringify({
            searches: searches,
            searchRange: range,
            guestOfNumber: guestOfNumber,
            sort: sort,
            page: page,
            size: size,
          });


          // let { data } = await app.$axios.get(`/www/space/list?${sq}`);
          // let { data } = await app.$axios.get(``)

          let data = spacesData;
          spaces = data ;


          // if (data.code === 'S00200') {
          //   spaces = data.spaces;
          //   total = data.total || 0
          // }

          return {
            searches: searches,
            guestOfNumber: guestOfNumber,
            checkInDay: checkInDay,
            checkInTime: checkInTime,
            checkOutDay: checkOutDay,
            checkOutTime: checkOutTime,
            searchRange: range,
            spaces: data,
          }
        } catch (error) {
          console.log(error)
        }
      },

      // watch: {
      //   page () { this.pushState() },
      // },

      methods: {
        changeStart () {
          this.pickerOptionsStartDay = Object.assign({}, this.pickerOptionsStartDay, {
            disabledDate: (time) => {
              return (time.getTime() + 3600 * 1000 * 24) < Date.now();
            }
          })
        },

        changeEnd () {
          this.pickerOptionsEndDay = Object.assign({}, this.pickerOptionsEndDay, {
            disabledDate: (time) => {
              return time.getTime() < new Date(this.formFromDay).getTime()
            }
          })
        },

        showSpaceDetails(space) {
          console.log(space);

        },

        showMapInfo: function(space) {
          this.hoveredSpace = space;
        },

        closeMapInfo: function(space) {
          this.hoveredSpace = null;
        },

        jumpPlatform() {
          console.log('jumpPlatform')
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

        showMapRooms(spaces) {
          if (spaces.length != 0) {
              return spaces
          }
        },

        showMapCenter(spaces) {
          if (spaces.length != 0) {
            return { lat: parseFloat(spaces[0].lat), lng: parseFloat(spaces[0].lng) }
          }
        }
      },
    }
</script>

<!-- ============================================================================ -->

<style lang="stylus">
  #space-index
    .p-left-div
      min-width t(300)
      /*max-height 97vh*/
      height 1100px
      overflow scroll
    .el-card:hover
      box-shadow: 0 0 11px rgb(0, 132, 137);
    .p-card-size
      max-width 360px
      width 100%
      margin-top 10px
    .p-center-img
      display block
      margin-left auto
      margin-right auto
    .p-guest-and-access
      margin-top 7px
      margin-left -1px
      font-size small
      height 35px
    .p-review-star
      margin-top 7px
    .p-detailed-btn
      margin-top -30px
      margin-left 170px
    .p-right-div
      min-width t(300)
      border 1px solid #ddd
      background-color #fff
    .p-map-top
      margin-top 10px
    .map
      min-width 100%
      height 1045px
    #map
      min-width 100%
      height 1050px
</style>
