<template>
  <div class="app-container">
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>
          <i class="el-icon-lx-profile"></i> Profile
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div v-if="account">
      <el-row :gutter="20">
        <!--on the left: user card with basic information-->
        <el-col :span="9" :xs="24">
          <user-card :account="account"/>
        </el-col>

        <!--on the right: form with email and password-->
        <el-col :span="15" :xs="24">
          <el-card>
            <el-form :model="emailAndPasswordForm" :rules="rules" ref="emailAndPassword">
              <!--email-->
              <el-form-item label="Email" prop="email">
                <el-input v-model="emailAndPasswordForm.email">
                  <el-button type="primary" slot="append" @click="updateEmail('emailAndPassword')" icon="el-icon-edit" style="color: cornflowerblue">
                    update
                  </el-button>
                </el-input>
              </el-form-item>
              <!--password-->
              <el-form-item label="Password" prop="password">
                <el-input v-model="emailAndPasswordForm.password">
                  <el-button type="primary" slot="append" @click="updatePassword('emailAndPassword')" icon="el-icon-edit" style="color: cornflowerblue">
                    update
                  </el-button>
                </el-input>
              </el-form-item>
            </el-form>
          </el-card>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import UserCard from './UserCard'
import axios from "axios";
import qs from "qs";

export default {
  name: 'Profile',
  components: {UserCard},
  data() {
    return {
      emailAndPasswordForm: {
        email: '',
        password: '',
      },
      account: {
        userId: this.$store.state.account.userId,
        name: this.$store.state.account.name,
        type: this.$store.state.account.type,
        faculty: 'MockFaculty',
        program: 'MockProgram',
        accountStatus: 'MockStatus',
        email: 'MockEmail',
        password: 'MockPassword',
      },
      faculties: [],
      activeTab: 'activity',
      rules: {
        email: [
          {required: true, message: 'Please input email', trigger: 'blur'},
          {type: 'email', message: 'Please input correct email', trigger: ['blur', 'change']}
        ],
        password: [
          {required: true, message: 'Please input password', trigger: 'blur'},
        ],
      },
    }
  },
  created() {
    // window.location.reload();  // 让前端页面动态刷新,相当于重定向
    axios.get('http://localhost:8080/admin/account/getAllFaculties').then((resp) => {
      this.faculties = resp.data
    }).catch((err) => {})

    axios.get('http://localhost:8080/admin/account/getAccount/' + this.account.userId).then((resp) => {
      this.account.accountStatus = resp.data.accountStatus;
      this.emailAndPasswordForm.email = resp.data.email;
      this.emailAndPasswordForm.password = resp.data.password;
      this.account.program = resp.data.program;
      // console.log('program:' + this.account.program)
      this.account.faculty = this.faculties.find(faculty => faculty.facultyId === resp.data.facultyId).facultyName;
      // console.log('faculty:' + this.account.faculty)
    }).catch((err) => {})
  },
  methods: {
    updateEmail(formName) {
      this.$refs[formName].validateField('email', error => {  // validate email in emailAndPasswordForm
        if (!error) {  // valid email
          axios.post('http://localhost:8080//api/account/updateEmail', qs.stringify({'email': this.emailAndPasswordForm.email}),
              {headers: {'Content-Type': 'application/x-www-form-urlencoded'}})
              .then((resp) => {
                if (resp.data.success) {
                  this.$message({
                    showClose: true,
                    message: 'Update Email Success!',
                    type: 'success'
                  });
                } else {
                  this.$message({
                    showClose: true,
                    message: 'Error: ' + resp.data.errMsg,
                    type: 'error'
                  });
                }
              }).catch((err) => {})
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

    updatePassword(formName) {
      this.$refs[formName].validateField('password', error => {  // validate password in emailAndPasswordForm
        if (!error) {  // valid password
          axios.post('http://localhost:8080/api/account/updatePassword', qs.stringify({'password': this.emailAndPasswordForm.password}),
              {headers: {'Content-Type': 'application/x-www-form-urlencoded'}})
              .then((resp) => {
                console.log(resp)
                if (resp.data.success) {
                  this.$message({
                    showClose: true,
                    message: 'Update Password Success!',
                    type: 'success'
                  });
                } else {
                  this.$message({
                    showClose: true,
                    message: 'Error: ' + resp.data.errMsg,
                    type: 'error'
                  });
                }
              }).catch((err) => {})
        } else {  // invalid password
          this.$message({
            showClose: true,
            message: 'Warning: Please input valid password',
            type: 'warning'
          });
          return false
        }
      })
    }
  }
}
</script>
