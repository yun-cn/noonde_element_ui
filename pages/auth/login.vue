<template lang="pug">
  #auth-login
    c-public-header

    div.u-col-center-middle.p-container
      el-card(style="width:600px")
        div(slot="header")
          h3.title-form {{ $t('pages.auth.login.login-title') }}

        el-form(:model="loginForm" ref="loginForm" :rules="loginRules" label-width="150px" label-positiob="left")

          el-form-item(:label="$t('pages.auth.login.email')" prop="email")
            el-input(v-model="loginForm.email" type="text" auto-complete="off" style="width:320px")

          el-form-item(:label="$t('pages.auth.login.password')" prop="password")
            el-input(v-model="loginForm.password" :type="passwordType" auto-complete="off" style="width:320px")
            span(class="show-pwd" @click="showPwd")
              c-svg-icon(:icon-class="passwordType === 'password' ? 'eye' : 'eye-open'")

          el-form-item
            el-checkbox(v-model="loginForm.rememeberMe" :label="$t('pages.auth.login.remember-me')")

          el-form-item
            el-button(:loading="isLoading" type="primary" style="width:200px;margin-right:30px; margin-top: 15px" @click="handleLogin('loginForm')") {{ $t('pages.auth.login.but-login') }}
            router-link(class="el-menu-item link" to="/auth/forgot_password" style="text-decoration: none; margin-top: 30px") {{ $t('pages.auth.login.forgot-password') }}
</template>

<!-- ============================================================================ -->
<script>
  import { validateEmail } from '@/utils/validate';
  import dragVerify from 'vue-drag-verify';

  export default {
    name: 'Login',
    components:{
      dragVerify
    },
    data() {
      return {
        loginForm: {
          email: null,
          password: null,
          rememeberMe: true,
        },
        passwordType: 'password',
        isLoading: false,
        passwordErrorMessages: null,
        loginRules: {
          email: [
            { required: true, message: this.$t('pages.auth.login.input-email-form'), trigger: 'blur' },
            { type: 'email', message: this.$t('pages.auth.login.validate-email-form'), trigger: ['blur', 'change'] }
          ],
          password: [{ required: true, message: this.$t('pages.auth.login.input-password-form'), trigger: 'blur' },
            { min: 6, max: 16, message: this.$t('pages.auth.login.validate-password-form'), trigger: 'blur' }],
        },
        setDragVerify: {
          width: 450,
          height: 40,
          text: this.$t('pages.auth.sign.set-drag-verify-text'),
          successText: this.$t('pages.auth.sign.set-drag-verify-success-text'),
          background: '#eee',
          progressBarBg: '#909399',
          textSize: '10px'
        },
      }
    },
    mounted() {

    },
    methods: {
      showPwd() {
        if (this.passwordType === 'password') {
          this.passwordType = ''
        } else {
          this.passwordType = 'password'
        }
      },
      handleLogin(loginForm) {
        this.$refs[loginForm].validate(async (valid) => {
          if (valid) {
            this.isLoading = true;
            let { data } = await this.$axios.post(`/www/token/create`, {
              email: this.loginForm.email,
              password: this.loginForm.password,
            })
          } else {
            console.log('error submit!!');
            return false;
          }
          this.isLoading = false
        });
      }
    }
  }
</script>

<!-- ============================================================================ -->

<style lang="stylus">
  #auth-login
    .p-container
      min-height 80vh
    .title-form
      margin-left 36%
    .show-pwd
      position absolute
      right 110px
</style>
