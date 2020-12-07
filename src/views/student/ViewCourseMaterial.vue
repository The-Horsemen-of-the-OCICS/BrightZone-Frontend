<template>
  <div>
     <el-row style="margin-top: 10px">
      <el-col :span="16">
        <el-card>
          <div style="display: flex">
            <div style="width: 250px; text-align: left;">
              <el-menu
                  class="sidebar-el-menu"
                  default-active="0"
                  active-text-color="#154360"
                  @select="handleSelect"
              >
                <el-menu-item index="All" >
                  <i class="el-icon-caret-right"></i>
                  <span slot="title">All</span>
                </el-menu-item>

                <el-menu-item v-for="d in this.directoryData" :key="d" :index="d">
                  <i class="el-icon-caret-right"></i>
                  <span slot="title"> {{ d }}</span>
                </el-menu-item>
              </el-menu>
            </div>
            <div>
              <el-row v-for="fileName in this.displayFileName" :key="fileName" style="text-align: left; margin-left: 10px; margin-top: 10px;" >
                <el-col :span="23">
                  <el-link icon="el-icon-tickets" style="font-size: 16px; width: content-box" @click="downloadClassMaterial(fileName)"> {{fileName}}</el-link>
                </el-col>

                <el-divider></el-divider>
              </el-row>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>



  </div>


</template>

<script>
import axios from "axios";
export default {
  name: "ViewCourseMaterial",

  created() {
    const _this = this;
    const params = new URLSearchParams([['clazzId', this.$route.params.clazzId]]);
    console.log(this.$route.params.clazzId)
    _this.classId = this.$route.params.clazzId
    axios.get('http://localhost:8080/getAllMaterial/' ,{params}).then(function (resp) {
      _this.allFiles = resp.data
      console.log(resp.data)
      _this.directoryData = []
      _this.displayFileName = []
      if (_this.allFiles.length > 0 ) {
        for (let i = 1; i < _this.allFiles.length; i += 1) {
          _this.displayFileName = _this.displayFileName.concat(_this.allFiles[i])
        }
        _this.directoryData = _this.allFiles[0];
      }
      _this.directoryFilter = 'All'

    });
  },
  data() {
    return {
      allFiles: null,
      directoryFilter: 'All',
      directoryData: [
          'Course Syllabus',
          'Course Slides',
          'Assignments',
          'FAQ',
          'Quizzes',
      ],
      displayFileName: [
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
    ]
    }
  },
  methods: {
    downloadClassMaterial(fileName) {
      var dir = ''
      for (let i = 1; i < this.allFiles.length; i += 1) {
        for (let j = 0; j < this.allFiles[i].length; j += 1) {
          if (fileName === this.allFiles[i][j]) {
            dir = this.allFiles[0][i-1];
            break;
          }
        }
      }
      const a = document.createElement('a')
      a.download = fileName
      a.href = 'http://localhost:8080/getClassMaterial/' + this.classData.classId + '/'+ dir + '/' + fileName
      a.click();
    },
    handleSelect(key) {
      console.log(key)
      if (key !== this.directoryFilter && this.allFiles.length > 0) {
        this.displayFileName = [];
        this.directoryFilter = key;
        if (key === 'All') {
          for (let i = 1; i < this.allFiles.length; i += 1) {
            this.displayFileName = this.displayFileName.concat(this.allFiles[i])
          }
        } else {
          let pos = 0;
          for (let i = 0; i < this.allFiles[0].length; i += 1) {
            if (this.allFiles[0][i] === key) pos = i;
          }
          this.displayFileName = this.allFiles[pos+1]
        }
      }
    },
  }
}
</script>

<style scoped>

</style>