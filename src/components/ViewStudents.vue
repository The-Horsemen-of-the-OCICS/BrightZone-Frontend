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
    </div>
    <el-table
        stripe
        :data="studentData.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()) || data.personId.toLowerCase().includes(search.toLowerCase()))"
        style="width: 100%"
        show-summary
        :summary-method="calculateAverage"
        empty-text='No such student found!'
        ref="studentTable"
        @selection-change="onSelectionChange"
    >

      <el-table-column
          type="selection"
          width="55">
      </el-table-column>

      <el-table-column
          label="Student ID"
          prop="personId"
          sortable
      >
      </el-table-column>
      <el-table-column
          label="Name"
          prop="name">
      </el-table-column>
      <el-table-column
          label="Email"
          prop="email">
      </el-table-column>

      <el-table-column
          label="Final Grade"
          prop="finalGrade"
          sortable
      >
      </el-table-column>

      <el-table-column
          align="right">
        <template slot="header" slot-scope="scope">
          <el-input
              v-model="search"
              size="mini"
              placeholder="Search by Name or Student ID"/>
        </template>
        <template slot-scope="scope">
          <el-button
              size="mini"
              type="danger"
              @click="handleUpdateFinalGrade(scope.$index, scope.row)">Update Final Grade</el-button>
        </template>
      </el-table-column>
    </el-table>

    <div style="margin-top: 20px; display: flex; justify-items: flex-end;">
      <el-button
          @click="updateAll()"
          type="danger"
      > Update Final Grades For Selected Students</el-button>
    </div>
    </el-card>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "ViewStudents",
  created() {
    const _this = this;
    axios.get('http://localhost:8080/getAllClass/' + this.$parent.$data.userId).then(function (resp) {
      _this.classData = resp.data;
    })
    const query = this.$route.query;
    console.log(query);
    if (query && query.classId !== '') {
      this.classSelection = query.classId
      this.onChangeClass(this.classSelection);
    }
  },
  data() {
    return {
      studentSelection: '',
      classSelection: '',
      classData: [

      ],
      enrollmentData: [

      ],
      studentData: [

      ],
      search: ''
    }
  },
  methods: {
    onSelectionChange(selection) {
      this.studentSelection = selection;
      console.log(selection);
    },
    onChangeClass(classId) {
      const _this = this;
      axios.get('http://localhost:8080/getAllEnrollment/' + classId).then(function (resp) {
        _this.enrollmentData = resp.data;
        axios.get('http://localhost:8080/getAllStudent/' + classId).then(function (r) {
          _this.studentData = r.data;
          for(var i=0,len=_this.studentData.length;i<len;i++){
            _this.studentData[i].finalGrade = _this.enrollmentData[i].finalGrade;
          }
        });
      })
    },
    calculateAverage(param) {
      const { columns, data } = param;
      const sums = [];
      columns.forEach((column, index) => {
        if (index === 0) {
          sums[index] = 'Avg';
          return;
        }
        const values = data.map(item => Number(item[column.property]));
        if (index === 4) {
          sums[index] = values.reduce((prev, curr) => {
            const value = Number(curr);
            if (!isNaN(value)) {
              return prev + curr;
            } else {
              return prev;
            }
          }, 0);
          sums[index] /= data.length;
        } else {
          sums[index] = '';
        }
      });
      return sums;
    },
    handleUpdateFinalGrade(index, row) {
      const _this = this;
      this.$confirm('You are going to update the final grade of student #' + row.personId + '.', 'Notification', {
        confirmButtonText: 'Confirm',
        cancelButtonText: 'Cancel',
        type: 'warning'
      }).then(() => {
        axios.post('http://localhost:8080/submitFinalGrade/' + this.classSelection + '/' + row.personId).then(function (resp) {
          if (resp.data === 'SUCCEED') {
            _this.$message({
              type: 'success',
              message: 'Updated Successfully!'
            });
          } else {
            _this.$message.error('Database Error! Failed to delete.');
          }
          _this.onChangeClass(_this.classSelection);
        });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: 'Update Cancelled'
        });
      });
    },
    updateAll() {
      const _this = this;
      this.$confirm('You are going to update the final grades of all selected students.', 'Notification', {
        confirmButtonText: 'Confirm',
        cancelButtonText: 'Cancel',
        type: 'warning'
      }).then(() => {
        this.studentSelection.forEach(cur => {
          axios.post('http://localhost:8080/submitFinalGrade/' + this.classSelection + '/' + cur.personId).then(function (resp) {
            if (resp.data === 'SUCCEED') {
              _this.$message({
                type: 'success',
                message: 'Updated Successfully!'
              });
            } else {
              _this.$message.error('Database Error! Failed to delete.');
            }
            _this.onChangeClass(_this.classSelection);
          });
        });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: 'Update Cancelled'
        });
      });
    }
  }
}
</script>

<style scoped>

</style>