<template>
  <div>
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>
          <i class="el-icon-lx-sort"></i> Courses
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="container">
      <div class="handle-box">
        <el-button
            type="primary"
            icon="el-icon-delete"
            class="handle-del mr10"
            @click="delAllSelection"
        >Batch Delete
        </el-button>
        <el-select v-model="query.address" placeholder="User Role" class="handle-select mr10">
          <el-option key="1" label="Administrator" value="administrator"></el-option>
          <el-option key="2" label="Professor" value="professor"></el-option>
          <el-option key="3" label="Student" value="student"></el-option>
          <el-option key="4" label="Teaching Assistant" value="teaching_assistant"></el-option>
        </el-select>
        <el-input v-model="query.name" placeholder="username" class="handle-input mr10"></el-input>
        <el-button type="primary" icon="el-icon-search" @click="handleSearch" plain>Search</el-button>
        <el-button type="primary" icon="el-icon-add" @click="handleAddCourse" style="float: right" round>Add new
        </el-button>
      </div>
      <el-table
          :data="tableData"
          border
          class="table"
          ref="multipleTable"
          style="width: 100%"
          header-cell-class-name="table-header"
          @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" align="center" min-width="5"></el-table-column>
        <el-table-column prop="courseId" label="ID" min-width="5"></el-table-column>
        <el-table-column prop="courseSubject" label="Subject" min-width="5"></el-table-column>
        <el-table-column prop="courseNumber" label="Number" min-width="5"></el-table-column>
        <el-table-column prop="courseName" label="Name" min-width="20"></el-table-column>
        <el-table-column prop="courseDesc" label="Description" min-width="34"></el-table-column>
        <el-table-column prop="credit" label="Credit" align="center" min-width="5"></el-table-column>

        <el-table-column label="Operator" align="center" min-width="15">
          <template slot-scope="scope">
            <el-button
                type="text"
                icon="el-icon-edit"
                @click="handleDetails(scope.row.courseId)"
            >Details
            </el-button>
            <el-button
                type="text"
                icon="el-icon-delete"
                class="red"
                @click="handleDelete(scope.$index, scope.row)"
            >delete
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="pagination">
        <el-pagination
            background
            layout="total, prev, pager, next"
            :current-page="query.pageIndex"
            :page-size="query.pageSize"
            :total="pageTotal"
            @current-change="handlePageChange"
        ></el-pagination>
      </div>
    </div>

    <el-drawer
        title="Add a Course"
        :with-header="addCourseDrawerProp.withHeader"
        size="35%"
        :append-to-body="addCourseDrawerProp.appendToBody"
        :visible.sync="addCourseDrawerProp.addCourseDrawer"
        :direction="addCourseDrawerProp.direction"
        :modal="addCourseDrawerProp.model"
        :before-close="cancelForm">
      <div class="demo-drawer__content">
        <el-card shadow="hover" style="height: 1000px">
          <div slot="header" class="clearfix" style="text-align: left">
            <a style="font-size: large;color: #20a0ff">Add a Course</a>
            <el-button-group style="float: right">
              <el-button type="danger" @click="cancelForm" style="width: 80px">Cancel
              </el-button>
              <el-button type="primary" @click="handleSubmitNewCourse()" :loading="loading"
                         style="width: 80px">{{ loading ? 'Submitting ...' : 'Submit' }}
              </el-button>
            </el-button-group>
          </div>
          <div class="form-box" style="float: left">
            <el-form ref="form" :model="addCourseForm" :rules="addCourseRules" style="text-align: left;margin-top: 5%">

              <el-form-item label="Course Subject :" prop="courseSubject" label-width="formLabelWidth"
                            style="margin-top: 5%">
                <el-input v-model="addCourseForm.courseSubject"></el-input>
              </el-form-item>

              <el-form-item label="Course Number :" prop="courseNumber" type="number" label-width="formLabelWidth"
                            style="margin-top: 5%">
                <el-input v-model.number="addCourseForm.courseNumber"></el-input>
              </el-form-item>

              <el-form-item label="Course Name :" prop="courseName" label-width="formLabelWidth" style="margin-top: 5%">
                <el-input v-model="addCourseForm.courseName"></el-input>
              </el-form-item>

              <el-form-item label="Course Credit : " prop="Credit" label-width="formLabelWidth" style="margin-top: 5%">
                <el-select v-model="addCourseForm.credit" placeholder="Credit" class="handle-select mr10">
                  <el-option key="1" label="1" value="1"></el-option>
                  <el-option key="2" label="2" value="2"></el-option>
                  <el-option key="3" label="3" value="3"></el-option>
                  <el-option key="4" label="4" value="4"></el-option>
                  <el-option key="5" label="5" value="5"></el-option>
                  <el-option key="6" label="6" value="6"></el-option>
                  <el-option key="7" label="7" value="7"></el-option>
                  <el-option key="8" label="8" value="8"></el-option>
                </el-select>
              </el-form-item>

              <el-form-item label="Course Description:" prop="courseDesc" label-width="formLabelWidth"
                            style="margin-top: 5%">
                <el-input type="textarea" rows="5" v-model="addCourseForm.courseDesc"></el-input>
              </el-form-item>

            </el-form>

          </div>


        </el-card>

      </div>
    </el-drawer>

  </div>
