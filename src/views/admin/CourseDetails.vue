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


          <el-col :span="10" style="float: left">
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
              <div class="form-box" style="float: left;width: 87%">
                <el-form ref="form" :model="courseInfo" label-width="140px" style="text-align: left">
                  <el-form-item label="Course Name:" size="">
                    <!--                      <h3 style="text-align: center">{{courseInfo.courseName}}</h3>-->
                    <el-input v-model="courseInfo.courseName" readOnly></el-input>
                  </el-form-item>
                  <el-form-item label="Course ID:" size="">
                    <!--                      <h3 style="text-align: center">{{courseInfo.courseId}}</h3>-->
                    <el-input v-model="courseInfo.courseId" readOnly></el-input>
                  </el-form-item>
                  <el-form-item label="Course Subject:" size="" prop="courseSubject">
                    <el-input v-model="courseInfo.courseSubject" readOnly></el-input>
                  </el-form-item>
                  <el-form-item label="Course Number:" size="" prop="courseNumber">
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

          <el-col :span="7" style="float: right">
            <el-card shadow="hover" style="height:507px;">
              <div slot="header" class="clearfix" style="text-align: left">
                <a style="font-size: large;color: #20a0ff">Preclusion Courses</a>
                <el-button style="float: right; padding: 3px 0" type="text"
                           @click="openAddPreclusionDrawer">Add new
                </el-button>
              </div>
              <el-table :show-header="false" :data="PreclusionCourses" style="width:100%" height="400">
                <el-table-column width="100">
                  <template slot-scope="scope">
                    <div class="todo-item">{{ scope.row.courseSubject }}-{{ scope.row.courseNumber }}</div>
                  </template>
                </el-table-column>
                <el-table-column>
                  <template slot-scope="scope">
                    <div class="todo-item">{{ scope.row.courseName }}</div>
                  </template>
                </el-table-column>
                <el-table-column width="70">
                  <template slot-scope="scope">
                    <el-button
                        type="text"
                        icon="el-icon-delete"
                        @click="handleDeletePreclusion(scope.row)"
                    >Delete
                    </el-button>
                  </template>
                </el-table-column>
              </el-table>
            </el-card>
          </el-col>

          <el-col :span="7" style="float: right">
            <el-card shadow="hover" style="height:507px;">
              <div slot="header" class="clearfix" style="text-align: left">
                <a style="font-size: large;color: #20a0ff">Prerequisite Courses</a>
                <el-button style="float: right; padding: 3px 0" type="text"
                           @click="openAddPrerequisiteDrawer">Add new
                </el-button>
              </div>
              <el-table :show-header="false" :data="PrerequisiteCourses" style="width:100%;" height="400">
                <el-table-column width="100">
                  <template slot-scope="scope">
                    <div class="todo-item">{{ scope.row.courseSubject }}-{{ scope.row.courseNumber }}</div>
                  </template>
                </el-table-column>
                <el-table-column>
                  <template slot-scope="scope">
                    <div class="todo-item">{{ scope.row.courseName }}</div>
                  </template>
                </el-table-column>
                <el-table-column width="70">
                  <template slot-scope="scope">
                    <el-button
                        type="text"
                        icon="el-icon-delete"
                        @click="handleDeletePrerequisite(scope.row)"
                    >Delete
                    </el-button>
                  </template>
                </el-table-column>
              </el-table>
            </el-card>
          </el-col>


          <el-col :span="24" style="margin-top: 10px">
            <el-card shadow="hover" style="height:252px;">
              <div slot="header" class="clearfix" style="text-align: left">
                <a style="font-size: large;color: #20a0ff">The related classes of this course</a>
                <el-button style="float: right; padding: 3px 0" type="text"
                           @click="openAddClazzDrawer">Add new
                </el-button>
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

    <!--    drawer for course edit-->
    <el-drawer
        title="Edit the Course"
        :with-header="drawerProp.withHeader"
        size="35%"
        :append-to-body="drawerProp.appendToBody"
        :visible.sync="drawerProp.editDrawVisible"
        :direction="drawerProp.direction"
        :modal="drawerProp.model"
        :before-close="cancelForm">
      <div class="demo-drawer__content" style="height: fit-content">
        <el-card shadow="hover">
          <div slot="header" class="clearfix" style="text-align: left">
            <a style="font-size: large;color: #20a0ff">Edit the Course</a>
            <el-button-group style="float: right">
              <el-button type="danger" @click="cancelForm" style="width: 80px">Cancel
              </el-button>
              <el-button type="primary" @click="saveCourseEdit" :loading="loading"
                         style="width: 80px">{{ loading ? 'Submitting ...' : 'Submit' }}
              </el-button>
            </el-button-group>
          </div>
          <div class="form-box" style="float: left">
            <el-form ref="form" :model="editCourseForm" :rules="editCourseRules"
                     style="text-align: left;margin-top: 5%">

              <el-form-item label="Course Name :" prop="courseName" label-width="formLabelWidth" style="margin-top: 5%">
                <el-input v-model="editCourseForm.courseName"></el-input>
              </el-form-item>
              <el-form-item label="Course Subject :" prop="courseSubject">
                <el-input v-model="editCourseForm.courseSubject" readonly></el-input>
              </el-form-item>
              <el-form-item label="Course Number :" prop="courseNumber">
                <el-input v-model="editCourseForm.courseNumber"></el-input>
              </el-form-item>
              <el-form-item label="Course Credit :" prop="credit">
                <el-input v-model="editCourseForm.credit"></el-input>
              </el-form-item>
              <el-form-item label="Course Description:">
                <el-input type="textarea" rows="5" v-model="editCourseForm.courseDesc"></el-input>
              </el-form-item>

            </el-form>
          </div>


        </el-card>

      </div>
    </el-drawer>
    <!--    drawer for add new Prerequisite Course-->
    <el-drawer
        title="Add a new Prerequisite Course"
        :with-header="addPrerequisiteDrawerProp.withHeader"
        size="27%"
        :append-to-body="addPrerequisiteDrawerProp.appendToBody"
        :visible.sync="addPrerequisiteDrawerProp.editDrawVisible"
        :direction="addPrerequisiteDrawerProp.direction"
        :modal="addPrerequisiteDrawerProp.model"
        :before-close="cancelForm">
      <div class="demo-drawer__content" style="height: fit-content">
        <el-card shadow="hover">
          <div slot="header" class="clearfix" style="text-align: left">
            <a style="font-size: large;color: #20a0ff">Add a new Prerequisite Course</a>
            <el-button-group style="float: right">
              <el-button type="danger" @click="cancelForm" style="width: 80px">Cancel
              </el-button>
              <el-button type="primary" @click="saveNewPrerequisiteCourse" :loading="loading"
                         style="width: 80px">{{ loading ? 'Submitting ...' : 'Submit' }}
              </el-button>
            </el-button-group>
          </div>
          <div class="form-box" style="float: left;width: 97%">
            <el-form ref="form" :model="addPrerequisiteForm" :rules="addPrerequisiteCourseRules"
                     style="text-align: left;margin-top: 5%;" label-width="auto">
              <el-divider content-position="center" style="margin-top: 10%"><i class="el-icon-lx-search"></i> Search
              </el-divider>
              <el-form-item label="Course Subject :" prop="courseSubject">
                <el-select v-model="addPrerequisiteForm.courseSubject" filterable placeholder="Please Input or Select">
                  <el-option
                      v-for="item in courseSubjectList"
                      :key="item.courseSubject"
                      :label="item.courseSubject"
                      :value="item.courseSubject">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="Course Number :" prop="courseNumber">
                <el-select v-model="addPrerequisiteForm.courseNumber" filterable placeholder="Please Input or Select">
                  <el-option
                      v-for="item in courseNumberList"
                      :key="item.courseNumber"
                      :label="item.courseNumber"
                      :value="item.courseNumber">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-form>
            <el-divider content-position="center" style="margin-top: 10%"><i class="el-icon-lx-vipcard"></i> Course info
            </el-divider>
            <el-form ref="form" :model="PrerequisiteCourseForm"
                     style="text-align: left;margin-top: 5%;" label-width="auto">
              <el-form-item label="Course Name :" prop="courseNumber">
                <el-input v-model="PrerequisiteCourseForm.courseName" readonly></el-input>
              </el-form-item>
              <el-form-item label="Course ID :" prop="courseId">
                <el-input v-model="PrerequisiteCourseForm.courseId" readonly></el-input>
              </el-form-item>
              <el-form-item label="Course Subject :" prop="courseSubject">
                <el-input v-model="PrerequisiteCourseForm.courseSubject" readonly></el-input>
              </el-form-item>
              <el-form-item label="Course Number :" prop="courseNumber">
                <el-input v-model="PrerequisiteCourseForm.courseNumber" readonly></el-input>
              </el-form-item>
              <el-form-item label="Course Credit :" prop="credit">
                <el-input v-model="PrerequisiteCourseForm.credit" readonly></el-input>
              </el-form-item>
              <el-form-item label="Course Description:">
                <el-input type="textarea" rows="5" v-model="PrerequisiteCourseForm.courseDesc" readonly></el-input>
              </el-form-item>

            </el-form>
          </div>
        </el-card>
      </div>
    </el-drawer>
    <!--    drawer for add new Preclusion Course-->
    <el-drawer
        title="add a new Preclusion Course"
        :with-header="addPreclusionDrawerProp.withHeader"
        size="27%"
        :append-to-body="addPreclusionDrawerProp.appendToBody"
        :visible.sync="addPreclusionDrawerProp.editDrawVisible"
        :direction="addPreclusionDrawerProp.direction"
        :modal="addPreclusionDrawerProp.model"
        :before-close="cancelForm">
      <div class="demo-drawer__content" style="height: fit-content">
        <el-card shadow="hover">
          <div slot="header" class="clearfix" style="text-align: left">
            <a style="font-size: large;color: #20a0ff">Add new preclusion course</a>
            <el-button-group style="float: right">
              <el-button type="danger" @click="cancelForm" style="width: 80px">Cancel
              </el-button>
              <el-button type="primary" @click="saveNewPreclusionCourse" :loading="loading"
                         style="width: 80px">{{ loading ? 'Submitting ...' : 'Submit' }}
              </el-button>
            </el-button-group>
          </div>
          <div class="form-box" style="float: left;width: 97%">
            <el-form ref="form" :model="addPreclusionForm" :rules="addPreclusionCourseRules"
                     style="text-align: left;margin-top: 5%;" label-width="auto">
              <el-divider content-position="center" style="margin-top: 10%"><i class="el-icon-lx-search"></i> Search
              </el-divider>
              <el-form-item label="Course Subject :" prop="courseSubject">
                <el-select v-model="addPreclusionForm.courseSubject" filterable placeholder="Please Input or Select">
                  <el-option
                      v-for="item in courseSubjectList"
                      :key="item.courseSubject"
                      :label="item.courseSubject"
                      :value="item.courseSubject">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="Course Number :" prop="courseNumber">
                <el-select v-model="addPreclusionForm.courseNumber" filterable placeholder="Please Input or Select">
                  <el-option
                      v-for="item in courseNumberList"
                      :key="item.courseNumber"
                      :label="item.courseNumber"
                      :value="item.courseNumber">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-form>
            <el-divider content-position="center" style="margin-top: 10%"><i class="el-icon-lx-vipcard"></i> Course info
            </el-divider>
            <el-form ref="form" :model="PreclusionCourseForm"
                     style="text-align: left;margin-top: 5%;" label-width="auto">
              <el-form-item label="Course Name :" prop="courseNumber">
                <el-input v-model="PreclusionCourseForm.courseName" readonly></el-input>
              </el-form-item>
              <el-form-item label="Course ID :" prop="courseId">
                <el-input v-model="PreclusionCourseForm.courseId" readonly></el-input>
              </el-form-item>
              <el-form-item label="Course Subject :" prop="courseSubject">
                <el-input v-model="PreclusionCourseForm.courseSubject" readonly></el-input>
              </el-form-item>
              <el-form-item label="Course Number :" prop="courseNumber">
                <el-input v-model="PreclusionCourseForm.courseNumber" readonly></el-input>
              </el-form-item>
              <el-form-item label="Course Credit :" prop="credit">
                <el-input v-model="PreclusionCourseForm.credit" readonly></el-input>
              </el-form-item>
              <el-form-item label="Course Description:">
                <el-input type="textarea" rows="5" v-model="PreclusionCourseForm.courseDesc" readonly></el-input>
              </el-form-item>

            </el-form>
          </div>
        </el-card>

      </div>
    </el-drawer>
    <!--    drawer for add new Clazz-->
    <el-drawer
        title="add a new Clazz under the given course"
        :with-header="addClazzDrawerProp.withHeader"
        size="50%"
        :append-to-body="addClazzDrawerProp.appendToBody"
        :visible.sync="addClazzDrawerProp.editDrawVisible"
        :direction="addClazzDrawerProp.direction"
        :modal="addClazzDrawerProp.model"
        :before-close="cancelForm">
      <div class="demo-drawer__content" style="height: 105%">
        <el-card shadow="hover" style="height:100%;">
          <div slot="header" class="clearfix" style="text-align: left">
            <a style="font-size: large;color: #20a0ff">Schedule new class under
              {{ this.courseInfo.courseSubject }}{{ this.courseInfo.courseNumber }}</a>
            <el-button-group style="float: right">
              <el-button type="danger" @click="cancelForm" style="width: 80px">Cancel
              </el-button>
              <el-button type="primary" @click="saveNewPreclusionCourse" :loading="loading"
                         style="width: 80px">{{ loading ? 'Submitting ...' : 'Submit' }}
              </el-button>
            </el-button-group>
          </div>
          <div class="form-box" style="width: 97%;">
            <div style="width: 100%;float: left">
              <el-form ref="form" :model="addClazzForm" :rules="addClazzRules"
                       style="text-align: left;" label-width="auto" :label-position="'right'">
                <el-divider content-position="center"><i class="el-icon-lx-search"></i> Basic
                  Information
                </el-divider>
                <div style="width: 45%;float: left">
                  <el-form-item label="Professor : " prop="Professor">
                    <el-select v-model="addClazzForm.profId" filterable placeholder="Please schedule professor" style="width: 100%">
                      <el-option
                          v-for="item in professorList"
                          :key="item.userId"
                          :label="item.name"
                          :value="item.userId">
                      </el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item label="Section :" prop="Section">
                    <el-input v-model="addClazzForm.section" style="width: 100%"></el-input>
                  </el-form-item>
                  <el-form-item label="enrolled :" prop="enrolled">
                    <el-input v-model="addClazzForm.enrolled" style="width: 100%"></el-input>
                  </el-form-item>
                  <el-form-item label="Enroll Capacity :" prop="enrollCapacity">
                    <el-input v-model="addClazzForm.enrollCapacity" style="width: 100%"></el-input>
                  </el-form-item>
                  <el-form-item label="Enroll Deadline :" prop="enrollDeadline">
                    <el-date-picker
                        v-model="addClazzForm.enrollDeadline"
                        type="datetime"
                        placeholder="Set Enroll Deadline"
                        default-time="12:00:00"
                        style="width: 100%">
                    </el-date-picker>
                  </el-form-item>
                  <el-form-item label="Drop no Penalty :" prop="dropNoPenaltyDeadline">
                    <el-date-picker
                        v-model="addClazzForm.dropNoPenaltyDeadline"
                        type="datetime"
                        placeholder="Set Drop Deadline"
                        default-time="12:00:00"
                        style="width: 100%">
                    </el-date-picker>
                  </el-form-item>
                  <el-form-item label="Drop no Fail :" prop="dropNoFailDeadline">
                    <el-date-picker
                        v-model="addClazzForm.dropNoFailDeadline"
                        type="datetime"
                        placeholder="Set Drop Deadline"
                        default-time="12:00:00"
                        style="width: 100%">
                    </el-date-picker>
                  </el-form-item>
                </div>
                <div style="width: 50%;float: right;height: 100%">
                  <el-form-item label="Class Description : " prop="Description">
                    <el-input type="textarea" rows="17" v-model="addClazzForm.classDesc"></el-input>
                  </el-form-item>
                </div>
              </el-form>
            </div>

            <div style="width: 100%;float: left">
              <el-divider content-position="center"><i class="el-icon-lx-search"></i> Schedules
              </el-divider>
              <el-form :model="scheduleForm" class="demo-form-inline" label-width="auto">
                <div style="width: 100%;">
                  <el-card shadow="hover" style="height: 360px;width: 45%;float: left;margin: 10px"
                           v-for="(item, index) in addClazzForm.schedules" :key="index">
                    <div slot="header" class="clearfix">
                      <span>Class schedule {{ index }}</span>
                      <el-button style="float: right; padding: 3px 0" type="text" @click="addClazzTimeSchedule">add
                      </el-button>
                    </div>
                    <el-form-item label="WeekDay : " :prop="'schedules.'+ index+'.weekDay'" :rules="addWeekDayRule">
                      <el-select v-model="item.weekDay" filterable placeholder="the class day" style="width: 88%">
                        <el-option
                            v-for="weekDay in weekDayList"
                            :key="weekDay"
                            :label="weekDay"
                            :value="weekDay">
                        </el-option>
                      </el-select>
                    </el-form-item>
                    <el-form-item label="Start Time:" :prop="'schedules.'+ index+'.startTime'">
                      <el-time-select placeholder="Start Time" v-model="item.startTime"
                                      :picker-options="{ start: '08:00', step: '00:15', end: '20:30'}" style="width: 88%">
                      </el-time-select>
                    </el-form-item>
                    <el-form-item label="End Time:" :prop="'schedules.'+ index+'.endTime'">
                      <el-time-select placeholder="End Time" v-model="item.endTime"
                                      :picker-options="{ start: '08:00',step: '00:15',end: '20:30',minTime: item.startTime}" style="width: 88%">
                      </el-time-select>
                    </el-form-item>
                    <el-form-item label="Room Capacity:" :prop="'schedules.'+ index+'.roomCapacityAsked'">
                      <el-select v-model="item.roomCapacityAsked" filterable placeholder="Size" style="width: 88%">
                        <el-option
                            v-for="item in roomCapacityList"
                            :key="item.roomCapacity"
                            :label="item.roomCapacity"
                            :value="item.roomCapacity">
                        </el-option>
                      </el-select>
                    </el-form-item>
                    <el-form-item label="Available Room" :prop="'schedules.'+ index+'.roomId'">
                      <el-select v-model="item.roomId" filterable placeholder="Available Rooms" style="width: 88%">
                        <el-option
                            v-for="item in availableRoomList"
                            :key="item.roomId"
                            :label="item.roomId"
                            :value="item.roomId">
                        </el-option>
                      </el-select>
                    </el-form-item>
                    <!--                    <el-button type="primary" style="float: right" round @click="addClazzTimeSchedule">add Schedule</el-button>-->
                  </el-card>
                </div>
              </el-form>
            </div>
          </div>
        </el-card>
      </div>
    </el-drawer>
  </div>
