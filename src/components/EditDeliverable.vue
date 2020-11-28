<template>
  <el-card>
  <div style="width: 500px">
      <el-form hide-required-asterisk	label-width="100px" :model="deliverableForm" :rules="rules" ref="deliverableForm" class="deliverableForm" label-position="left">

        <el-form-item label="Class ID" prop="classId" >
          <div style="display: flex;">
          <el-select v-model="deliverableForm.classId" filterable placeholder="Select a class" @change="onChangeClass">
            <el-option
                v-for="item in classData"
                :key="item.classId"
                :label="item.classId"
                :value="item.classId">
            </el-option>
          </el-select>
          </div>
        </el-form-item>

        <el-form-item label="Deliverable ID" prop="deliverableId" ref="idField" >
          <div style="display: flex; margin-left: -10px">
          <el-select v-model="deliverableForm.deliverableId" filterable clearable placeholder="New deliverable" @change="onChangeDeliverable" style="margin-left: 10px">
            <el-option
                v-for="item in deliverableData"
                :key="item.deliverableId"
                :label="item.deliverableId"
                :value="item.deliverableId">
            </el-option>
          </el-select>
          </div>
        </el-form-item>

        <el-form-item label="Description" prop="deliverableDesc" ref="descField">
          <el-input v-model="deliverableForm.deliverableDesc" placeholder="Please enter a description"></el-input>
        </el-form-item>

        <el-form-item label="Deadline">
          <el-col :span="11">
            <el-form-item prop="deadlineDate" ref="dateField">
              <el-date-picker value-format="yyyy-MM-dd" v-model="deliverableForm.deadlineDate" type="date" placeholder="Select Date" style="width: 100%;"></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col class="line" :span="2">-</el-col>
          <el-col :span="11">
            <el-form-item prop="deadlineTime" ref="timeField">
              <el-time-picker value-format="HH:mm:ss" v-model="deliverableForm.deadlineTime" placeholder="Select Time" style="width: 100%;"></el-time-picker>
            </el-form-item>
          </el-col>
        </el-form-item>

        <el-form-item label="Weight" prop="percent" ref="weightField">
          <el-input type="number" v-model="deliverableForm.percent" placeholder="Please enter a weight"></el-input>
        </el-form-item>
        <el-form-item>
          <div style="display: flex;">
            <el-button type="primary" @click="submitForm('deliverableForm')">Update</el-button>
            <el-button @click="resetForm('deliverableForm')">Reset</el-button>
          </div>
        </el-form-item>
      </el-form>
    </div>
  </el-card>
</template>

<script>
import axios from "axios";

