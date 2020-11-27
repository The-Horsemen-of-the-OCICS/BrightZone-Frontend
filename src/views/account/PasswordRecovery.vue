<template>
  <div class="login-wrap">
    <div class="ms-login">
      <div class="ms-title">Password Recovery</div>

      <el-form :model="passwordRecoveryForm" :rules="rules" ref="passwordRecovery" label-width="0px" class="ms-content">
        <!--email-->
        <el-form-item prop="email">
          <el-input v-model="passwordRecoveryForm.email" placeholder="email">
            <el-button slot="prepend" icon="el-icon-lx-mail"></el-button>
            <el-button slot="append" icon="el-icon-lx-forward" @click="sendVerificationCode('passwordRecovery')">
              <el-popover
                  placement="top-start"
                  width="200"
                  trigger="hover"
                  content="Send verification code">
                <el-button slot="reference"></el-button>
              </el-popover>
            </el-button>
          </el-input>
        </el-form-item>

        <!--verificationCode-->
        <el-form-item prop="verificationCode">
          <el-input v-model="passwordRecoveryForm.verificationCode" placeholder="verificationCode">
            <el-button slot="prepend" icon="el-icon-lx-message"></el-button>
          </el-input>
        </el-form-item>

        <!--new password-->
        <el-form-item prop="newPassword">
          <el-input
              type="password"
              placeholder="new password"
              v-model="passwordRecoveryForm.newPassword"
          >
            <el-button slot="prepend" icon="el-icon-lx-lock"></el-button>
          </el-input>
        </el-form-item>

        <!--confirm password-->
        <el-form-item prop="confirmPassword">
          <el-input
              type="password"
              placeholder="confirm password"
              v-model="passwordRecoveryForm.confirmPassword"
          >
            <el-button slot="prepend" icon="el-icon-lx-lock"></el-button>
          </el-input>
        </el-form-item>

        <div class="login-btn">
          <el-button type="primary" @click="passwordRecovery('passwordRecovery')">Recover</el-button>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import qs from "qs";

export default {
  name: "PasswordRecovery",
  data: function () {
    const validateConfirmPassword = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('Please input password again'));
      } else if (value !== this.passwordRecoveryForm.newPassword) {
        callback(new Error('Passwords are inconsistent!'));
      } else {
        callback();
      }
    };
    return {
      passwordRecoveryForm: {
        email: '',
        verificationCode: '',
        newPassword: '',
        confirmPassword: '',
      },
      responseResult: {
        success: '',
        errMsg: '',
      },
      rules: {
        email: [
          {required: true, message: 'Please input email', trigger: 'blur'},
          {type: 'email', message: 'Please input correct email', trigger: ['blur', 'change']}
        ],
        verificationCode: [
          {required: true, message: 'Please input verificationCode', trigger: 'blur'},
        ],
        newPassword: [
          {required: true, message: 'Please input password', trigger: 'blur'},
        ],
        confirmPassword: [
          {required: true, message: 'Please input password', trigger: 'blur'},
          { validator: validateConfirmPassword, trigger: 'blur'}
        ],
      },
    };
  },
  methods: {
    sendVerificationCode(formName) {
      this.$refs[formName].validateField('email', error => {  // validate email in passwordRecoveryForm
        if (!error) {  // valid email
          axios.post('http://localhost:8080/api/account/sendVerificationCode', qs.stringify({'email': this.passwordRecoveryForm.email}),
              {headers: {'Content-Type': 'application/x-www-form-urlencoded'}})
              .then((resp) => {
                console.log(resp)
                this.responseResult.success = resp.data.success
                if (resp.data.success) {  // verification code sent success
                  this.$message({
                    showClose: true,
                    message: 'Verification code has been sent to your mail box!',
                    type: 'success',
                    duration: 6000,
                  });
                } else {  // verification code sent fail
                  this.responseResult.errMsg = resp.data.errMsg
                  this.$message({
                    showClose: true,
                    message: 'Error: ' + this.responseResult.errMsg,
                    type: 'error',
                    duration: 6000,
                  });
                }
              }).catch((err) => {
          })
        } else {  // invalid email
          this.$message({
            showClose: true,
            message: 'Warning: Please input valid email',
            type: 'warning'
          });
          return false
        }
      })
    },
    passwordRecovery(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {  // inputs are valid
          axios.post('http://localhost:8080/api/account/passwordRecovery', qs.stringify({
            'email': this.passwordRecoveryForm.email,
            'verificationCode': this.passwordRecoveryForm.verificationCode,
            'newPassword': this.passwordRecoveryForm.newPassword,
          }), {headers: {'Content-Type': 'application/x-www-form-urlencoded'}})
          .then((resp) => {
            console.log(resp)
            this.responseResult.success = resp.data.success;
            if (resp.data.success) {  // password recovery success
              this.$confirm('Password recovery success, do you want to go to login page?', 'Success', {
                confirmButtonText: 'Yes',
                cancelButtonText: 'No',
                type: 'success'
              }).then(() => {  // handle yes
                this.$router.push('/login');
              }).catch(() => {});
            } else {  // // password recovery fail
              this.responseResult.errMsg = resp.data.errMsg;
              this.$message({
                showClose: true,
                message: 'Error: ' + this.responseResult.errMsg,
                type: 'error',
                duration: 6000,
              });
            }
          }).catch((err) => {})
        } else {  // inputs are not valid
          this.$message({
            showClose: true,
            message: 'Warning: Please input valid information',
            type: 'warning'
          });
          return false
        }
      });
    },
  },
}
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
