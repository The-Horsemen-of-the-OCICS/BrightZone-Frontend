<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="10">
        <el-card shadow="hover" class="mgb20" style="height:200px;">
          <div class="user-info">
            <img src="https://github.com/WenjiuWang/WenjiuWang.github.io/blob/master/assets/img/profile.jpg?raw=true" class="user-avator" alt />
            <div class="user-info-cont">
              <div>Welcome Back, {{this.userData.name}} !</div>
              <div>Professor | {{this.userData.program}}</div>
            </div>
          </div>
          <div class="user-info-list">
            Last Login：
            <span>{{this.userData.lastLogin}}</span>
          </div>
        </el-card>
      </el-col>
      <el-col :span="14">
        <el-row :gutter="20" class="el-row">
          <el-col :span="12" v-for="c in this.courseData" :key="courseData.indexOf(c)"  style="margin-bottom: 20px">
            <el-card class="box-card" shadow="hover" @click.native="openClass(classData[courseData.indexOf(c)].classId)">
              <div slot="header" class="clearfix" style="margin: -20px">
                <img src="@/assets/img/test_banner.png" class="image">
              </div>
              <div>
                <h3 style="display: flex; text-align: left;">{{ '[' + c.courseSubject + c.courseNumber + '] ' + c.courseName }}</h3>
                <h4 style="display: flex; text-align: left; margin-top: 5px">Class  {{ classData[courseData.indexOf(c)].classId }} - Section {{ classData[courseData.indexOf(c)].section }}</h4>
              </div>
            </el-card>
          </el-col>
        </el-row>
      </el-col>
    </el-row>

  </div>
</template>

<script>

import axios from "axios";

export default {
  name: "ProfessorIndex",
  created() {
    const _this = this;
    axios.get('http://localhost:8080/admin/account/getAccount/' + this.$parent.$data.userId).then(function (resp) {
      _this.userData = resp.data;
    });

    axios.get('http://localhost:8080/getAllClass/' + this.$parent.$data.userId).then(function (resp) {
      _this.classData = resp.data;
      _this.courseData = [];
      _this.classData.forEach(c => {
        axios.get('http://localhost:8080/admin/course/getCourseById/' + c.courseId).then(function (resp) {
          _this.courseData.push(resp.data);
        });
      });
    });
  },
  data() {
    return {
      userData: '',
      classData: [
      ],
      courseData:[
      ],
    }
  },
  computed: {

  },
  methods:{
    openClass(value) {
      console.log(value);
      const _this = this;
      this.$router.push({
        path: '/professor/classHome',
        query: {
          classId: value
        }
      })
    },
  }
}
</script>

<style scoped>
.el-row {
  display: flex;
  flex-wrap: wrap;
}
.box-card {
  min-width: 100%;
  height: 100%;
}
.image {
  width: 100%;
  display: block;
}
.clearfix:before,
.clearfix:after {
  padding: 0;
  display: table;
  content: "";
}

.clearfix:after {
  clear: both
}

.user-info {
  display: flex;
  align-items: center;
  padding-bottom: 15px;
  border-bottom: 1px solid #ccc;
  margin-bottom: 10px;
}

.user-avator {
  width: 120px;
  height: 120px;
  border-radius: 50%;
}

.user-info-cont {
  padding-left: 50px;
  flex: 1;
  font-size: 30px;
  color: #222;
}

.user-info-cont div:last-child {
  margin-top: 5px;
  font-size: 20px;
  color: #999;
}

.user-info-list {
  font-size: 14px;
  color: #999;
  line-height: 25px;
}

.user-info-list span {
  margin-left: 70px;
}

.mgb20 {
  margin-bottom: 20px;
}

</style>
