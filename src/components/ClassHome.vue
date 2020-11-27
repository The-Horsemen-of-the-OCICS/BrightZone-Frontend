<template>
  <div>
    <el-row :gutter="10" class="el-row" >
      <el-col :span="8">
        <el-card class="box-card" shadow="hover" >
          <div slot="header" class="clearfix" style="margin: -20px">
            <img src="@/assets/img/test_banner.png" class="image">
          </div>
          <div>
            <h3 style="display: flex; text-align: left;">{{ '[' + this.courseData.courseSubject + this.courseData.courseNumber + '] ' + this.courseData.courseName }}</h3>
            <h4 style="display: flex; text-align: left; margin-top: 5px">Class  {{ this.classData.classId }} - Section {{ this.classData.section }}</h4>
          </div>
        </el-card>
      </el-col>
      <el-col :span="8">
        <el-card class="box-card" shadow="hover" >
          <div>
            <el-row>
              <el-col style="display: flex">
                Status: {{this.classData.classStatus}}
              </el-col>
            </el-row>
            <div>
              Enrolled: {{this.classData.enrolled}}/{{this.classData.enrollCapacity}}
              <el-progress :percentage="this.classData.enrolled / this.classData.enrollCapacity"></el-progress>
            </div>
          </div>
        </el-card>
      </el-col>
      <el-col :span="4">
        <el-card style="max-width: 250px">
          <el-row style="margin-bottom: 10px">
            <el-link icon="el-icon-document-checked" style="font-size: 20px"> View Deliverables</el-link>
          </el-row>
          <el-row style="margin-bottom: 10px">
            <el-link icon="el-icon-edit" style="font-size: 20px"> Create Deliverable</el-link>
          </el-row>
          <el-row style="margin-bottom: 10px">
            <el-link icon="el-icon-user" style="font-size: 20px"> View Students</el-link>
          </el-row>
          <el-row>
            <el-link icon="el-icon-document-copy" style="font-size: 20px"> View Submissions</el-link>
          </el-row>
        </el-card>
      </el-col>
    </el-row>
    <el-row style="margin-top: 10px">
      <el-col :span="16">
        <el-card>
          <div style="display: flex">
            <div style="width: 250px; text-align: left;">
              <el-menu
                  class="sidebar-el-menu"
                  default-active="0"
                  active-text-color="#154360"
                  @open="handleOpen"
                  @close="handleClose"
              >
                <el-menu-item index="All" >
                  <i class="el-icon-caret-right"></i>
                  <span slot="title">All</span>
                </el-menu-item>

                <el-menu-item v-for="d in this.directoryData" index="All" >
                  <i class="el-icon-caret-right"></i>
                  <span slot="title"> {{ d }}</span>
                </el-menu-item>
              </el-menu>
            </div>
            <div>
              <el-row v-for="f in this.allFileName" style="text-align: left; margin-left: 20px;" >
                <el-link icon="el-icon-tickets" style="font-size: 20px; width: content-box"> {{f}}</el-link>
                <el-divider></el-divider>
              </el-row>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <el-row style="margin-top: 10px">
      <el-col :span="16">
        <el-card>
          <div style="display: flex;">
            <el-select v-model="directorySelection" filterable clearable allow-create placeholder="Select or create a directory" @change=""style="margin-bottom: 10px; margin-right: 10px">
              <el-option
                  v-for="item in directoryData"
                  :key="item"
                  :label="item"
                  :value="item">
              </el-option>
            </el-select>
            <el-button size="small" type="primary" style="margin-bottom: 10px;">Upload</el-button>
            <el-button size="small" style="margin-bottom: 10px;">Clear</el-button>

          </div>
          <div style="display: flex">
            <el-upload
                class="upload-demo"
                drag
                action=""
                multiple>
              <i class="el-icon-upload"></i>
              <div class="el-upload__text">Drag files here or<em> Click </em></div>
              <div class="el-upload__tip" slot="tip">You can upload files up to a maximum of 2 MB.</div>
            </el-upload>
          </div>
        </el-card>
      </el-col>
    </el-row>

  </div>
</template>


<script>

import axios from "axios";

export default {
  name: "ClassHome",
  created() {
    const _this = this;

    const query = this.$route.query;
    console.log(query)
    if (query) {
      this.classData = query.classData;
    }

    if (!this.classData) {
      this.$router.push('/404');
    }

    axios.get('http://localhost:8080/admin/course/get/' + this.classData.courseId).then(function (resp) {
      _this.courseData = resp.data;
    });
  },
  data() {
    return {
      classData: '',
      courseData: '',
      directorySelection: '',
      directoryData: [
          'Course Syllabus',
          'Course Slides',
          'Assignments',
          'FAQ',
          'Quizzes',
      ],
      allFileName: [
          'SyllabusFall2020',
          'Topic-0',
          'Topic-1',
          'Topic-2',
          'Assignment1',
          'Assignment2',
          'FAQ-2020-1',
          'FAQ-2020-3',
          'Quiz1',
          'Quiz3',
      ],
      displayFileName: [],
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

</style>