</template>

<script>
import axios from "axios";
import qs from "qs";

export default {
  name: "CourseModify",
  inject: ['reload'],
  data() {
    let getCourseInfoForPrerequisite = (rule, value, callback) => {
      if (value !== '') {
        axios.get('http://localhost:8080/admin/course/getCourseBySubjectAndNumber/' + this.addPrerequisiteForm.courseSubject + '/' + this.addPrerequisiteForm.courseNumber).then(resp => {
          if (resp.data === null) {
            callback('can not find this course')
          } else {
            console.log(resp.data)
            this.PrerequisiteCourseForm = resp.data
            callback();
          }
        })
      } else {
        callback('invalid input');
      }
    };
    let getCourseInfoForPreclusion = (rule, value, callback) => {
      if (value !== '') {
        axios.get('http://localhost:8080/admin/course/getCourseBySubjectAndNumber/' + this.addPreclusionForm.courseSubject + '/' + this.addPreclusionForm.courseNumber).then(resp => {
          if (resp.data === null) {
            callback('can not find this course')
          } else {
            console.log(resp.data)
            this.PreclusionCourseForm = resp.data
            callback();
          }
        })
      } else {
        callback('invalid input');
      }
    };
    let getRelatedCourseNumber = (rule, value, callback) => {
      console.log(value)
      if (value !== '') {
        axios.get('http://localhost:8080/admin/course/getCourseBySubject/' + value).then(resp => {
          if (resp.data === null) {
            callback('Can not find a course number!')
          } else {
            console.log(resp.data)
            this.courseNumberList = resp.data
            callback();
          }
        })
      } else {
        callback('invalid input');
      }
    };
    return {

      courseInfo: {},
      clazzData: [],

      multipleSelection: [],
      delList: [],
      editVisible: false,

      loading: false,
      timer: null,

      credit: '',

      editCourseForm: {},

      editCourseRules: {
        courseName:
            [
              {required: true, message: 'Course name can not be none', trigger: 'blur'}
            ],
        courseSubject:
            [
              {required: true, message: 'Course subject can not be none', trigger: 'blur'}
            ],
        courseNumber:
            [
              {required: true, message: 'Course number can not be none', trigger: 'blur'}
            ],
        credit:
            [
              {required: true, message: 'Course credit can not be none', trigger: 'blur'}
            ],
        courseDesc:
            [
              {required: true, message: 'Course description can not be none', trigger: 'blur'}
            ]
      },
      addPrerequisiteCourseRules: {
        courseSubject:
            [
              {required: true, message: 'Course subject can not be none', trigger: 'blur'},
              {validator: getRelatedCourseNumber, trigger: ['blur', 'change']}
            ],
        courseNumber:
            [
              {required: true, message: 'Course number can not be none', trigger: 'blur'},
              {validator: getCourseInfoForPrerequisite, trigger: ['blur', 'change']}
            ],
      },
      addPreclusionCourseRules: {
        courseSubject:
            [
              {required: true, message: 'Course subject can not be none', trigger: 'blur'},
              {validator: getRelatedCourseNumber, trigger: ['blur', 'change']}
            ],
        courseNumber:
            [
              {required: true, message: 'Course number can not be none', trigger: 'blur'},
              {validator: getCourseInfoForPreclusion, trigger: ['blur', 'change']}
            ],
      },


      drawerProp: {
        direction: 'rtl',
        editDrawVisible: false,
        withHeader: false,
        appendToBody: true,
        model: false
      },

      PreclusionCourses: [],
      PrerequisiteCourses: [],

      addPreclusionDrawerProp: {
        direction: 'rtl',
        editDrawVisible: false,
        withHeader: false,
        appendToBody: true,
        model: false
      },
      addPrerequisiteDrawerProp: {
        direction: 'rtl',
        editDrawVisible: false,
        withHeader: false,
        appendToBody: true,
        model: false
      },
      addClazzDrawerProp: {
        direction: 'rtl',
        editDrawVisible: false,
        withHeader: false,
        appendToBody: true,
        model: false
      },
      query: {
        address: '',
        name: '',
        pageIndex: 1,
        pageSize: 10
      },
      formLabelWidth: '100px',
      courseId: '',

      courseSubjectList: [],
      courseNumberList: [],

      PrerequisiteCourseForm: {},
      addPrerequisiteForm: {},
      prerequisiteList: [],

      PreclusionCourseForm: {},
      addPreclusionForm: {},
      preclusionList: [],

      addClazzForm: {
        schedules: [{
          weekDay: '',
          startTime: '',
          endTime: '',
          roomCapacityAsked: '',
          roomId: '',
        }],
        courseId: '',
        classStatus: '',
        section: '',
        enrolled: '',
        enrollCapacity: '',
        profId: '',
        enrollDeadline: '',
        dropNoPenaltyDeadline: '',
        dropNoFailDeadline: '',
        classDesc: '',
      },
      scheduleForm: {},
      professorList: [],

      weekDayList: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
    };

  },
  methods: {
    onSubmit() {
      this.$message.success('提交成功！');
    },
    onEditCourse() {
      this.drawerProp.editDrawVisible = true;
    },
    //delete course
    onDeleteCourse() {
      // Double check
      this.$confirm('Are you sure you want to delete this course : "' + this.courseInfo.courseSubject + this.courseInfo.courseNumber + "  " + this.courseInfo.courseName + '" ?', 'Check', {
        type: 'warning'
      })
          .then(() => {
            axios.delete('http://localhost:8080/admin/course/delete/' + this.courseInfo.courseId).then(resp => {
              if (resp.data === "success") {
                this.$notify({
                  title: 'Success',
                  message: 'Delete successfully!',
                  type: 'success'
                });
                this.reload()
                this.$router.push('/admin/courses');
              } else {
                this.$notify.error({
                  title: 'Error',
                  message: 'Ops,Something goes wrong!',
                });
              }
              console.log(resp);
            })

          })
          .catch(() => {
          });
    },
    saveCourseEdit() {
      this.editCourseForm.courseId = this.courseInfo.courseId
      this.timer = setTimeout(() => {
        // 动画关闭需要一定的时间
        setTimeout(() => {
          this.loading = false;
        }, 400);
      }, 2000);
      axios.post("http://localhost:8080/admin/course/update", this.editCourseForm).then(resp => {
        console.log(resp)
        if (resp.data === "success") {
          this.loading = false;
          this.drawerProp.addTaskDrawer = false;
          this.reload()
          clearTimeout(this.timer);
          this.$notify({
            title: 'Success',
            message: 'Update a course successfully!',
            type: 'success'
          });

        } else {
          this.loading = false;
          this.drawerProp.addTaskDrawer = false;
          this.reload()
          clearTimeout(this.timer);
          this.$notify.error({
            title: 'Error',
            message: 'Invalid Change!',
          });
        }

      })
    },
    cancelForm() {
      this.loading = false;
      this.drawerProp.editDrawVisible = false;
      this.addPrerequisiteDrawerProp.editDrawVisible = false;
      this.addPreclusionDrawerProp.editDrawVisible = false;
      this.addClazzDrawerProp.editDrawVisible = false;
      clearTimeout(this.timer);
    },

    openAddPrerequisiteDrawer() {
      axios.get('http://localhost:8080/admin/course/addPage/getSubject').then(resp => {
        this.courseSubjectList = resp.data
        console.log(this.courseSubjectList)
      })
      this.addPrerequisiteDrawerProp.editDrawVisible = true;
    },
    saveNewPrerequisiteCourse() {
      if (this.loading) {
        return;
      }
      this.$confirm('Confirm to submit？')
          .then(_ => {
            this.prerequisiteCourseId = this.PrerequisiteCourseForm.courseId

            console.log(this.prerequisiteCourseId)

            this.loading = true;
            this.timer = setTimeout(() => {
              // 动画关闭需要一定的时间
              setTimeout(() => {
                this.loading = false;
              }, 400);
            }, 2000);
            axios.post("http://localhost:8080/admin/course/addPage/addPrerequisite/", qs.stringify({
              'prerequisiteCourseId': this.prerequisiteCourseId,
              'courseId': this.courseInfo.courseId,
            }), {headers: {'Content-Type': 'application/x-www-form-urlencoded'}}).then(resp => {
              console.log(resp)
              if (resp.data === "success") {
                this.loading = false;
                this.addPrerequisiteDrawerProp.editDrawVisible = false
                this.reload()
                clearTimeout(this.timer);
                this.$notify({
                  title: 'Success',
                  message: 'Add a new prerequisite course!',
                  type: 'success'
                });

              } else {
                this.loading = false;
                this.addPrerequisiteDrawerProp.editDrawVisible = false
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
    handleDeletePrerequisite(row) {
      this.$confirm('Delete this Prerequisite course : \n"' + row.courseSubject + row.courseNumber + "  " + row.courseName + '" ?', 'Check', {
        type: 'warning'
      })
          .then(() => {
            axios.delete('http://localhost:8080/admin/course/CourseInfo/deleteCoursePrerequisite/' + this.courseInfo.courseId + '/' + row.courseId).then(resp => {
              if (resp.data === "success") {
                this.loading = false;
                this.reload()
                clearTimeout(this.timer);
                this.$notify({
                  title: 'Success',
                  message: 'Delete successfully!',
                  type: 'success'
                });
              } else {
                this.$notify.error({
                  title: 'Error',
                  message: 'Ops,Something goes wrong!',
                });
              }
              console.log(resp);
            })

          })
          .catch(() => {
          });
    },

    openAddPreclusionDrawer() {
      axios.get('http://localhost:8080/admin/course/addPage/getSubject').then(resp => {
        this.courseSubjectList = resp.data
        console.log(this.courseSubjectList)
      })
      this.addPreclusionDrawerProp.editDrawVisible = true;
    },
    saveNewPreclusionCourse() {
      if (this.loading) {
        return;
      }
      this.$confirm('Confirm to submit new Preclusion course？')
          .then(_ => {
            this.preclusionCourseId = this.PreclusionCourseForm.courseId
            this.loading = true;
            this.timer = setTimeout(() => {
              // 动画关闭需要一定的时间
              setTimeout(() => {
                this.loading = false;
              }, 400);
            }, 2000);
            axios.post("http://localhost:8080/admin/course/addPage/addPreclusion/", qs.stringify({
              'preclusionCourseId': this.preclusionCourseId,
              'courseId': this.courseInfo.courseId,
            }), {headers: {'Content-Type': 'application/x-www-form-urlencoded'}}).then(resp => {
              console.log(resp)
              if (resp.data === "success") {
                this.loading = false;
                this.addPreclusionDrawerProp.editDrawVisible = false
                this.reload()
                clearTimeout(this.timer);
                this.$notify({
                  title: 'Success',
                  message: 'Add a new prerequisite course!',
                  type: 'success'
                });
              } else {
                this.loading = false;
                this.addPreclusionDrawerProp.editDrawVisible = false
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
    handleDeletePreclusion(row) {
      this.$confirm('Delete this Preclusion course : \n"' + row.courseSubject + row.courseNumber + "  " + row.courseName + '" ?', 'Check', {
        type: 'warning'
      })
          .then(() => {
            axios.delete('http://localhost:8080/admin/course/CourseInfo/deleteCoursePreclusion/' + this.courseInfo.courseId + '/' + row.courseId).then(resp => {
              if (resp.data === "success") {
                this.loading = false;
                this.reload()
                clearTimeout(this.timer);
                this.$notify({
                  title: 'Success',
                  message: 'Delete successfully!',
                  type: 'success'
                });
              } else {
                this.$notify.error({
                  title: 'Error',
                  message: 'Ops,Something goes wrong!',
                });
              }
              console.log(resp);
            })

          })
          .catch(() => {
          });
    },

    openAddClazzDrawer() {
      this.addClazzDrawerProp.editDrawVisible = true;
    },
    addClazzTimeSchedule() {
      this.addClazzForm.schedules.push({
        weekDay: '',
        startTime: '',
        endTime: '',
        roomCapacityAsked: '',
        roomId: '',
      });
    },

  },
  created() {
    axios.get('http://localhost:8080/admin/course/getCourseById/' + this.$route.params.courseId).then(resp => {
      console.log(this.$route.params.courseId)
      this.courseInfo = resp.data
    })
    axios.get('http://localhost:8080/admin/course/getCourseById/' + this.$route.params.courseId).then(resp => {
      this.editCourseForm = resp.data
    })
    axios.get('http://localhost:8080/admin/course/CourseInfo/getCoursePrerequisite/' + this.$route.params.courseId).then(resp => {
      this.PrerequisiteCourses = resp.data
      console.log(this.PrerequisiteCourses)
    })
    axios.get('http://localhost:8080/admin/course/CourseInfo/getCoursePreclusion/' + this.$route.params.courseId).then(resp => {
      this.PreclusionCourses = resp.data
      console.log(this.PreclusionCourses)
    })
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


</style>

<style lang="scss">
.el-drawer.rtl {
  overflow: scroll
}
</style>
