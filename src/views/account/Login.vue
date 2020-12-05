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
        <a class="passwordRecovery" href="http://localhost:8181/passwordRecovery" target="_blank">forget password?</a>
        <div class="register-btn">
          <el-button type="primary" @click="register()">Or Register</el-button>
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
        userId: '',  // consistent with field <userId> in database, account's userId
        name: '',  // account's name
        type: '',  // account's type (student, professor, admin, teaching_assistant)
        email: '', // account's email
        lastLogin: '', // last login time of account
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
                  this.loginResult.success = true;
                  this.loginResult.userId = resp.data.userId;
                  this.loginResult.name = resp.data.name;
                  this.loginResult.type = resp.data.accountType;
                  this.loginResult.email = resp.data.email;
                  this.loginResult.lastLogin = resp.data.lastLogin;
                  this.$message({
                    showClose: true,
                    message: 'Login Success!',
                    type: 'success'
                  });
                  this.$store.commit('login', {
                    'userId': this.loginResult.userId,
                    'name': this.loginResult.name,
                    'type': this.loginResult.type,
                    'email': this.loginResult.email,
                    'lastLogin': this.loginResult.lastLogin,
                  })
                  switch (this.loginResult.type) {
                    case 'administrator':
                      this.$router.push('/admin');
                      break;
                    case 'professor':
                      this.$router.push('/professor');
                      break;
                    case 'student':
                      this.$router.push('/student');
                      break;
                    case 'teaching_assistant':
                      this.$router.push('/mock/index');
                      break;
                    default:
                  }
                } else {  // login fail
                  this.loginResult.success = false;
                  this.loginResult.errMsg = resp.data.errMsg;
                  this.$message({
                    showClose: true,
                    message: 'Error: ' + this.loginResult.errMsg,
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
    register() {
      this.$router.push('/register');
    }
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

.passwordRecovery {
  margin-top: 5px;
  margin-bottom: 10px;
  font-size: 14px;
  color: red;
  float: left;
  text-decoration:underline;
}

.register-btn {
  float: right;
  margin-bottom: 10px;
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