</template>

<script>
import axios from "axios";
import {fetchData} from "@/api";

export default {
  inject: ['reload'],
  name: "CourseManager",
  data() {
    let validateCourseNumber = (rule, value, callback) => {
      if (value !== '') {
        axios.get('http://localhost:8080/admin/course/addPageCheck/number/' + this.addCourseForm.courseSubject + '/' + this.addCourseForm.courseNumber).then(resp => {
          if (resp.data === 'valid') {
            callback()
          } else {
            callback('The course "' + this.addCourseForm.courseSubject + this.addCourseForm.courseNumber + '" already exist!')
          }
        })
      } else {
        callback('invalid input');
      }
    };
    let validateCourseName = (rule, value, callback) => {
      if (value !== '') {
        axios.get('http://localhost:8080/admin/course/addPageCheck/name/' + this.addCourseForm.courseName).then(resp => {
          if (resp.data === 'valid') {
            callback()
          } else {
            callback('The course name"' + this.addCourseForm.courseName + '" already exist!')
          }
        })
      } else {
        callback('invalid input');
      }
    };

    return {
      query: {
        address: '',
        name: '',
        pageIndex: 1,
        pageSize: 10
      },
      pageSize: this.pageSize,
      pageTotal: this.pageTotal,
      tableData: [],

      multipleSelection: [],
      delList: [],
      editVisible: false,

      addCourseDrawerProp: {
        direction: 'rtl',
        addCourseDrawer: false,
        withHeader: false,
        appendToBody: true,
        model: false
      },
      formLabelWidth: '100px',
      addCourseForm: {},
      loading: false,
      timer: null,

      addCourseRules: {
        courseName:
            [
              {required: true, message: 'Course name can not be none', trigger: 'blur'},
              {validator: validateCourseName, trigger: ['blur']}
            ],
        courseSubject:
            [
              {required: true, message: 'Course subject can not be none', trigger: 'blur'}
            ],
        courseNumber:
            [
              {required: true, message: 'Course number can not be none', trigger: 'blur',},
              {type: 'number', message: 'Please input correct Number', trigger: ['blur', 'change']},
              {validator: validateCourseNumber, trigger: ['blur']}
            ],
        credit:
            [
              {required: true, message: 'Course credit can not be none', trigger: 'blur'}
            ],
        courseDesc:
            [
              {required: true, message: 'Course description can not be none', trigger: 'blur'}
            ],
      },

      form: {},
      idx: -1,
      id: -1
    };
  },
  created() {
    axios.get('http://localhost:8080/admin/course/getAll/0/10').then(resp => {
      this.tableData = resp.data.content
      this.pageSize = resp.data.size
      this.pageTotal = resp.data.totalElements
    })
  },
  methods: {
    // add course
    handleAddCourse() {
      this.addCourseDrawerProp.addCourseDrawer = true
    },
    cancelForm() {
      this.loading = false;
      this.addCourseDrawerProp.addCourseDrawer = false
      clearTimeout(this.timer);
    },
    handleSubmitNewCourse() {
      if (this.loading) {
        return;
      }
      this.$confirm('Confirm to submit？')
          .then(_ => {
            this.loading = true;
            this.timer = setTimeout(() => {
              // 动画关闭需要一定的时间
              setTimeout(() => {
                this.loading = false;
              }, 400);
            }, 2000);
            axios.post("http://localhost:8080/admin/course/addNewCourse", this.addCourseForm).then(resp => {
              console.log(resp)
              if (resp.data === "success") {
                this.loading = false;
                this.addCourseDrawerProp.addCourseDrawer = false
                this.reload()
                clearTimeout(this.timer);
                this.$notify({
                  title: 'Success',
                  message: 'Add a new Course!',
                  type: 'success'
                });

              } else {
                this.loading = false;
                this.addCourseDrawerProp.addCourseDrawer = false
                this.reload()
                clearTimeout(this.timer);
                this.$notify.error({
                  title: 'Error',
                  message: 'Ops,Something goes wrong!',
                });
              }

            })

          })
          .catch(_ => {
          });
    },
    // 触发搜索按钮
    handleSearch() {
      this.$set(this.query, 'pageIndex', 1);
      this.getData();
    },
    // handle delete button
    handleDelete(index, row) {
      // Double check
      this.$confirm('Are you sure you want to delete this course : "' + row.courseSubject + row.courseNumber + "  " + row.courseName + '" ?', 'Check', {
        type: 'warning'
      })
          .then(() => {
            axios.delete('http://localhost:8080/admin/course/delete/' + row.courseId).then(resp => {
              if (resp.data === "success") {
                this.$notify({
                  title: 'Success',
                  message: 'Delete successfully!',
                  type: 'success'
                });
                this.tableData.splice(index, 1);
              } else {
                this.$notify.error({
                  title: 'Error',
                  message: 'Ops,Something goes wrong!',
                });
                window.location.reload()
              }
              console.log(resp);
            })

          })
          .catch(() => {
          });
    },
    // 多选操作
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    delAllSelection() {
      const length = this.multipleSelection.length;
      let str = '';
      this.delList = this.delList.concat(this.multipleSelection);
      for (let i = 0; i < length; i++) {
        str += this.multipleSelection[i].name + ' ';
      }
      this.$message.error(`删除了${str}`);
      this.multipleSelection = [];
    },
    // handle course details button
    handleDetails(courseId) {
      console.log(courseId)
      this.$router.push({
        path: `/admin/courseDetails/${courseId}`,
        meta: `${courseId}`,
      })
    },

    // Page
    handlePageChange(currentPage) {
      axios.get('http://localhost:8080/admin/course/getAll/' + (currentPage - 1) + '/10').then(resp => {
        console.log(resp)
        this.tableData = resp.data.content
        this.pageSize = resp.data.size
        this.pageTotal = resp.data.totalElements
      })
    }
  }
}
</script>

<style scoped>
.container {
  text-align: left;
}

.handle-box {
  margin-bottom: 20px;
}

.handle-select {
  width: 120px;
}

.handle-input {
  width: 300px;
  display: inline-block;
}

.table {
  width: 100%;
  font-size: 14px;
}

.red {
  color: #ff0000;
}

.mr10 {
  margin-right: 10px;
}

.table-td-thumb {
  display: block;
  margin: auto;
  width: 40px;
  height: 40px;
}


</style>