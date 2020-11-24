<template>
  <div class="login-wrap">
    <div class="ms-login">
      <div class="ms-title">Course Management System</div>
      <el-form :model="loginForm" :rules="rules" ref="login" label-width="0px" class="ms-content">
        <el-form-item prop="email">
          <el-input v-model="loginForm.email" placeholder="email">
            <el-button slot="prepend" icon="el-icon-lx-people"></el-button>
          </el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
              type="password"
              placeholder="password"
              v-model="loginForm.password"
              @keyup.enter.native="login()"
          >
            <el-button slot="prepend" icon="el-icon-lx-lock"></el-button>
          </el-input>
        </el-form-item>
        <div class="login-btn">
          <el-button type="primary" @click="login()">Login</el-button>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import qs from 'qs'

export default {
  data: function () {
    return {
      loginForm: {
        email: '',
        password: '',
      },
      loginResult: {
        success: '',
        errMsg: '',
        account: '',
      },
      rules: {
        email: [
          {required: true, message: 'Please input email', trigger: 'blur'},
          {type: 'email', message: 'Please input correct email', trigger: ['blur', 'change']}
        ],
        password: [
          {required: true, message: 'Please input password', trigger: 'blur'},
        ],
      },
    };
  },
  methods: {
    login() {
      this.$refs.login.validate(valid => {
        if (valid) {
          axios.post('http://localhost:8080/api/account/login', qs.stringify(this.loginForm),
              {headers: {'Content-Type': 'application/x-www-form-urlencoded'}})
              .then(resp => {
                console.log(resp)
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
              }).catch(err => {
          })
        } else {
          this.$message({
            showClose: true,
            message: 'Warning: Please input valid email and password',
            type: 'warning'
          });
          return false
        }
      });
    },
  },
};
</script>

<style scoped>
@import "../../assets/css/main.css";
@import "../../assets/css/color-dark.css";

.el-form >>> .el-form-item__error {
  color: black;
}

.login-wrap {
  position: relative;
  width: 100%;
  height: 100%;
  background-image: url(../../assets/img/login-bg.jpg);
  background-size: 100%;
}

.ms-title {
  width: 100%;
  line-height: 50px;
  text-align: center;
  font-size: 20px;
  color: black;
  border-bottom: 1px solid #ddd;
}

.ms-login {
  position: absolute;
  left: 50%;
  top: 50%;
  width: 350px;
  margin: -190px 0 0 -175px;
  border-radius: 5px;
  background: rgba(255, 255, 255, 0.3);
  overflow: hidden;
}

.ms-content {
  padding: 30px 30px;
}

.login-btn {
  text-align: center;
}

.login-btn button {
  width: 100%;
  height: 36px;
  margin-bottom: 10px;
}

.login-tips {
  font-size: 12px;
  line-height: 30px;
  color: #fff;
}
</style>
