<template>
  <div>
    <el-row :gutter="10" class="el-row" >
      <el-col :span="8">
        <el-card class="box-card" shadow="always" >
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
        <el-card class="box-card">
        <el-card class="box-card"shadow="never" :body-style="{padding: '0px'}" style="margin-top: -10px; margin-bottom: 10px">
          <div class="grid-content grid-con-1">
            <i class="el-icon-lx-people grid-con-icon"></i>
            <div class="grid-cont-right">
              <div class="grid-num">{{ this.classData.enrolled }}</div>
              <div>Total Enrolled</div>
            </div>
          </div>
        </el-card>
        <el-card class="box-card"shadow="never" :body-style="{padding: '0px'}" style="margin-bottom: -10px;">
          <div class="grid-content grid-con-2">
            <i class="el-icon-document-copy grid-con-icon"></i>
            <div class="grid-cont-right">
              <div class="grid-num">{{ this.deliverableData.length }}</div>
              <div>Total Deliverables</div>
            </div>
          </div>
        </el-card>
        </el-card>

      </el-col>
      <el-col :span="5">
        <el-card style="max-width: 250px">
          <el-row style="margin-bottom: 10px">
            <el-link icon="el-icon-document-checked" style="font-size: 18px" @click="viewDeliverables"> View Deliverables</el-link>
          </el-row>
          <el-row style="margin-bottom: 10px">
            <el-link icon="el-icon-edit" style="font-size: 18px" @click="createDeliverables"> Create Deliverable</el-link>
          </el-row>
          <el-row style="margin-bottom: 10px">
            <el-link icon="el-icon-user" style="font-size: 18px" @click="viewStudents"> View Students</el-link>
          </el-row>
          <el-row>
            <el-link icon="el-icon-document-copy" style="font-size: 18px" @click="viewSubmissions"> View Submissions </el-link>
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
                <el-col :span="1">
                  <el-button icon="el-icon-delete" @click="deleteClassMaterial(fileName)"></el-button>
                </el-col>
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
            <el-button size="small" type="primary" style="margin-bottom: 10px;"  @click="uploadClassMaterial">Upload</el-button>
            <el-button size="small" style="margin-bottom: 10px;" @click="handleClear">Clear</el-button>

          </div>
          <div style="display: flex">
            <el-upload
                ref="upload"
                drag
                action="https://localhost:8080/uploadClassMaterial/"
                :multiple="true"
                :file-list="uploadList"
                :auto-upload="false"
                :on-change="handleChange"
            >
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

    if (query) {
      axios.get('http://localhost:8080/getAllClass/' + this.$parent.$data.userId).then(function (resp) {
        _this.classData = resp.data.find(element => element.classId.toString() === query.classId.toString())
        axios.get('http://localhost:8080/getAllDeliverables/' + _this.classData.classId).then(function (resp) {
          _this.deliverableData = resp.data;
        })
        _this.reloadData()
      });
    } else {
      this.$router.push('/404');
    }
  },
  data() {
    return {
      deliverableData: [],
      submissionData: [],
      classData: '',
      courseData: '',
      directorySelection: '',
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
    ],
      uploadList:  []
    }
  },
  computed: {

  },
  methods:{
    reloadData() {
      const _this = this;
      axios.get('http://localhost:8080/getFileNames/' + this.classData.classId).then(function (resp) {
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
      axios.get('http://localhost:8080/admin/course/getCourseById/' + this.classData.courseId).then(function (resp) {
        _this.courseData = resp.data;
      });
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
    handleChange(file, fileList) {
      this.uploadList = fileList
    },
    submitUpload() {
      this.$refs.upload.submit();
    },
    handleClear() {
      this.$refs.upload.clearFiles();
    },
    uploadClassMaterial() {
      const _this = this;
      if (!this.uploadList || this.uploadList.length === 0) {
        return this.$message.error('Nothing to upload');
      }
      if (!this.directorySelection || this.directorySelection === '') {
        return this.$message.error('Please select or create a directory!');;
      }
      let sizeLimit = true;
      this.uploadList.forEach(file => {
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isLt2M) {
          sizeLimit = false;
        }
      });
      if (!sizeLimit) return this.$message.error('File size exceeds 2MB!');

      console.log(this.uploadList)
      this.uploadList.forEach(file => {
        const formData = new FormData();
        formData.append("file", file.raw);
        axios.post('http://localhost:8080/uploadClassMaterial/' + _this.classData.classId + '/' + _this.directorySelection, formData).then(function (resp) {
          if (resp.data === 'SUCCEED') {
            _this.$message({
              type: 'success',
              message: 'File <' + file.name + '> uploaded successfully!'
            });
            _this.uploadList = [];
            _this.handleClear();
            _this.reloadData();
          } else {
            _this.$message.error('Database Error! Failed to upload ' + 'File <' + file.name + '>');
          }
        });
      }
      )
    },
    viewDeliverables(){
      this.$router.push({
        path: '/professor/viewDeliverables',
        query: {
          classId: (this.classData ? this.classData.classId : '')
        }
      })
    },
    createDeliverables(){
      this.$router.push({
        path: '/professor/editDeliverable',
        query: {
          classId: (this.classData ? this.classData.classId : '')
        }
      })
    },
    viewStudents(){
      this.$router.push({
        path: '/professor/viewStudents',
        query: {
          classId: (this.classData ? this.classData.classId : '')
        }
      })
    },
    viewSubmissions(){
      this.$router.push({
        path: '/professor/viewSubmissions',
        query: {
          classId: (this.classData ? this.classData.classId : '')
        }
      })
    },
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
    deleteClassMaterial(fileName) {
      const _this = this;
      this.$confirm('You are going to delete file <' + fileName + '>.', 'Warning', {
        confirmButtonText: 'Confirm',
        cancelButtonText: 'Cancel',
        type: 'warning'
      }).then(() => {
        var dir = ''
        for (let i = 1; i < this.allFiles.length; i += 1) {
          for (let j = 0; j < this.allFiles[i].length; j += 1) {
            if (fileName === this.allFiles[i][j]) {
              dir = this.allFiles[0][i-1];
              break;
            }
          }
        }
        axios.delete('http://localhost:8080/deleteClassMaterial/' + this.classData.classId + '/'+ dir + '/' + fileName).then(function (resp) {
          if (resp.data === 'SUCCEED') {
            _this.$message({
              type: 'success',
              message: 'Deleted Successfully!'
            });
            _this.reloadData();
          } else {
            _this.$message.error('Database Error! Failed to delete file <' + fileName + '>!');
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: 'Delete Cancelled'
        });
      });
    }
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
.grid-content {
  display: flex;
  align-items: center;
  height: 100px;
}

.grid-cont-right {
  flex: 1;
  text-align: center;
  font-size: 14px;
  color: #999;
}

.grid-num {
  font-size: 30px;
  font-weight: bold;
}

.grid-con-icon {
  font-size: 50px;
  width: 100px;
  height: 100px;
  text-align: center;
  line-height: 100px;
  color: #fff;
}

.grid-con-1 .grid-con-icon {
  background: rgb(45, 140, 240);
}

.grid-con-1 .grid-num {
  color: rgb(45, 140, 240);
}

.grid-con-2 .grid-con-icon {
  background: rgb(100, 213, 114);
}

.grid-con-2 .grid-num {
  color: rgb(45, 140, 240);
}
</style>