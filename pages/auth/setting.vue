<template lang="pug">
  #auth-setting
    c-public-header

    <!--div.u-col-center-middle.p-container-->
      <!--el-form(:model="settingForm" ref="settingForm" :rules="settingRules" label-width="150px" label-positiob="left")-->

        <!--el-form-item(:label="$t('pages.auth.setting.name')")-->
          <!--el-input(v-model="settingForm.name" type="text"  auto-complete="off" )-->

    el-row().p-container
      el-col(:span="10" :offset="7")
        el-form(:model="settingForm" ref="settingForm" :rules="settingRules" label-width="150px" label-positiob="left")

          el-form-item(:label="$t('pages.auth.setting.name')" prop="name")
            el-input(v-model="settingForm.name" type="text"  auto-complete="off" style="width: 80%;")

          el-form-item(:label="$t('pages.auth.setting.email')" prop="email")
            el-input(v-model="settingForm.email" type="text" auto-complete="off" style="width: 80%;")

          <!--el-form-item(:label="$t('pages.auth.setting.password')")-->
            <!--el-input(v-model="settingForm.password" name="password" type="password" auto-complete="off" style="width: 80%;")-->

          <!--el-form-item(:label="$t('pages.auth.setting.confirm-password')")-->
            <!--el-input(v-model="settingForm.checkPassword" name="confirmPassword" type="password" auto-complete="off" style="width: 80%;")-->


          el-form-item(:label="$t('pages.auth.setting.sex')" prop="sex")
            el-select(v-model="settingForm.sex" :placeholder="$t('pages.auth.setting.sex-entry')" style="width: 80%;")
              el-option(:label="$t('pages.auth.setting.option-man')" value="1")
              el-option(:label="$t('pages.auth.setting.option-women')" value="2")
              el-option(:label="$t('pages.auth.setting.option-other')" value="3")

          el-form-item(:label="$t('pages.auth.setting.birthday')" prop="birthday")
            el-date-picker(v-model="settingForm.birthday" name="birthday" type="date" :placeholder="$t('pages.auth.setting.birthday-of-entry')" :picker-options="birthdayOptions" style="width: 80%;")

          el-form-item(:label="$t('pages.auth.setting.profile-image')")


          el-form-item(:label="$t('pages.auth.setting.self-introduction')" prop="description")
            el-input(v-model="settingForm.description" type="textarea"  :autosize="{ minRows: 5, maxRows: 6}" style="width: 100%")

    el-row()
      el-col(:span="18" :offset="3")
        el-alert(:closable="false").p-alter-color
          h2(slot="title" style="color: #fff") {{ $t('pages.auth.setting.travel-tag') }}

    el-row().p-margin-size
      el-col(:span="16" :offset="4")
        span().p-select-travel-tag-message {{ $t('pages.auth.setting.select-travel-tag-three') }}

    el-row().p-margin-size
      el-col(:span="18" :offset="3")
        el-checkbox-group(v-model="settingForm.travelTags")
          el-col(:xl="3" :lg="4" :md="8" :sm="8" :xs="12" v-for="(tag, index) in travelTagTypes" :key="index").p-margin-size
            el-checkbox-button(:label="tag.value" text-color="#8ab8e8" border type="primary" :key="tag.label") {{ tag.label }}

    el-row().p-margin-size
      el-col(:span="16" :offset="4")
        span.p-margin-size.p-margin-size.p-select-travel-tag-message  {{ $t('pages.auth.setting.before-save-message') }}

    el-row().p-margin-lg-size
      el-col(:span="18" :offset="3")
        .p-border-line

    el-row().p-margin-lg-size
      el-col(:span="5" :offset="8")
        el-button(style="width: 120px" type="primary") {{ $t('pages.auth.setting.save-btn') }}
      el-col(:span="4")
        el-button(type="text" ) {{ $t('pages.auth.setting.cancel-btn') }}
</template>

