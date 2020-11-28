<template>
  <div>
    <el-card>
    <el-table
        stripe
        :data="courseData"
        style="width: 100%"
        empty-text='No opened courses found!'
        ref="openedCourseTable"
    >

      <el-table-column
          label="Course Number"
          prop="courseNo"
          sortable
      >
      </el-table-column>
      <el-table-column
          label="Course Name"
          prop="courseName"
          min-width="150%">
      </el-table-column>

      <el-table-column
          label="Course Desc"
          prop="courseDesc"
          min-width="200%">
      </el-table-column>

      <el-table-column
          label="Professor Name"
          prop="professorName"
      >
      </el-table-column>

      <el-table-column
          align="right">
        <template slot-scope="scope">
          <el-button
              v-if="scope.row.enrolled == 0"
              size="mini"
              type="danger"
              @click="register(scope.$index, scope.row)">Register</el-button>
          <el-button
              v-else
              size="mini"
              type="info">Register</el-button>
        </template>
      </el-table-column>
    </el-table>
    </el-card>
  </div>
</template>

<script>
import axios from "axios";
import bus from "@/components/common/bus";

export default {
  name: "ViewOpenedCourse",
  created() {
    const _this = this;
    axios.get('http://localhost:8080/getAllOpenedCourse').then(function (resp) {
      _this.courseData = resp.data;
    })
  },
  data() {
    return {
      courseData: []
    }
  },
  methods: {
    register(index, row) {
      console.log(row)
      const _this = this;
      this.$confirm('You are going to register "' + row.courseName +'(' + row.courseNo+ ')".', 'Notification', {
        confirmButtonText: 'Confirm',
        cancelButtonText: 'Cancel',
        type: 'warning'
      }).then(() => {
        const params = new URLSearchParams([['clazzId', row.clazzId ]]);
        axios.get('http://localhost:8080/registerCourse',{params}).then(function (resp) {
          if (resp.data.data === true) {
            _this.$message.success(resp.data.desc);
            row.enrolled = 1
            bus.$emit('register-course', row);
          } else {
            _this.$message.error(resp.data.desc);
          }
        });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: 'Register Cancelled'
        });
      });
    }
  }
}
</script>

<style scoped>

</style>