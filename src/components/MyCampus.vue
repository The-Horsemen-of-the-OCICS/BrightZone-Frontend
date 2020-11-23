<template>
  <div>
    <h1 style="font-family: 'Adobe Devanagari'; font-size: 50px;">Welcome Back, Professor {{this.userData.name}} !</h1>
    <div style="width: 800px; margin:0 auto;">
      <el-row :gutter="20" class="el-row">
        <el-col :span="12" v-for="c in this.courseData" :key="c.courseId"  style="margin-bottom: 20px">
          <el-card class="box-card" shadow="hover" @click.native="openClass(classData.find(element => element.courseId === c.courseId).classId)">
            <div slot="header" class="clearfix" style="margin: -20px">
              <img src="https://lh3.googleusercontent.com/proxy/bzTPgJ9V5opCL0eQyat6cNjDtoTfA4f5tE2wFZPzILfxjlve6HqanLQHaRwTxQiRNkmJGMGWmpOQJltDoNGEpZm8jecejQtRqNBrZw9baNvUD3xYUkXJJ-bWObbHwPE7RTkrvdoYDT5pH8wk_s_kQ0zPjGjUxvSbK11XtyF_XtoNZlmempDSBp4Is1aTkT-0vZAt7FsSXg" class="image">
            </div>
            <div style="margin-top: -20px; margin-bottom: -30px;">
              <h3 style="display: flex; text-align: left;">{{ '[' + c.courseSubject + c.courseNumber + '] ' + c.courseName }}</h3>
              <h4 style="display: flex; text-align: left; margin-top: -10px">Class  {{ classData.find(element => element.courseId === c.courseId).classId }} | Section {{ classData.find(element => element.courseId === c.courseId).section }}</h4>
            </div>
          </el-card>
        </el-col>

      </el-row>
    </div>

  </div>
</template>

<script>

import axios from "axios";

export default {
  name: "MyCampus",
  created() {
    const _this = this;
    axios.get('http://localhost:8080/admin/account/getAccount/' + this.user_id).then(function (resp) {
      _this.userData = resp.data;
    });

    axios.get('http://localhost:8080/getAllClass/' + this.user_id).then(function (resp) {
      _this.classData = resp.data;
      _this.courseData = [];
      _this.classData.forEach(c => {
        axios.get('http://localhost:8080/admin/course/get/' + c.courseId).then(function (resp) {
          _this.courseData.push(resp.data);
        });
      });
    });
  },
  data() {
    return {
      user_id: 2000006,
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
</style>