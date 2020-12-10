<template>
  <div>
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item><i class="el-icon-lx-edit"></i> Create Request</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="container">
      <div class="plugins-tips">
        Hello, Create your request message to CMS administrator
      </div>

      <el-form ref="requestForm" :model="requestForm" :rules="rules" label-width="80px">
        <!--request author-->
        <el-form-item label="Author">
          <el-input v-model="requestForm.author" readonly></el-input>
        </el-form-item>

        <!--request type-->
        <el-form-item label="Type" style="text-align: left" prop="type">
          <el-select v-model="requestForm.type" placeholder="Request type">
            <el-option label="Enroll" value="enroll"></el-option>
            <el-option label="Drop" value="drop"></el-option>
            <el-option label="CreateCourse" value="create_course"></el-option>
            <el-option label="CancelCourse" value="cancel_course"></el-option>
            <el-option label="AssignProfessor" value="assign_prof"></el-option>
          </el-select>
        </el-form-item>

        <!--request content-->
        <el-form-item label="Content" prop="message">
          <el-input
              type="textarea"
              placeholder="Please write down your request here"
              v-model="requestForm.message"
              maxlength="250"
              show-word-limit
          >
          </el-input>
        </el-form-item>

        <el-form-item>
          <el-button class="editor-btn" type="primary"
                     @click="submit('requestForm')">Submit
          </el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import qs from "qs";

export default {
  name: 'CreateRequest',
  data: function () {
    return {
      requestForm: {
        author: this.$store.state.account.name,
        type: '',
        message: '',
      },
      responseResult: {
        success: '',
        errMsg: '',
      },
      rules: {
        type: [  // requestForm.type
          {required: true, message: 'Please select request type', trigger: 'change'},
        ],
        message: [  // requestForm.content
          {required: true, message: 'Please input request message', trigger: 'blur'},
          {max: 250, message: 'Up to 250 characters', trigger: 'blur'}
        ],
      }
    }
  },
  methods: {
    submit(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          axios.post('http://localhost:8080/api/account/createRequest',
              qs.stringify({'message': this.requestForm.message, 'type': this.requestForm.type}))
              .then((resp) => {
                if (resp.data.success) {
                  this.responseResult.success = true;
                  this.$message({
                    showClose: true,
                    message: 'Request message has been sent to administrator!',
                    type: 'success',
                    duration: 6000,
                  });
                } else {
                  console.log(resp)
                  this.responseResult.success = false;
                  this.responseResult.errMsg = resp.data.errMsg;
                  this.$message({
                    showClose: true,
                    message: 'Error: ' + this.responseResult.errMsg,
                    type: 'error',
                    duration: 6000,
                  });
                }
              }).catch((err) => {
          })
        } else {  // invalid inputs
          this.$message({
            showClose: true,
            message: 'Warning: Please input valid request type or message',
            type: 'warning'
          });
          return false
        }
      });
    }
  }
}
</script>
<style scoped>
.editor-btn {
  margin-top: 20px;
}
</style>
