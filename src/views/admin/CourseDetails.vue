<template>
  <div>
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>
          <i class="el-icon-lx-cascades"></i> Courses Details
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="container">

      <el-row :gutter="20">
        <el-col :span="24">


          <el-col :span="14" style="float: left">
            <el-card shadow="hover" style="height:507px;">
              <div slot="header" class="clearfix" style="text-align: left">
                <a style="font-size: large;color: #20a0ff">Basic information</a>
                <el-button-group style="float: right">
                  <el-button type="primary" icon="el-icon-edit" @click="onEditCourse" style="width: 80px">edit
                  </el-button>
                  <el-button type="danger" icon="el-icon-delete" @click="onDeleteCourse" style="width: 80px">delete
                  </el-button>
                </el-button-group>
              </div>
              <div class="form-box" style="float: left">
                <el-form ref="form" :model="courseInfo" label-width="140px" style="text-align: left">
                  <el-form-item label="Course Name:" size="">
                    <!--                      <h3 style="text-align: center">{{courseInfo.courseName}}</h3>-->
                    <el-input v-model="courseInfo.courseName" readOnly></el-input>
                  </el-form-item>
                  <el-form-item label="Course ID:" size="">
                    <!--                      <h3 style="text-align: center">{{courseInfo.courseId}}</h3>-->
                    <el-input v-model="courseInfo.courseId" readOnly></el-input>
                  </el-form-item>
                  <el-form-item label="Course Subject:" size="">
                    <el-input v-model="courseInfo.courseSubject" readOnly></el-input>
                  </el-form-item>
                  <el-form-item label="Course Number:" size="">
                    <el-input v-model="courseInfo.courseNumber" readOnly></el-input>
                  </el-form-item>
                  <el-form-item label="Course Credit:" size="">
                    <el-input v-model="courseInfo.credit" readOnly></el-input>
                  </el-form-item>

                  <el-form-item label="Course Description:">
                    <el-input type="textarea" rows="5" v-model="courseInfo.courseDesc" readOnly></el-input>
                  </el-form-item>
                </el-form>


              </div>


            </el-card>
          </el-col>


          <el-col :span="10" style="float: right">
            <el-card shadow="hover" style="height:252px;">
              <div slot="header" class="clearfix" style="text-align: left">
                <a style="font-size: large;color: #20a0ff">Prerequisite Courses</a>
                <el-button style="float: right; padding: 3px 0" type="text">Add new</el-button>
              </div>
              <el-table :show-header="false" :data="todoList" style="width:100%;">
                <el-table-column width="40">
                  <template slot-scope="scope">
                    <el-checkbox v-model="scope.row.status"></el-checkbox>
                  </template>
                </el-table-column>
                <el-table-column>
                  <template slot-scope="scope">
                    <div
                        class="todo-item"
                        :class="{'todo-item-del': scope.row.status}"
                    >{{ scope.row.title }}
                    </div>
                  </template>
                </el-table-column>
                <el-table-column width="60">
                  <template>
                    <i class="el-icon-edit"></i>
                    <i class="el-icon-delete"></i>
                  </template>
                </el-table-column>
              </el-table>
            </el-card>
            <el-card shadow="hover" style="height:252px;margin-top: 2px">
              <div slot="header" class="clearfix" style="text-align: left">
                <a style="font-size: large;color: #20a0ff">Preclusion Courses</a>
                <el-button style="float: right; padding: 3px 0" type="text">Add new</el-button>
              </div>
              <el-table :show-header="false" :data="todoList" style="width:100%;">
                <el-table-column width="40">
                  <template slot-scope="scope">
                    <el-checkbox v-model="scope.row.status"></el-checkbox>
                  </template>
                </el-table-column>
                <el-table-column>
                  <template slot-scope="scope">
                    <div
                        class="todo-item"
                        :class="{'todo-item-del': scope.row.status}"
                    >{{ scope.row.title }}
                    </div>
                  </template>
                </el-table-column>
                <el-table-column width="60">
                  <template>
                    <i class="el-icon-edit"></i>
                    <i class="el-icon-delete"></i>
                  </template>
                </el-table-column>
              </el-table>
            </el-card>
          </el-col>

          <el-col :span="24" style="margin-top: 5px">
            <el-card shadow="hover" style="height:252px;">
              <div slot="header" class="clearfix" style="text-align: left">
                <a style="font-size: large;color: #20a0ff">The related classes of this course</a>
                <el-button style="float: right; padding: 3px 0" type="text">Add new class</el-button>
              </div>
              <el-table
                  :data="clazzData"
                  border
                  class="table"
                  ref="multipleTable"
                  style="width: 100%"
                  header-cell-class-name="table-header"
              >
                <el-table-column type="selection" align="center" min-width="3"></el-table-column>
                <el-table-column prop="classId" label="ID" min-width="3"></el-table-column>
                <el-table-column prop="section" label="Section" min-width="4"></el-table-column>
                <el-table-column prop="profId" label="Professor" min-width="4"></el-table-column>
                <el-table-column prop="roomId" label="room" min-width="3"></el-table-column>

                <el-table-column label="Status" align="center" min-width="4">
                  <template slot-scope="scope">
                    <el-tag
                        :type="scope.row.classStatus==='open'?'success':scope.row.classStatus==='close'?'primary':scope.row.classStatus==='cancel'?'danger':''"
                    >{{ scope.row.classStatus }}
                    </el-tag>
                  </template>
                </el-table-column>

                <el-table-column prop="enrolled" label="Enrolled" min-width="4"></el-table-column>
                <el-table-column prop="enrollCapacity" label="Capacity" min-width="4"></el-table-column>
                <el-table-column prop="dropNoPenaltyDeadline" label="Drop No Penalty" min-width="12"
                                 align="center"></el-table-column>
                <el-table-column prop="dropNoFailDeadline" label="Drop No Fail" min-width="12"
                                 align="center"></el-table-column>
                <el-table-column prop="classDesc" label="Description" min-width="20"></el-table-column>

                <el-table-column label="Operator" align="center" min-width="11">
                  <template slot-scope="scope">
                    <el-button
                        type="text"
                        icon="el-icon-edit"
                        @click="handleEdit(scope.$index, scope.row)"
                    >Modify
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
            </el-card>

          </el-col>

        </el-col>


      </el-row>


    </div>

    <!-- 编辑弹出框 -->
    <el-dialog title="Modify the course" :visible.sync="editVisible"  width="60%">
      <el-form :model="editCourseForm" :rules="editCourseRules" label-width="140px">
        <el-form-item label="Course Name :" prop="courseName">
          <el-input v-model="editCourseForm.courseName"></el-input>
        </el-form-item>
        <el-form-item label="Course Subject :" prop="courseSubject">
          <el-input v-model="editCourseForm.courseSubject"></el-input>
        </el-form-item>
        <el-form-item label="Course Number :" prop="courseNumber">
          <el-input v-model="editCourseForm.courseNumber"></el-input>
        </el-form-item>
        <el-form-item label="Course Credit :" prop="courseCredit">
          <el-input v-model="editCourseForm.credit"></el-input>
        </el-form-item>
        <el-form-item label="Course Description:">
          <el-input type="textarea" rows="5" v-model="editCourseForm.courseDesc"></el-input>
        </el-form-item>

      </el-form>
      <span slot="footer" class="dialog-footer">
                <el-button @click="editVisible = false">取 消</el-button>
                <el-button type="primary" @click="saveCourseEdit">确 定</el-button>
            </span>
    </el-dialog>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "CourseModify",
  data() {
    return {

      courseInfo: {},
      clazzData: [],

      multipleSelection: [],
      delList: [],
      editVisible: false,

      editCourseForm: {
        courseName: '',
        courseSubject: '',
        courseNumber: '',
        courseCredit: '',
        courseDesc: '',
      },

      editCourseRules: {
        courseName:
            [
              {require: true, message: 'Course name can not be none', trigger: 'blur'}
            ],
        courseSubject:
            [
              {require: true, message: 'Course subject can not be none', trigger: 'blur'}
            ],
        courseNumber:
            [
              {require: true, message: 'Course number can not be none', trigger: 'blur'}
            ],
        courseCredit:
            [
              {require: true, message: 'Course credit can not be none', trigger: 'blur'}
            ],
      }
    };

  },
  methods: {
    onSubmit() {
      this.$message.success('提交成功！');
    },
    onEditCourse() {
      this.editVisible = true
    },
    saveCourseEdit() {
      console.log(this.courseInfo)
      axios.post()
    }

  },
  created() {
    this.courseInfo = this.$route.query.row
    this.editCourseForm=this.$route.query.row
    console.log(this.courseInfo)
    console.log(this.courseInfo.courseId)
    console.log(this.courseInfo.courseName)
    axios.get('http://localhost:8080/admin/class/getClassByCourseId/' + this.courseInfo.courseId).then(resp => {
      this.clazzData = resp.data
      console.log(this.clazzData)
    })
  },
}
</script>

<style scoped>
.el-row {
  margin-bottom: 20px;
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

.grid-con-3 .grid-con-icon {
  background: rgb(242, 94, 67);
}

.grid-con-3 .grid-num {
  color: rgb(242, 94, 67);
}

.user-info {
  display: flex;
  align-items: center;
  padding-bottom: 20px;
  border-bottom: 2px solid #ccc;
  margin-bottom: 20px;
}

.user-avator {
  width: 120px;
  height: 120px;
  border-radius: 50%;
}

.user-info-cont {
  padding-left: 50px;
  flex: 1;
  font-size: 14px;
  color: #999;
}

.user-info-cont div:first-child {
  font-size: 30px;
  color: #222;
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

.todo-item {
  font-size: 14px;
}

.todo-item-del {
  text-decoration: line-through;
  color: #999;
}

.schart {
  width: 100%;
  height: 300px;
}
</style>