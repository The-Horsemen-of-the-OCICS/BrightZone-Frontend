<template>
  <div>
    <div style="margin-top: 20px; margin-left: 10px; display: flex; justify-items: flex-end;">
      <el-select v-model="classSelection" filterable clearable placeholder="Select a class" @change="onChangeClass">
        <el-option
            v-for="item in classData"
            :key="item.classId"
            :label="item.classId"
            :value="item.classId">
        </el-option>
      </el-select>

      <el-select v-model="deliverableSelection" filterable clearable placeholder="Select a deliverable" @change="onChangeDeliverable">
        <el-option
            v-for="item in deliverableData"
            :key="item.deliverableId"
            :label="item.deliverableId"
            :value="item.deliverableId">
        </el-option>
      </el-select>
      <el-select v-model="submissionSelection" filterable clearable placeholder="Select a submission" @change="onChangeSubmission">
        <el-option
            v-for="item in submissionData"
            :key="item.submissionId"
            :label="item.submissionId"
            :value="item.submissionId">
        </el-option>
      </el-select>

    </div>


    <el-divider>Deliverable Info</el-divider>

    <el-form hide-required-asterisk	disabled label-width="100px" :model="deliverableForm"  ref="deliverableForm" class="deliverableForm" label-position="left">

      <el-form-item label="Description" prop="deliverableDesc">
        <el-input v-model="deliverableForm.deliverableDesc" placeholder="Please select a deliverable"></el-input>
      </el-form-item>

      <el-form-item label="Deadline" prop="deadLine">
        <el-input v-model="deliverableForm.deadLine" placeholder="Please select a deliverable"></el-input>
      </el-form-item>

      <el-form-item label="Weight" prop="percent">
        <el-input v-model="deliverableForm.percent" placeholder="Please select a deliverable"></el-input>
      </el-form-item>
    </el-form>

    <el-divider>Submission Info</el-divider>

    <div v-if=lateSubmission style="margin-bottom: 15px;">
      <el-alert
          title="This submission was made after the deadline!"
          type="warning"
          show-icon>
      </el-alert>
    </div>

    <el-form hide-required-asterisk label-width="100px" :model="submissionForm" :rules="rules" ref="submissionForm" class="submissionForm" label-position="left">

      <el-form-item label="Student ID" prop="studentId">
        <el-input v-model="submissionForm.studentId" placeholder="N/A" disabled></el-input>
      </el-form-item>

      <el-form-item label="Description" prop="submissionDesc">
        <el-input v-model="submissionForm.submissionDesc" placeholder="N/A" disabled></el-input>
      </el-form-item>

      <el-form-item label="File" prop="fileName" >
        <div style="display: flex;">
          <el-link v-bind:disabled="this.submissionForm.fileName === ''" v-bind:href="this.fileLink"><i class="el-icon-view el-icon--right"></i> View file here </el-link>
        </div>
      </el-form-item>

      <el-form-item label="Grade" prop="grade" >
        <el-input v-model="submissionForm.grade" placeholder="N/A" v-bind:disabled="(this.submissionForm.studentId === '')"></el-input>
      </el-form-item>

      <el-form-item>
        <div style="display: flex;">
          <el-button type="primary" @click="submitForm('deliverableForm')">Update</el-button>
          <el-button @click="resetForm('deliverableForm')">Reset</el-button>
        </div>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "EvaluateSubmission",
  created() {
    const _this = this;
    axios.get('http://localhost:8080/getAllClass/2000006').then(function (resp) {
      _this.classData = resp.data;
    })
  },
  data() {
    var validateGrade = (rule, value, callback) => {
      if (!value || value === '') {
        callback(new Error('Please enter a grade'));
      } else if (value > 1 || value < 0) {
        callback(new Error('Please enter a grade between 0 and 1'));
      } else {
        callback();
      }
    };
    return {
      classSelection: '',
      deliverableSelection: '',
      curDeadline: '',
      submissionSelection: '',
      lateSubmission: false,
      fileLink: '',
      classData: [
      ],
      deliverableData: [
      ],
      submissionData:[
      ],
      deliverableForm: {
        deadLine: '',
        deliverableDesc: '',
        percent: '',
      },
      submissionForm: {
        submissionId: '',
        studentId: '',
        submitTime:'',
        submissionDesc: '',
        fileName: '',
        grade: '',
      },
      rules: {
        grade: [
          { required: true, validator: validateGrade }
        ],
      },
    }
  },
  methods: {
    onChangeClass(classId) {
      this.resetForm('deliverableForm');
      this.resetForm('submissionForm');
      this.submissionSelection = '';
      this.deliverableSelection = '';
      if (classId && classId !== '') {
        const _this = this;
        this.deliverableSelection = '';
        this.deliverableData = [];
        axios.get('http://localhost:8080/getAllDeliverables/' + classId).then(function (resp) {
          _this.deliverableData = resp.data;
        })
      }
    },
    onChangeDeliverable(deliverableId) {
      this.submissionSelection = '';
      this.resetForm('submissionForm');
      if (deliverableId && deliverableId !== '') {
        const _this = this;
        const curDeli = this.deliverableData.find(element => element.deliverableId === deliverableId)
        if (curDeli) {
          this.deliverableForm.deliverableDesc = curDeli.deliverableDesc
          this.deliverableForm.deadLine = curDeli.deadLine
          this.deliverableForm.percent = curDeli.percent
          this.curDeadline = curDeli.deadLine;
        } else {
          this.resetForm('deliverableForm');
        }
        axios.get('http://localhost:8080/getAllSubmission/' + deliverableId).then(function (resp) {
          _this.submissionData = resp.data;
        });
      }
    },
    onChangeSubmission(submissionId) {
      if (submissionId && submissionId !== '') {
        const curSub = this.submissionData.find(element => element.submissionId === submissionId)
        if (curSub) {
          this.submissionForm.submissionId = curSub.submissionId;
          this.submissionForm.submissionDesc = curSub.submissionDesc;
          this.submissionForm.submitTime = curSub.submitTime;
          this.submissionForm.studentId = curSub.studentId;
          this.submissionForm.fileName = curSub.fileName;
          this.submissionForm.grade = curSub.grade;
          this.fileLink = "https://localhost:8080/" + curSub.fileName;
          this.lateSubmission =  (curSub.submitTime >= this.curDeadline);
        }
      }
    },
    submitForm(formName) {
      const _this = this
      this.$refs[formName].validate((valid) => {
        if (valid) {
          const msg = ('You are going to update the grade for submission # ' + this.submissionForm.submissionId + '.')
          this.$confirm(msg, 'Warning', {
            confirmButtonText: 'Confirm',
            cancelButtonText: 'Cancel',
            type: 'warning'
          }).then(() => {
            const url = 'http://localhost:8080/submitGrade/' + this.submissionForm.submissionId + '/' + this.submissionForm.grade;
            console.log(url);

            axios.post(url).then(function (resp) {
              if (resp.data === 'SUCCEED') {
                _this.$message({
                  type: 'success',
                  message: 'Update Successfully!'
                });
                _this.submissionData.find(s => s.submissionId === _this.submissionForm.submissionId).grade = _this.submissionForm.grade;
              } else {
                _this.$message.error('Database Error! Failed to update.');
              }
            })
          }).catch(() => {
            this.$message({
              type: 'info',
              message: 'Update Cancelled'
            });
          });
        } else {
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$nextTick(()=> {
        if (this.$refs[formName] !== undefined) {
          this.$refs[formName].resetFields();
          this.fileLink = '';
          this.lateSubmission = false;
        }
      })
    }
  }
}
</script>

<style scoped>

</style>