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
      <div style="margin-left: 20px">
        <el-radio-group v-model="newest">
          <el-radio-button label="0" border>Only newest Submission </el-radio-button>
          <el-radio-button label="1" border>All submissions</el-radio-button>
        </el-radio-group>
      </div>

      <div style="margin-left: 20px">
        <el-radio-group v-model="valid">
          <el-radio-button label="0" border>Only valid Submission</el-radio-button>
          <el-radio-button label="1" border>All submissions</el-radio-button>
        </el-radio-group>
      </div>
    </div>

    <el-table
        stripe
        :data="submissionData.filter(tableFilter)"
        style="width: 100%"
        empty-text='No submissions for this deliverable found!'
    >
      <el-table-column
          label="Deliverable ID"
          prop="deliverableId"
      >
      </el-table-column>

      <el-table-column
          label="Submission ID"
          prop="submissionId"
      >
      </el-table-column>

      <el-table-column
          label="Student ID"
          prop="studentId"
          sortable
      >
      </el-table-column>

      <el-table-column
          label="Description"
          prop="submissionDesc"
      >
      </el-table-column>

      <el-table-column
          label="File Name"
          prop="fileName"
      >
      </el-table-column>

      <el-table-column
          label="Submit Time"
          prop="submitTime"
          sortable
      >
      </el-table-column>

      <el-table-column
          label="Grade"
          prop="grade"
          sortable
      >
      </el-table-column>

      <el-table-column
          align="right">
        <template slot="header" slot-scope="scope">
          <el-input
              v-model="search"
              size="mini"
              placeholder="Search by Student ID"/>
        </template>
        <template slot-scope="scope">
          <el-button
              size="mini"
              @click="handleEvaluateSubmission(scope.$index, scope.row)">Evaluate</el-button>
        </template>
      </el-table-column>
    </el-table>
    </el-card>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "ViewSubmissions",
  created() {
    const _this = this;
    axios.get('http://localhost:8080/getAllClass/' + this.$parent.$data.userId).then(function (resp) {
      _this.classData = resp.data;
    })
  },
  data() {
    return {
      newest: "1",
      valid: "1",
      classSelection: '',
      deliverableSelection: '',
      curDeadline: '',
      studentSelection: '',
      classData: [
      ],
      deliverableData: [
      ],
      submissionData:[
      ],
      submissionMap: new Map(),
      search: ''
    }
  },
  methods: {
    onChangeClass(classId) {
      if (classId && classId !== '') {
        const _this = this;
        this.deliverableSelection = '';
        this.deliverableData = [];
        this.submissionData = [];
        this.submissionMap = new Map();
        axios.get('http://localhost:8080/getAllDeliverables/' + classId).then(function (resp) {
          _this.deliverableData = resp.data;
        })
      }
    },
    onChangeDeliverable(deliverableId) {
      if (deliverableId && deliverableId !== '') {
        const _this = this;
        const curDeli = this.deliverableData.find(element => element.deliverableId === deliverableId)
        this.curDeadline = curDeli.deadLine;
        this.submissionMap = new Map();
        axios.get('http://localhost:8080/getAllSubmission/' + deliverableId).then(function (resp) {
          _this.submissionData = resp.data;
          resp.data.forEach(row => {
            //map content [newest after deadline, submission_id, newest before daedline, submission_id]
            const val = _this.submissionMap.get(row.studentId);
            if(val) {
              if (val[0] < row.submitTime) {
                _this.submissionMap[row.studentId][0] = row.submitTime;
                _this.submissionMap[row.studentId][1] = row.submissionId;
              }
              if (val[2] < row.submitTime && row.submitTime < _this.curDeadline) {
                _this.submissionMap[row.studentId][2] = row.submitTime;
                _this.submissionMap[row.studentId][3] = row.submissionId;
              }
            } else {
              _this.submissionMap.set(row.studentId, [row.submitTime, row.submissionId, row.submitTime, (row.submitTime<_this.curDeadline?row.submissionId:'')]);
            }
          });
        });
      }
    },
    tableFilter(value) {
      return this.newestFilter(value) && this.searchFilter(value) && this.validFilter(value);
    },
    newestFilter(value) {
      if (this.newest === '1') return true;
      const val = this.submissionMap.get(value.studentId);
      if (this.valid === '1') {
        return val[3] === value.submissionId;
      } else {
        return val[1] === value.submissionId;
      }
    },
    validFilter(value) {
      if (this.valid === '1') return true;
      return value.submitTime < this.curDeadline;
    },
    searchFilter(value) {
      return (!this.search || value.studentId.toString().toLowerCase().includes(this.search.toLowerCase()));
    },
    handleEvaluateSubmission(index, row) {
      console.log(index, row);
      const _this = this;
      const thisDeliverable = this.deliverableData.find(element => element.deliverableId === row.deliverableId);
      const thisSubmission = this.submissionData.find(element => element.submissionId === row.submissionId);
      this.$router.push({
        path: '/evaluateSubmission',
        query: {
          classId: _this.classSelection,
          deliverableId: row.deliverableId,
          deliverableDesc: thisDeliverable.deliverableDesc,
          deadLine: thisDeliverable.deadLine,
          percent: thisDeliverable.percent,

          submissionId: row.submissionId,
          grade: row.grade,
          studentId: row.studentId,
          fileName: thisSubmission.fileName,
          submissionDesc: row.submissionDesc,
          submitTime: row.submitTime,
        }
      })
    },
  }
}
</script>

<style scoped>

</style>