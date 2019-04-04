<template lang="pug">
  #index-page
    c-user-header
    div.page-container
      el-select(:placeholder="$t('pages.index.search-keywords')"  style="width: 300px;" class="filter-item" v-model="searches" multiple filterable allow-create default-first-option)
        el-option(v-for="item in searchesOptions" :key="item.key" :value="item.value")
      el-date-picker(type="date" v-model="checkInDay" :placeholder="$t('pages.index.from-day')" class="filter-item" style="width: 150px;" :picker-options="pickerOptionsStartDay" @change="updateChangeDatetime")
      el-time-select(:placeholder="$t('pages.index.start-time')" v-model="checkInTime" class="filter-item" style="width: 150px;" :picker-options="{start: '00:00', step: '00:60',end: '24:00', minTime: tempCheckInTime}" )
      div -
      el-date-picker(type="date" v-model="checkOutDay" :placeholder="$t('pages.index.end-day')" class="filter-item" style="width: 150px;" :picker-options="pickerOptionsEndDay" @change="updateChangeDatetime")
      el-time-select(:placeholder="$t('pages.index.end-time')" v-model = "checkOutTime" class="filter-item" style="width: 150px;" :picker-options="{start: '00:00', step: '00:60',end: '24:00', minTime: checkInTime}")
      el-input-number(controls-position="right" class="filter-item" style="width: 120px;" :min="1" v-model="guestOfNumber" :placeholder="$t('pages.index.number-of-guest')")
    div.page-container.search-button
      el-button(type="primary" class="filter-item" style="width: 120px;" @click="searchButton") {{ $t('pages.index.search-button') }}
</template>

<!-- ============================================================================ -->
<script>
  import queryString from 'query-string';
  import moment from 'moment'

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
        page: null || 1,
        size: null || 24,
        sort: null || 'id asc',
        searches: [],
        searchesOptions: [],
        checkInDay: null,
        checkInTime: null,
        checkOutDay: null,
        checkOutTime: null,
        guestOfNumber: null,
        tempCheckInTime: null,
      }
    },
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
            return time.getTime() < new Date(this.checkInDay).getTime()
          }
        })
      },

      updateChangeDatetime() {
        this.$nextTick(function () {
          if (this.checkInDay) {
            this.pickerOptionsEndDay = Object.assign({}, this.pickerOptionsEndDay, {
              disabledDate: (time) => {
                return time.getTime() < new Date(this.checkInDay).getTime()
              }
            })
          }

          if (this.checkOutDay && this.checkOutDay < this.checkInDay) {
            this.checkInDay = this.checkOutDay;
            this.pickerOptionsStartDay = Object.assign({}, this.pickerOptionsStartDay, {
              disabledDate: (time) => {
                return (time.getTime() + 3600 * 1000 * 24) < Date.now();
              }
            })
          }
        })
      },
      async searchButton() {
        // 初始化一部分数据减少搜索压力
        if (!this.guestOfNumber) this.guestOfNumber = 1;

        this.checkInDay = !this.checkInDay ? moment().format('YYYY-MM-DD') : moment(this.checkInDay).format('YYYY-MM-DD');
        this.checkInTime = !this.checkOutTime ? moment().add(2, 'hours').format('hh:00') : moment(this.checkInDay + 'T' + this.checkInTime).format('hh:00');
        this.checkOutDay = !this.checkOutDay ? this.checkInDay : moment(this.checkOutDay).format('YYYY-MM-DD');
        this.checkOutTime = !this.checkOutTime ? moment(this.checkInDay + 'T' + this.checkInTime).add(3, 'hours').format('hh:00') : this.checkOutTime;

        let sq = queryString.stringify({
          searches: this.searches,
          checkInDay: this.checkInDay,
          checkInTime: this.checkInTime,
          checkOutDay: this.checkOutDay,
          checkOutTime: this.checkOutTime,
          guestOfNumber: this.guestOfNumber,
          page: this.page,
          size: this.size,
          sort: this.sort,
        });
        console.log(sq);
        this.$router.push({path: `/space?${sq}`})
      }
    }
  }
</script>

<!-- ============================================================================ -->

<style lang="stylus">
  #index-page
    max-height 80vh
    .page-container
      margin-top 100px
      display flex
      justify-content center
      flex-direction row
      align-items center
    .login-form
      display inline-block
      margin-bottom 10px
    .search-button
      margin-top 40px
</style>
