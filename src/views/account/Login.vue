<template>
  <div class="login-container">
    <el-form ref="loginForm" :model="loginForm" :rules="loginRules" class="login-form" autocomplete="on" label-position="left">

      <div class="title-container">
        <h3 class="title">CMS Login</h3>
      </div>

      <el-form-item prop="email">
        <span class="svg-container">
          <i class="el-icon-user"></i>
        </span>
        <el-input
            ref="email"
            v-model="loginForm.email"
            placeholder="Email"
            name="email"
            type="text"
            tabindex="1"
            autocomplete="on"
        />
      </el-form-item>

      <el-tooltip v-model="capsTooltip" content="Caps lock is On" placement="right" manual>
        <el-form-item prop="password">
          <span class="svg-container">
            <i class="el-icon-lock"></i>
          </span>
          <el-input
              :key="passwordType"
              ref="password"
              v-model="loginForm.password"
              :type="passwordType"
              placeholder="Password"
              name="password"
              tabindex="2"
              autocomplete="on"
              @keyup.native="checkCapslock"
              @blur="capsTooltip = false"
              @keyup.enter.native="handleLogin"
          />
          <span class="show-pwd" @click="showPwd">
            <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />
          </span>
        </el-form-item>
      </el-tooltip>

      <el-button :loading="loading" type="primary" style="width:100%;margin-bottom:30px;" @click.native.prevent="handleLogin">Login</el-button>

    </el-form>
  </div>
</template>

<script>
import axios from 'axios';
import qs from 'qs'
export default {
  name: 'Login',
  data() {
    return {
      loginForm: {
        email: '',
        password: '',
      },
      loginRules: {
        email: [
          { required: true, message: 'Please input email', trigger: 'blur' },
          { type: 'email', message: 'Please input correct email', trigger: ['blur', 'change'] }
        ],
        password: [
          { required: true, message: 'Please input password', trigger: 'blur' },
        ],
      },
      loginResult: {
        success: '',
        errMsg: '',
        account: '',
      },
      passwordType: 'password',
      capsTooltip: false,
      loading: false,
      showDialog: false,
      redirect: undefined,
      otherQuery: {}
    }
  },
  created() {
    console.log('just entering login page, this.redirect=' + this.redirect)
  },
  methods: {
    checkCapslock(e) {
      const { key } = e
      this.capsTooltip = key && key.length === 1 && (key >= 'A' && key <= 'Z')
    },
    showPwd() {
      if (this.passwordType === 'password') {
        this.passwordType = ''
      } else {
        this.passwordType = 'password'
      }
      this.$nextTick(() => {
        this.$refs.password.focus()
      })
    },
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true
          axios.post('http://localhost:8080/api/account/login', qs.stringify(this.loginForm),
              {headers: {'Content-Type': 'application/x-www-form-urlencoded'}})
              .then(resp => {
                console.log(resp)
                this.loading = false
                if (resp.data.success) {  // login success
                  this.$message({
                    showClose: true,
                    message: 'Login Success!',
                    type: 'success'
                  });
                  switch (resp.data.account.type) {
                    case 'administrator':
                      // TODO: add url of admin index page
                      this.$alert('Please add url of admin index page in Login.vue', 'Login Success', {
                        confirmButtonText: 'Confirm',
                      });
                      break;
                    case 'professor':
                      // TODO: add url of professor index page
                      this.$alert('Please add url of professor index page in Login.vue', 'Login Success', {
                        confirmButtonText: 'Confirm',
                      });
                      break;
                    case 'student':
                      // TODO: add url of student index page
                      this.$alert('Please add url of student index page in Login.vue', 'Login Success', {
                        confirmButtonText: 'Confirm',
                      });
                      break;
                    case 'teaching_assistant':
                      // TODO: add url of teaching_assistant index page
                      this.$alert('Please add url of teaching_assistant index page in Login.vue', 'Login Success', {
                        confirmButtonText: 'Confirm',
                      });
                      break;
                    default:
                  }
                } else {  // login fail
                  this.$message({
                    showClose: true,
                    message: 'Error: ' + resp.data.errMsg,
                    type: 'error'
                  });
                }
              }).catch(err => {})
          // this.$store.dispatch('user/login', this.loginForm)
          //   .then(() => {
          //     this.$router.push({ path: this.redirect || '/', query: this.otherQuery })
          //     this.loading = false
          //   })
          //   .catch(() => {
          //     this.loading = false
          //   })
        } else {
          this.$message({
            showClose: true,
            message: 'Warning: Please input valid email and password',
            type: 'warning'
          });
          return false
        }
      })
    },
  }
}
</script>

<style lang="scss">
@import "src/styles/index";
@import "~normalize.css";

/* 修复input 背景不协调 和光标变色 */
/* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

$bg:#283443;
$light_gray:#fff;
$cursor: #fff;

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .login-container .el-input input {
    color: $cursor;
  }
}

/* reset element-ui css */
.login-container {
  .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;

    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: $light_gray;
      height: 47px;
      caret-color: $cursor;

      &:-webkit-autofill {
        box-shadow: 0 0 0px 1000px $bg inset !important;
        -webkit-text-fill-color: $cursor !important;
      }
    }
  }

  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    color: #454545;
  }
}
</style>

<style lang="scss" scoped>
$bg:#2d3a4b;
$dark_gray:#889aa4;
$light_gray:#eee;

.login-container {
  min-height: 100%;
  width: 100%;
  background-color: $bg;
  overflow: hidden;
  text-align: left;

  .login-form {
    position: relative;
    width: 520px;
    max-width: 100%;
    padding: 160px 35px 0;
    margin: 0 auto;
    overflow: hidden;
  }

  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;

    span {
      &:first-of-type {
        margin-right: 16px;
        //float: left;
      }
    }
  }

  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }

  .title-container {
    position: relative;

    .title {
      font-size: 26px;
      color: $light_gray;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
  }

  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }

  .thirdparty-button {
    position: absolute;
    right: 0;
    bottom: 6px;
  }

  @media only screen and (max-width: 470px) {
    .thirdparty-button {
      display: none;
    }
  }
}
</style>
