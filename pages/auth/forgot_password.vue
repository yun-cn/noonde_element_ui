<template lang="pug">
  #auth-forgot-password
    c-public-header

    div.u-col-center-middle.p-container
      el-card(style="width:690px")
        div(slot="header")
          h3.title-form {{ $t('pages.auth.forgot-password.forgot-password-title') }}

        div
          p.show-error-message {{ messageError }}
        el-form(:model="forgotPasswordForm" ref="forgotPasswordForm" :rules="forgotPasswordRules" label-width="150px" label-positiob="left" )

          el-form-item(:label="$t('pages.auth.forgot-password.email')" prop="email")
            el-input(v-model="forgotPasswordForm.email" type="text" auto-complete="off" style="width:320px")
            el-button.send-code-btn(type="primary" round @click="sendCode('forgotPasswordForm')" :disabled="isDisabled" plain) {{ buttonSendCode }}


          el-form-item(:label="$t('pages.auth.forgot-password.code')" prop="code")
            el-input(v-model="forgotPasswordForm.code" name="code" type="text" auto-complete="off" style="width:320px")

          el-form-item(:label="$t('pages.auth.forgot-password.new-password')" prop="password")
            el-input(v-model="forgotPasswordForm.password" name="password" type="password" auto-complete="off" style="width:320px")

          el-form-item(:label="$t('pages.auth.forgot-password.new-confirm-password')" prop="checkPassword")
            el-input(v-model="forgotPasswordForm.checkPassword" name="confirmPassword" type="password" auto-complete="off" style="width:320px")

          el-form-item
            el-button(:loading="isLoading" type="primary" style="width:200px;margin-right:30px; margin-top: 15px" @click="submitForm('forgotPasswordForm')") {{ $t('pages.auth.forgot-password.btn-update-pass') }}

</template>

<!-- ============================================================================ -->
<script>
  export default {
    name: 'ForgotPassword',
    data() {
      const validatePassword = (rule, value, callback) => {
        if (value === '') {
          callback(new Error(this.$t('pages.auth.forgot-password.input-password-form')))
        } else {
          if (this.forgotPasswordForm.checkPassword !== '') {
            this.$refs.forgotPasswordForm.validateField('checkPassword');
          }
          callback()
        }
      };
      const validateCheckPassword = (rule, value, callback) => {
        if (value === '') {
          callback(new Error(this.$t('pages.auth.forgot-password.input-password-form')))
        } else if (value != this.forgotPasswordForm.password) {
          callback(new Error(this.$t('pages.auth.forgot-password.different-of-password')))
        } else {
          callback()
        }
      };
      return {
        forgotPasswordForm: {
         email: null,
         code: null,
         password: '',
         checkPassword: '',
        },
        buttonSendCode:  this.$t('pages.auth.forgot-password.send-code') ,
        isDisabled: false,
        time: 60,
        isLoading: false,
        messageError: null,
        showError: false,
        forgotPasswordRules: {
          email: [
            { required: true, message: this.$t('pages.auth.forgot-password.input-email-form'), trigger: 'blur' },
            { type: 'email', message: this.$t('pages.auth.forgot-password.validate-email-form'), trigger: ['blur', 'change'] }
          ],
          code: [
            { required: true, message: this.$t('pages.auth.forgot-password.input-code-form')},
            { min: 1, max: 20, message: this.$t('pages.auth.forgot-password.validate-code-form'), trigger: 'blur' }
          ],
          password: [
            { required: true, trigger: 'blur', validator: validatePassword },
            { min: 6, max: 16, message: this.$t('pages.auth.forgot-password.validate-password-form'), trigger: 'blur' }
          ],
          checkPassword: [
            { required: true, trigger: 'blur', validator: validateCheckPassword },
            { min: 6, max: 16, message: this.$t('pages.auth.forgot-password.validate-password-form'), trigger: 'blur' }
          ],
       }
      }
    },
    mounted() {
    },
    methods: {
      sendCode(forgotPasswordForm) {
        this.$refs[forgotPasswordForm].validateField('email', async (valid) => {
            if (!valid) {
              this.showError = false;
              this.messageError = null;
              try {
                let { data } = await this.$axios.post(`/www/user/send_code`, {
                  email: this.forgotPasswordForm.email
                });
              } catch (error) {
                if (error.response && error.response.data && error.response.data.detail) {
                  let detail = error.response.data.detail;
                  if (detail.email && detail.email.code == 'P00005') {
                    this.showError = true;
                    this.messageError = this.$t('pages.auth.forgot-password.error-email-empty')
                    this.$refs[forgotPasswordForm].resetFields();
                  }
                }
              }
            } else {
              console.log("error submit");
            }
        })
        // let context = this;
        // context.isDisabled = true;
        // let interval = window.setInterval(function() {
        //   context.buttonSendCode = context.time + context.$t('pages.auth.forgot-password.reissue-after-minutes');
        //   --context.time;
        //   if(context.time < 0) {
        //     context.buttonSendCode = context.$t('pages.auth.forgot-password.resend');
        //     context.time = 60;
        //     context.isDisabled = false;
        //     window.clearInterval(interval);
        //   }
        // }, 1000);
      },

      submitForm(formName) {
        this.$refs[formName].validate(async (valid) => {
          if (valid) {
            try {
              this.showError = false;
              this.messageError = null;
              let { data } = await this.$axios.post(`/www/user/reset_password`, {
                email: this.forgotPasswordForm.email,
                code: this.forgotPasswordForm.code,
                password: this.forgotPasswordForm.password,
              });
              if (data.code == 'S00200') {
                this.$message('这是一条消息提示');
              }
            } catch (error) {
              if (error.response && error.response.data && error.response.data.detail) {
                let detail = error.response.data.detail;
                if (detail.email && detail.email.code == 'P00005') {
                  this.showError = true;
                  this.messageError = this.$t('pages.auth.forgot-password.error-email-empty')
                  this.$refs[formName].resetFields();
                } else if (detail.code  && detail.code.code == 'P00007') {
                  this.showError = true;
                  this.messageError = this.$t('pages.auth.forgot-password.please-send-code')
                  this.$refs[formName].resetFields();
                } else if (detail.codeExp && detail.codeExp.code == 'P00008') {
                  this.showError = true;
                  this.messageError = this.$t('pages.auth.forgot-password.exp-created-code')
                  this.$refs[formName].resetFields();
                }
              }
            }
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      }
    }
  }
</script>

<!-- ============================================================================ -->

<style lang="stylus">
  #auth-forgot-password
    .p-container
      min-height 80vh
    .title-form
      margin-left 36%
    .show-error-message
      margin-left 25%
      margin-bottom 20px
      color #ff5205
    .send-code-btn
      position absolute
      right 10px
</style>