<!-- ============================================================================ -->
<script>
    const userInfoData = require('@/utils/userinfo.json');
    export default {
      async asyncData({ app, query }) {
        try {
          let data = userInfoData;

          return {
            // settingForm.name: data.name,
            name: data.name,
            email: data.email,
            sex: data.sex,
            birthday: data.birthday,
            description: data.description,
            travelTags: data.travel_tags,
          }
        } catch (error) {
          console.log(error)
        }
      },
      data() {
        return {
          settingForm: {
            name: null,
            email: null,
            // password: '',
            // checkPassword: '',
            sex: null,
            birthday: '',
            description: null,
            travelTags: [],
          },
          settingRules: {
            name: [
              { required: true, message: this.$t('pages.auth.setting.input-name-form'), trigger: 'blur' },
              { min: 1, max: 16, message: this.$t('pages.auth.setting.validate-name-form'), trigger: ['blur', 'change']}
            ],
            email: [
              { required: true, message: this.$t('pages.auth.setting.input-email-form'), trigger: 'blur' },
              { type: 'email', message: this.$t('pages.auth.setting.validate-email-form'), trigger: ['blur', 'change'] }
            ],
            sex: [
              { required: true, message: this.$t('pages.auth.setting.input-sex-form'), trigger: 'change'},
            ],
            birthday: [
              { required: true, type: 'date',  message: this.$t('pages.auth.setting.input-birthday-form'), trigger: 'change'}
            ],
            description: [
              { required: true, message: this.$t('pages.auth.setting.input-description-form'), trigger: ['blur', 'change'] }
            ]
          },
          birthdayOptions: {
            disabledDate(time) {
              return time.getTime() > Date.now() - 3600 * 1000 * 24 * 365 * 12;
            },
          },
          travelTagTypes: [
            { value: "backpacker", label: this.$t('pages.auth.setting.travel-tags.backpacker') },
            { value: 'shopping fanatic', label: this.$t('pages.auth.setting.travel-tags.shopping-fanatic') },
            { value: 'eco-tourist', label: this.$t('pages.auth.setting.travel-tags.eco-tourist')},
            { value: 'thrifty traveler', label: this.$t('pages.auth.setting.travel-tags.cheap-travel') },
            { value: '60+ traveler', label: this.$t('pages.auth.setting.travel-tags.sixty-over-than-traveler')},
            { value: 'nature lover', label: this.$t('pages.auth.setting.travel-tags.nature-lover')},
            { value: 'urban explorer', label: this.$t('pages.auth.setting.travel-tags.urban-explorer')},
            { value: 'thrill seeker', label: this.$t('pages.auth.setting.travel-tags.thrill-seeker')},
            { value: 'foodie', label: this.$t('pages.auth.setting.travel-tags.foodie')},
            { value: 'peace and quiet seeker', label: this.$t('pages.auth.setting.travel-tags.peace-and-quiet-seeker')},
            { value: 'vegetarian', label: this.$t('pages.auth.setting.travel-tags.vegetarian')},
            { value: 'art and architecture lover', label: this.$t('pages.auth.setting.travel-tags.art-and-architecture-lover')},
            { value: 'beach goer', label: this.$t('pages.auth.setting.travel-tags.beach-goer')},
            { value: 'like a local', label: this.$t('pages.auth.setting.travel-tags.like-a-local')},
            { value: 'luxury traveler', label: this.$t('pages.auth.setting.travel-tags.luxury-traveler')},
            { value: 'history buff', label: this.$t('pages.auth.setting.travel-tags.history-buff')},
            { value: 'trendsetter', label: this.$t('pages.auth.setting.travel-tags.trendsetter')},
            { value: 'family vacationer', label: this.$t('pages.auth.setting.travel-tags.family-vacationer')},
            { value: 'nightlife seeker', label: this.$t('pages.auth.setting.travel-tags.nightlife-seeker')},
          ]
        }
      },
      mounted() {
        this.settingForm.name = this.name;
        this.settingForm.email = this.email;
        this.settingForm.birthday = new Date(this.birthday);
        this.settingForm.sex = this.sex;
        this.settingForm.description = this.description;
        this.settingForm.travelTags = this.travelTags;
      }
    }
</script>

<!-- ============================================================================ -->

<style lang="stylus">
  $font-color=#787878
  $theme-color=#4ab7bd
  #auth-setting
    .p-container
      margin-top 3%
    .p-alter-color
      background-color $theme-color
      height 40px
    .p-select-travel-tag-message
      color $font-color
    .p-margin-size
      margin-top 10px
    .p-margin-lg-size
      margin-top 30px
    .p-border-line
      border 0.7px solid #dee2e2
      margin-bottom 10px

</style>
