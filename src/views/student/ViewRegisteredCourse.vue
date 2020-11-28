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
              size="mini"
              type="danger"
              @click="drop(scope.$index, scope.row)">Drop</el-button>
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
  name: "ViewRegisteredCourse",
  created() {
    const _this = this;
    axios.get('http://localhost:8080/getAllRegisteredCourse').then(function (resp) {
      _this.courseData = resp.data;
    });

    bus.$on('register-course', msg => {
      console.log(msg)
       axios.get('http://localhost:8080/getAllRegisteredCourse').then(function (resp) {
      _this.courseData = resp.data;
    })
    });
    
  },
  data() {
    return {
      courseData: []
    }
  },
  methods: {
    drop(index, row) {
      const _this = this;
      this.$confirm('You are going to Drop "' + row.courseName +'(' + row.courseNumber+ ')".', 'Notification', {
        confirmButtonText: 'Confirm',
        cancelButtonText: 'Cancel',
        type: 'warning'
      }).then(() => {
        const params = new URLSearchParams([['clazzId', row.clazzId ]]);
        axios.get('http://localhost:8080/dropCourse' ,{params}).then(function (resp) {
          if (resp.data.data === true) {
            _this.$message.success(resp.data.desc);
            _this.courseData=_this.courseData.filter((item) => { return item.clazzId !== row.clazzId; });
            bus.$emit('drop-course', row);
          } else {
            _this.$message.error(resp.data.desc);
          }
        });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: 'Drop Cancelled'
        });
      });
    }
  }
}
</script>

<style scoped>

</style>