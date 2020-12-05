<template>
  <div>
    <el-card>
    <div style="margin-bottom: 10px; display: flex; justify-items: flex-end;">
      <el-select v-model="classSelection" filterable placeholder="Select a class" @change="onChangeClass">
        <el-option
            v-for="item in classData"
            :key="item.classId"
            :label="item.classId"
            :value="item.classId">
        </el-option>
      </el-select>

      <el-select v-model="deliverableSelection" filterable placeholder="Select a deliverable" @change="onChangeDeliverable">
        <el-option
            v-for="item in deliverableData"
            :key="item.deliverableId"
            :label="item.deliverableId"
            :value="item.deliverableId">
        </el-option>
      </el-select>

      <el-select v-model="submissionSelection" filterable placeholder="Select a submission" @change="onChangeSubmission">
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

      <el-form-item label="Submit Time" prop="submitTime">
        <el-input v-model="submissionForm.submitTime" placeholder="N/A" disabled></el-input>
      </el-form-item>

      <el-form-item label="Student ID" prop="studentId">
        <el-input v-model="submissionForm.studentId" placeholder="N/A" disabled></el-input>
      </el-form-item>

      <el-form-item label="Description" prop="submissionDesc">
        <el-input v-model="submissionForm.submissionDesc" placeholder="N/A" disabled></el-input>
      </el-form-item>

      <el-form-item label="File" prop="fileName" >
        <div style="display: flex;">
          <el-link v-bind:disabled="this.submissionForm.fileName === ''" @click="downloadSubmissionFile"><i class="el-icon-view el-icon--right"></i> View file here </el-link>
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
    </el-card>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "EvaluateSubmission",
  created() {
    const _this = this;
    axios.get('http://localhost:8080/getAllClass/' + this.$parent.$data.userId).then(function (resp) {
      _this.classData = resp.data;
    });

    const query = this.$route.query;
    console.log(query);
    if (Object.keys(query).length !== 0 && this.classSelection === '') {
      axios.get('http://localhost:8080/getAllDeliverables/' + query.classId).then(function (resp) {
        _this.deliverableData = resp.data;
      })
      axios.get('http://localhost:8080/getAllSubmission/' + query.deliverableId).then(function (resp) {
        _this.submissionData = resp.data;
      })

      this.classSelection = query.classId;
      this.deliverableSelection = query.deliverableId;
      this.deliverableForm.deliverableDesc = query.deliverableDesc;
      this.deliverableForm.deadLine = query.deadLine;
      this.deliverableForm.percent = query.percent;
      console.log(this.deliverableForm);

      this.submissionSelection = query.submissionId;
      this.submissionForm.grade = query.grade;
      this.submissionForm.studentId = query.studentId;
      this.submissionForm.fileName = query.fileName;
      this.submissionForm.submissionDesc = query.submissionDesc;
      this.submissionForm.submitTime = query.submitTime;
      this.submissionForm.submissionId = query.submissionId;
      console.log(this.submissionForm);


    }
  },
  data() {
    var validateGrade = (rule, value, callback) => {
      if (value && value !== '' && (value > 1 || value < 0)) {
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
      this.resetForm('submissionForm');
      if (deliverableId && deliverableId !== '') {
        const _this = this;
        const curDeli = this.deliverableData.find(element => element.deliverableId === deliverableId)
        if (curDeli) {
          this.deliverableForm.deliverableDesc = curDeli.deliverableDesc
          this.deliverableForm.deadLine = curDeli.deadLine
          this.deliverableForm.percent = curDeli.percent
          this.curDeadline = curDeli.deadLine;
        }
        axios.get('http://localhost:8080/getAllSubmission/' + deliverableId).then(function (resp) {
          _this.submissionData = resp.data;
        });
      }
    },
    validGrade() {
      return (this.submissionForm.grade && this.submissionForm.grade !== '' && this.submissionForm.grade <= 1 && this.submissionForm.grade >= 0)
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
          this.lateSubmission =  (curSub.submitTime >= this.curDeadline);
        }
      }
    },
    submitForm(formName) {
      const _this = this
      this.$refs[formName].validate((valid) => {
        if (valid && _this.validGrade()) {
          this.submissionForm.grade = (!this.submissionForm.grade || this.submissionForm.grade === '') ? 0 : this.submissionForm.grade;
          const msg = ('You are going to update the grade for submission # ' + this.submissionForm.submissionId + ' to ' + this.submissionForm.grade)
          this.$confirm(msg, 'Warning', {
            confirmButtonText: 'Confirm',
            cancelButtonText: 'Cancel',
            type: 'warning'
          }).then(() => {
            const url = 'http://localhost:8080/submitGrade/' + this.submissionForm.submissionId + '/' + this.submissionForm.grade;
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
        if (formName === 'deliverableForm') {
          this.deliverableSelection = '';
          this.deliverableForm.deliverableDesc = '';
          this.deliverableForm.deadLine = '';
          this.deliverableForm.percent = '';
        }

        this.submissionForm.grade = '';
        this.submissionForm.studentId = '';
        this.submissionForm.fileName = '';
        this.submissionForm.submissionDesc = '';
        this.submissionForm.submitTime = '';
        this.submissionSelection = '';
        this.lateSubmission = false;
      })
    },
    downloadSubmissionFile() {
      const a = document.createElement('a')
      const timestamp = Date.parse(this.submissionForm.submitTime)
      a.download = fileName
      a.href = 'http://localhost:8080/getGetSubmissionFile/' + this.classSelection + '/'+ this.deliverableSelection + '/' + this.submissionForm.studentId  + '/'+ timestamp + '/' + this.submissionForm.fileName;
      a.click();
    },
  }
}
</script>

<style scoped>

</style>