export default {
  name: "EditDeliverable",
  created() {
    const _this = this;
    axios.get('http://localhost:8080/getAllClass/' + this.$parent.$data.userId).then(function (resp) {
      _this.classData = resp.data;
    })

    const query = this.$route.query;

    if (Object.keys(query).length >= 1 && this.deliverableForm.classId === '') {
      this.resetForm('deliverableForm')
      this.deliverableForm.classId = query.classId;
      axios.get('http://localhost:8080/getAllDeliverables/' + query.classId).then(function (resp) {
        _this.deliverableData = resp.data;
      })
      if (Object.keys(query).length > 1) {
        this.deliverableForm.deliverableId = query.deliverableId;
        this.deliverableForm.deliverableDesc = query.deliverableDesc;
        this.deliverableForm.deadLine = query.deliverableDeadLine;
        this.deliverableForm.deadlineDate = query.deliverableDeadLine.substr(0, query.deliverableDeadLine.indexOf('T'));
        this.deliverableForm.deadlineTime = query.deliverableDeadLine.substr(query.deliverableDeadLine.indexOf('T') + 1, 8);
        this.deliverableForm.percent = query.deliverableWeight;
        this.deliverableForm.isNotified = query.notified;
      }
    }

  },
  data() {
    var validateDate = (rule, value, callback) => {
      if (!value || value === '') {
        callback(new Error('Please select a date'));
      } else {
        const cur_d = new Date();
        const curDate = cur_d.getFullYear() + '-' + (cur_d.getMonth()+1) + '-' + cur_d.getDate();
        if (value < curDate) {
          callback(new Error('Please select a valid date'));
        } else {
          callback();
        }
      }
    };

    var validateWeight = (rule, value, callback) => {
      if (!value || value === '') {
        callback(new Error('Please enter a weight'));
      }
      if (value < 0) {
        callback(new Error('Please enter a valid weight'));
      }
      callback();
    };

    var validateTime = (rule, value, callback) => {
      if (!this.deliverableForm.deadlineDate || this.deliverableForm.deadlineDate === '') {
        callback(new Error('Please select a date first'));
      }
      if (!value || value === '') {
        callback(new Error('Please select a time'));
      } else {
        const cur_d = new Date();
        const curDate = cur_d.getFullYear() + '-' + (cur_d.getMonth()+1) + '-' + cur_d.getDate();
        const cur_time = cur_d.toTimeString().split(' ')[0]
        if (curDate === this.deliverableForm.deadlineDate && cur_time > value) {
          callback(new Error('Please select a valid time'));
        } else {
          callback();
        }
      }
    };
    return {
      deliverableForm: {
        deliverableId: '',
        classId: '',
        deadLine: '',
        deadlineDate: '',
        deadlineTime: '',
        deliverableDesc: '',
        percent: '',
        isNotified: false
      },
      classData: [
      ],
      deliverableData: [
      ],
      search: '',
      rules: {
        classId: [
          { required: true, message: 'Please select a class', trigger: 'change' }
        ],
        deliverableDesc: [
          { required: true, trigger: 'blur', message: 'Please enter a description'}
        ],
        deadlineDate: [
          { required: true, trigger: 'blur', validator: validateDate}
        ],
            deadlineTime: [
          { required: true, trigger: 'blur', validator: validateTime}
        ],
            percent: [
          { required: true, trigger: 'change', validator: validateWeight},
        ]
      },
    };
  },
  methods: {
    clearFields() {
      this.$refs['idField'].resetField();
      this.$refs['descField'].resetField();
      this.$refs['dateField'].resetField();
      this.$refs['timeField'].resetField();
      this.$refs['weightField'].resetField();
      console.log(this.deliverableForm)
    },
    onChangeClass(classId) {
      this.clearFields();
      if (classId && classId !== '') {
        const _this = this;
        axios.get('http://localhost:8080/getAllDeliverables/' + classId).then(function (resp) {
          _this.deliverableData = resp.data;
        })
      }
    },
    onChangeDeliverable(deliverableId) {
      const curDeli = this.deliverableData.find(element => element.deliverableId === deliverableId)
      if (curDeli) {
        this.deliverableForm.deliverableDesc = curDeli.deliverableDesc
        this.deliverableForm.deadLine = curDeli.deadLine
        this.deliverableForm.deadlineDate = curDeli.deadLine.substr(0, curDeli.deadLine.indexOf('T'));
        this.deliverableForm.deadlineTime = curDeli.deadLine.substr(curDeli.deadLine.indexOf('T') + 1, 8);
        this.deliverableForm.percent = curDeli.percent
        this.deliverableForm.isNotified = curDeli.isNotified
      } else {
        this.clearFields();
      }
    },
    submitForm(formName) {
      const _this = this
      this.$refs[formName].validate((valid) => {
        if (valid) {
          const msg = (this.deliverableForm.deliverableId === '' ? 'You are going to create a new deliverable for class' + this.deliverableForm.classId :'You are going to update deliverable #' + this.deliverableForm.deliverableId + '.')
          this.$confirm(msg, 'Warning', {
            confirmButtonText: 'Confirm',
            cancelButtonText: 'Cancel',
            type: 'warning'
          }).then(() => {
            _this.deliverableForm.deadLine = _this.deliverableForm.deadlineDate+'T'+ _this.deliverableForm.deadlineTime+'+00:00';
            var cleanForm = _this.deliverableForm;
            delete cleanForm.deadlineDate;
            delete cleanForm.deadlineDate;
            axios.post('http://localhost:8080/createDeliverable/', cleanForm).then(function (resp) {
              if (resp.data === 'SUCCEED') {
                _this.$message({
                  type: 'success',
                  message: 'Update Successfully!'
                });
                let curDeli = _this.deliverableData.find(s => s.deliverableId === _this.deliverableForm.deliverableId);
                curDeli.deliverableDesc = _this.deliverableForm.deliverableDesc;
                curDeli.deadLine = _this.deliverableForm.deadLine;
                curDeli.percent =  _this.deliverableForm.percent
                curDeli.isNotified = _this.deliverableForm.isNotified
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
        }
      })
    }
  }
}
</script>

<style scoped>

</style>