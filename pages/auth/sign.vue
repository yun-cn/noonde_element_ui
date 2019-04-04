<template lang="pug">
  #auth-sign
    c-public-header

    div.u-col-center-middle.p-container
      el-card(style="width:600px")
        div(slot="header")
          h3.title-form {{ $t('pages.auth.sign.sign-title') }}

        el-form(:model="signForm" ref="signForm" :rules="signRules" label-width="150px"  label-position="left")

          el-form-item(:label="$t('pages.auth.sign.name')" prop="name")
            el-input(v-model="signForm.name" name="name" type="text" auto-complete="off" style="width:320px")


          el-form-item(:label="$t('pages.auth.sign.email')" prop="email")
            el-input(v-model="signForm.email" name="email" type="text" auto-complete="off" style="width:320px")

          el-form-item(:label="$t('pages.auth.sign.password')" prop="password")
            el-input(v-model="signForm.password" name="password" type="password" auto-complete="off" style="width:320px")

          el-form-item(:label="$t('pages.auth.sign.confirm-password')" prop="checkPassword")
            el-input(v-model="signForm.checkPassword" name="confirmPassword" type="password" auto-complete="off" style="width:320px")

          el-form-item(:label="$t('pages.auth.sign.birthday')" prop="birthday")
            el-date-picker(v-model="signForm.birthday" type="date" :placeholder="$t('pages.auth.sign.birthday-of-entry')"  style="width:320px" :picker-options="birthdayOptions")

          el-form-item
            el-button(:loading="isLoading" type="primary" style="width:200px;margin-right:30px; margin-top: 15px" @click="submitForm('signForm')") {{ $t('pages.auth.sign.but-sign') }}


</template>

<!-- ============================================================================ -->
<script>
  import Identicon from 'identicon.js';
  import dragVerify from 'vue-drag-verify';
  import Dropzone  from 'nuxt-dropzone'
  import 'nuxt-dropzone/dropzone.css'
  import { validateEmail } from '@/utils/validate';

  if (process.client) {
    require('croppie');
    require('croppie/croppie.css');
  }

  export default {
    name: 'Sign',
    components: {
      dragVerify,
      Dropzone
    },
    data() {
      const validatePassword = (rule, value, callback) => {
        if (value === '') {
          console.log(value);
          callback(new Error(this.$t('pages.auth.sign.input-password-form')))
        } else {
          if (this.signForm.checkPassword !== '') {
            this.$refs.signForm.validateField('checkPassword');
          }
          callback()
        }
      };
      const validateCheckPassword = (rule, value, callback) => {
        if (value === '') {
          callback(new Error(this.$t('pages.auth.sign.input-password-form')))
        } else if (value != this.signForm.password) {
          callback(new Error(this.$t('pages.auth.sign.different-of-password')))
        } else {
          callback()
        }
      };
      const validateImage = (rule, value, callback) => {
        if (value.length === 0) {
          callback(new Error(this.$t('pages.auth.sign.upload-image')))
        }
      };
      return {
        signForm: {
          name: null,
          email: null,
          password: '',
          checkPassword: '',
          birthday: null,
        },
        src: null,
        isLoading: false,

        signRules: {
          name: [
            { required: true, message: this.$t('pages.auth.sign.input-name-form'), trigger: 'blur' },
            { min: 1, max: 16, message: this.$t('pages.auth.sign.validate-name-form'), trigger: 'blur' }
          ],
          email: [
            { required: true, message: this.$t('pages.auth.sign.input-email-form'), trigger: 'blur' },
            { type: 'email', message: this.$t('pages.auth.sign.validate-email-form'), trigger: ['blur', 'change'] }
          ],
          password: [
            { required: true, trigger: 'blur', validator: validatePassword },
            { min: 6, max: 16, message: this.$t('pages.auth.sign.validate-password-form'), trigger: 'blur' }
            ],
          checkPassword: [
            { required: true, trigger: 'blur', validator: validateCheckPassword },
            { min: 6, max: 16, message: this.$t('pages.auth.sign.validate-password-form'), trigger: 'blur' }
            ],
          birthday: [{
            type: 'date',
            required: true,
            message: this.$t('pages.auth.sign.input-birthday-form'),
            trigger: 'change'
          }],
          imageUrl: [{ required: true, trigger: 'blur', validator: validateImage }],
        },
        birthdayOptions: {
          disabledDate(time) {
            return time.getTime() > Date.now() - 3600 * 1000 * 24 * 7;
          },
        }
      }
    },
    mounted() {
      this.setIdenticon()
    },

    destroyed() {
      // if (this.croppie)  this.croppie.destroy();
      // if (this.timeout)  clearTimeout(this.timeout);
    },

    methods: {
      submitForm(formName) {
        this.$refs[formName].validate(async (valid) => {
          if (valid) {
            this.isLoading = true;
            let {data} = await this.$axios.post(`/www/user/create`, {
              email: this.signForm.email,
              password: this.signForm.password,
              name: this.signForm.name,
              birthday: this.signForm.birthday,
              avatar_data: this.src,
            });
            console.log(data);

          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },

      setIdenticon() {
        const chars = '0123456789ABCDEFGHIJ';
        let rand = '';
        for (let i = 1; i <= 15; i++) {
          rand += chars.charAt(Math.floor(Math.random() * chars.length))
        }
        let data = new Identicon(rand, {
          margin: 0.2,
          size: 300,
        }).toString();
        this.src = `data:image/png;base64,${data}`;
      },
    }
  }
</script>

<!-- ============================================================================ -->

<style lang="stylus">
  #auth-sign
    .p-container
      min-height 80vh
    .title-form
      margin-left 36%
</style>
