<template>
  <div>
    <div style="margin-top: 20px; margin-left: 10px; display: flex; justify-items: flex-end;">
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
          <el-radio-button label="0" border>Newest Submission </el-radio-button>
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
          label="Description ID"
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


  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "ViewSubmissions",
  created() {
    const _this = this;
    axios.get('http://localhost:8080/getAllClass/2000006').then(function (resp) {
      _this.classData = resp.data;
    })
  },
  data() {
    return {
      newest: '',
      valid: '',
      classSelection: '',
      deliverableSelection: '',
      studentSelection: '',
      classData: [
      ],
      deliverableData: [
      ],
      submissionData:[
      ],
      search: ''
    }
  },
  methods: {
    onChangeClass(classId) {
      if (classId && classId !== '') {
        const _this = this;
        axios.get('http://localhost:8080/getAllDeliverables/' + classId).then(function (resp) {
          _this.deliverableData = resp.data;
        })
      }
    },
    onChangeDeliverable(deliverableId) {
      if (deliverableId && deliverableId !== '') {
        const _this = this;
        axios.get('http://localhost:8080/getAllSubmission/' + deliverableId).then(function (resp) {
          _this.submissionData = resp.data;
        })
      }
    },
    tableFilter(value) {
      console.log(value)
      return (this.searchFilter(value) && this.newestFilter(value) && this.validFilter(value))
    },
    newestFilter(value) {
      console.log(this.newest);
      if (this.newest === '1') return true;
      retub
    },
    validFilter(value) {
      console.log(this.valid);
      return true;
    },
    searchFilter(value) {
      return (!this.search || value.studentId.toString().toLowerCase().includes(this.search.toLowerCase()));
    }

  }
}
</script>

<style scoped>

</style>