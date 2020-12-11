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
            <el-card shadow="hover" style="height:450px;">
              <div slot="header" class="clearfix" style="text-align: left">
                <a style="font-size: large;color: #20a0ff">The related classes of this course</a>
                <el-button style="float: right; padding: 3px 0" type="text"
                           @click="openAddClazzDrawer">Add new
                </el-button>
              </div>
              <el-table
                  :data="clazzData"
                  style="width:100%;" height="350" @expand-change="handleSubTableData">
                <el-table-column type="expand">
                  <template slot-scope="props">
                    <div style="float: left;width: 45%">
                      <el-form label-position="left" inline>
                        <el-form-item label="ClassId : " style="width: 48%">
                          <span>{{ props.row.classId }}</span>
                        </el-form-item>
                        <el-form-item label="Section : " style="width: 48%">
                          <span>{{ props.row.section }}</span>
                        </el-form-item>
                        <el-form-item label="Drop No Penalty : " style="width: 48%">
                          <span>{{ props.row.dropNoPenaltyDeadline | FormatDate('yyyy-MM-dd HH:mm:ss') }}</span>
                        </el-form-item>
                        <el-form-item label="Drop No Fail : " style="width: 48%">
                          <span>{{ props.row.dropNoFailDeadline | FormatDate('yyyy-MM-dd HH:mm:ss') }}</span>
                        </el-form-item>
                        <el-form-item label="Enrolled : " style="width: 48%">
                          <span>{{ props.row.enrolled }}</span>
                        </el-form-item>
                        <el-form-item label="Enroll Capacity : " style="width: 48%">
                          <span>{{ props.row.enrollCapacity }}</span>
                        </el-form-item>
                        <el-form-item label="Enroll Rate : " style="width: 90%">"
                          <el-progress type="circle"
                                       :percentage=(props.row.enrolled*100/props.row.enrollCapacity).toFixed(0)
                          ></el-progress>
                        </el-form-item>
                        <el-form-item label="Description : " style="width: 90%">
                          <span>{{ props.row.classDesc }}</span>
                        </el-form-item>
                      </el-form>
                    </div>
                    <div style="float: right;width: 55%">
                      <el-table
                          :data="props.row.schedules"
                          stripe
                          style="width: 100%;text-align: center">
                        <el-table-column
                            type="index"
                            label="Schedules"
                            width="80px"
                        >
                        </el-table-column>
                        <el-table-column
                            prop="roomId"
                            label="Room Id"
                        >
                        </el-table-column>
                        <el-table-column
                            prop="weekday"
                            label="Weekday"
                        >
                        </el-table-column>
                        <el-table-column
                            prop="startTime"
                            label="Start time"
                        >
                        </el-table-column>
                        <el-table-column
                            prop="endTime"
                            label="Ent time"
                        >
                        </el-table-column>
                      </el-table>
                    </div>
                  </template>
                </el-table-column>
                <el-table-column
                    label="Class ID"
                    prop="classId">
                </el-table-column>
                <el-table-column
                    label="Section"
                    prop="section">
                </el-table-column>
                <el-table-column
                    label="Professor">
                  <template slot-scope="scope">
                    <el-popover trigger="hover" placement="top">
                      <div class="user-info-list" style="text-align: left;">
                        <div class="user-info-name"><label> ID : </label>
                          <span> {{ scope.row.profId }}</span>
                        </div>
                        <div class="user-info-name" style="margin-top: 20px"><label> Email : </label>
                          <span> {{
                              professorList.find(professor => professor.userId === scope.row.profId).email
                            }}</span>
                        </div>
                      </div>
                      <div slot="reference" class="name-wrapper">
                        <el-tag size="medium">
                          {{ professorList.find(professor => professor.userId === scope.row.profId).name }}
                        </el-tag>
                      </div>
                    </el-popover>
                  </template>
                </el-table-column>
                <el-table-column label="Status" align="center">
                  <template slot-scope="scope">
                    <el-tag
                        :type="scope.row.classStatus==='open'?'success':scope.row.classStatus==='close'?'primary':scope.row.classStatus==='cancel'?'danger':''"
                    >{{ scope.row.classStatus }}
                    </el-tag>
                  </template>
                </el-table-column>
                <el-table-column label="Operator" align="center">
                  <template slot-scope="scope">
                    <el-button
                        type="text"
                        icon="el-icon-edit"
                        @click="handleClassEdit(scope.$index, scope.row)"
                    >Modify
                    </el-button>
                    <el-button
                        type="text"
                        icon="el-icon-delete"
                        class="red"
                        @click="handleClassDelete(scope.$index, scope.row)"
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
            <el-form ref="editCourseForm" :model="editCourseForm" :rules="editCourseRules"
                     style="text-align: left;margin-top: 5%">

              <el-form-item label="Course Name :" prop="courseName" label-width="formLabelWidth" style="margin-top: 5%">
                <el-input v-model="editCourseForm.courseName"></el-input>
              </el-form-item>
              <el-form-item label="Course Subject :" prop="courseSubject">
                <el-input v-model="editCourseForm.courseSubject" readonly></el-input>
              </el-form-item>
              <el-form-item label="Course Number :" prop="courseNumber">
                <el-input v-model.number="editCourseForm.courseNumber"></el-input>
              </el-form-item>
              <el-form-item label="Course Credit :" prop="credit">
                <el-input v-model.number="editCourseForm.credit"></el-input>
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
            <el-form ref="addPrerequisiteForm" :model="addPrerequisiteForm" :rules="addPrerequisiteCourseRules"
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
            <el-form ref="addPreclusionForm" :model="addPreclusionForm" :rules="addPreclusionCourseRules"
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
              <el-button type="primary" @click="saveNewClazz('addClazzForm')" :loading="loading"
                         style="width: 80px">{{ loading ? 'Submitting ...' : 'Submit' }}
              </el-button>
            </el-button-group>
          </div>
          <div class="form-box" style="width: 97%;">
            <div style="width: 100%;float: left">
              <el-form ref="addClazzForm" :model="addClazzForm" :rules="addClazzRules"
                       style="text-align: left;" label-width="auto" :label-position="'right'">
                <el-divider content-position="center"><i class="el-icon-lx-search"></i> Basic
                  Information
                </el-divider>
                <div style="width: 45%;float: left">
                  <el-form-item label="Professor : " prop="profId">
                    <el-select v-model="addClazzForm.profId" filterable placeholder="Please schedule professor"
                               style="width: 100%">
                      <el-option
                          v-for="item in professorList"
                          :key="item.userId"
                          :label="item.name"
                          :value="item.userId">
                      </el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item label="Section :" prop="section">
                    <el-input v-model.number="addClazzForm.section" placeholder="Please input the section"
                              style="width: 100%"></el-input>
                  </el-form-item>
                  <el-form-item label="enrolled :" prop="enrolled">
                    <el-input v-model.number="addClazzForm.enrolled" style="width: 100%"></el-input>
                  </el-form-item>
                  <el-form-item label="Enroll Capacity :" prop="enrollCapacity">
                    <el-input v-model.number="addClazzForm.enrollCapacity" placeholder="Larger than Enrolled"
                              style="width: 100%"></el-input>
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
                    <el-input type="textarea" rows="17" v-model="addClazzForm.classDesc"
                              placeholder="Please write something about the class,Here!"></el-input>
                  </el-form-item>
                </div>


                <div style="width: 100%;float: left">
                  <el-divider content-position="center"><i class="el-icon-lx-search"></i> Schedules
                  </el-divider>

                  <div style="width: 100%;">

                    <el-card shadow="hover" style="height: 360px;width: 45%;float: left;margin: 10px"
                             v-for="(schedule, index) in addClazzForm.schedules" :key="index">
                      <div slot="header" class="clearfix">
                        <span>Class schedule {{ index }}</span>
                        <!--                        <el-button style="float: right; padding: 3px 0" type="text" @click="addClazzTimeSchedule">Save-->
                        <!--                        </el-button>-->
                        <el-button-group style="float: right">
                          <el-button type="danger" icon="el-icon-delete"
                                     @click="delClazzTimeSchedule(index)"></el-button>
                          <el-button type="primary" icon="el-icon-plus" @click="addClazzTimeSchedule"></el-button>
                        </el-button-group>
                      </div>
                      <el-form-item
                          label="Weekday : "
                          :prop="'schedules.'+ index+'.weekday'"
                          :rules="weekday">
                        <el-select v-model="schedule.weekday" filterable placeholder="the class day"
                                   style="width: 88%">
                          <el-option
                              v-for="weekday in weekdayList"
                              :key="weekday.Value"
                              :label="weekday.Name"
                              :value="weekday.Value">
                          </el-option>
                        </el-select>
                      </el-form-item>
                      <el-form-item label="Start Time : "
                                    :prop="'schedules.' + index + '.startTime'"
                                    :rules="addStartTimeRule">
                        <el-time-select placeholder="Start Time" v-model="schedule.startTime"
                                        :picker-options="{ start: '08:00', step: '00:15', end: '20:30'}"
                                        style="width: 88%">
                        </el-time-select>
                      </el-form-item>
                      <el-form-item label="End Time:"
                                    :prop="'schedules.'+ index+'.endTime'"
                                    :rules="addEndTimeRule">
                        <el-time-select placeholder="End Time" v-model="schedule.endTime"
                                        :picker-options="{ start: '08:00',step: '00:15',end: '20:30',minTime: schedule.startTime}"
                                        style="width: 88%">
                        </el-time-select>
                      </el-form-item>
                      <el-form-item label="Room Capacity:"
                                    :prop="'schedules.'+ index+'.roomCapacityAsked'"
                                    :rules="addRoomCapacityRule">
                        <el-select v-model="schedule.roomCapacityAsked" filterable placeholder="Room size request"
                                   style="width: 88%" @change="getAvailableRoom(index,schedule)">
                          <el-option
                              v-for="item in roomCapacityList"
                              :key="item"
                              :label="item"
                              :value="item">
                          </el-option>
                        </el-select>
                      </el-form-item>
                      <el-form-item label="Available Room"
                                    :prop="'schedules.'+ index+'.roomId'"
                                    :rules="availableRoomRule">
                        <el-select v-model="schedule.roomId" filterable placeholder="Available Rooms"
                                   style="width: 88%">
                          <el-option
                              v-for="item in availableRoomList"
                              :key="item.roomId"
                              :label="'Room: '+item.roomId"
                              :value="item.roomId">
                          </el-option>
                        </el-select>
                      </el-form-item>

                      <!--                    <el-button type="primary" style="float: right" round @click="addClazzTimeSchedule">add Schedule</el-button>-->
                    </el-card>
                  </div>

                </div>
              </el-form>
            </div>
          </div>
        </el-card>
      </div>
    </el-drawer>
    <!--    drawer for edit Clazz-->
    <el-drawer
        title="add a new Clazz under the given course"
        :with-header="editClazzDrawerProp.withHeader"
        size="50%"
        :append-to-body="editClazzDrawerProp.appendToBody"
        :visible.sync="editClazzDrawerProp.editDrawVisible"
        :direction="editClazzDrawerProp.direction"
        :modal="editClazzDrawerProp.model"
        :before-close="cancelForm">
      <div class="demo-drawer__content" style="height: 105%">
        <el-card shadow="hover" style="height:100%;">
          <div slot="header" class="clearfix" style="text-align: left">
            <a style="font-size: large;color: #20a0ff">Edit class</a>
            <el-button-group style="float: right">
              <el-button type="danger" @click="cancelForm" style="width: 80px">Cancel
              </el-button>
              <el-button type="primary" @click="saveNewEditClazz('editClazzForm')" :loading="loading"
                         style="width: 80px">{{ loading ? 'Submitting ...' : 'Submit' }}
              </el-button>
            </el-button-group>
          </div>
          <div class="form-box" style="width: 97%;">
            <div style="width: 100%;float: left">
              <el-form ref="editClazzForm" :model="editClazzForm" :rules="editClazzRules"
                       style="text-align: left;" label-width="auto" :label-position="'right'">
                <el-divider content-position="center"><i class="el-icon-lx-search"></i> Basic
                  Information
                </el-divider>
                <div style="width: 45%;float: left">
                  <el-form-item label="Professor : " prop="profId">
                    <el-select v-model="editClazzForm.profId" filterable placeholder="Please schedule professor"
                               style="width: 100%">
                      <el-option
                          v-for="item in professorList"
                          :key="item.userId"
                          :label="item.name"
                          :value="item.userId">
                      </el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item label="Section :" prop="section">
                    <el-input v-model.number="editClazzForm.section" placeholder="Please input the section"
                              style="width: 100%"></el-input>
                  </el-form-item>
                  <el-form-item label="Class Status : " prop="classStatus">
                    <el-select v-model="editClazzForm.classStatus" filterable placeholder="Please Select Status"
                               style="width: 100%">
                      <el-option
                          v-for="status in statusList"
                          :key="status.Value"
                          :label="status.Name"
                          :value="status.Value">
                      </el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item label="enrolled :" prop="enrolled">
                    <el-input v-model.number="editClazzForm.enrolled" style="width: 100%"></el-input>
                  </el-form-item>
                  <el-form-item label="Enroll Capacity :" prop="enrollCapacity">
                    <el-input v-model.number="editClazzForm.enrollCapacity" placeholder="Larger than Enrolled"
                              style="width: 100%"></el-input>
                  </el-form-item>
                  <el-form-item label="Enroll Deadline :" prop="enrollDeadline">
                    <el-date-picker
                        v-model="editClazzForm.enrollDeadline"
                        type="datetime"
                        placeholder="Set Enroll Deadline"
                        default-time="12:00:00"
                        style="width: 100%">
                    </el-date-picker>
                  </el-form-item>
                  <el-form-item label="Drop no Penalty :" prop="dropNoPenaltyDeadline">
                    <el-date-picker
                        v-model="editClazzForm.dropNoPenaltyDeadline"
                        type="datetime"
                        placeholder="Set Drop Deadline"
                        default-time="12:00:00"
                        style="width: 100%">
                    </el-date-picker>
                  </el-form-item>
                  <el-form-item label="Drop no Fail :" prop="dropNoFailDeadline">
                    <el-date-picker
                        v-model="editClazzForm.dropNoFailDeadline"
                        type="datetime"
                        placeholder="Set Drop Deadline"
                        default-time="12:00:00"
                        style="width: 100%">
                    </el-date-picker>
                  </el-form-item>
                </div>
                <div style="width: 50%;float: right;height: 100%">
                  <el-form-item label="Class Description : " prop="Description">
                    <el-input type="textarea" rows="17" v-model="editClazzForm.classDesc"
                              placeholder="Please write something about the class,Here!"></el-input>
                  </el-form-item>
                </div>


                <div style="width: 100%;float: left">
                  <el-divider content-position="center"><i class="el-icon-lx-search"></i> Schedules
                  </el-divider>

                  <div style="width: 100%;">

                    <el-card shadow="hover" style="height: 360px;width: 45%;float: left;margin: 10px"
                             v-for="(schedule, index) in editClazzForm.schedules" :key="index">
                      <div slot="header" class="clearfix">
                        <span>Class schedule {{ index }}</span>
                        <!--                        <el-button style="float: right; padding: 3px 0" type="text" @click="addClazzTimeSchedule">Save-->
                        <!--                        </el-button>-->
                        <el-button-group style="float: right">
                          <el-button type="danger" icon="el-icon-delete"
                                     @click="delClazzTimeSchedule(index)"></el-button>
                          <el-button type="primary" icon="el-icon-plus" @click="addClazzTimeSchedule"></el-button>
                        </el-button-group>
                      </div>
                      <el-form-item
                          label="Weekday : "
                          :prop="'schedules.'+ index+'.weekday'"
                          :rules="weekday">
                        <el-select v-model="schedule.weekday" filterable placeholder="the class day"
                                   style="width: 88%">
                          <el-option
                              v-for="weekday in weekdayList"
                              :key="weekday.Value"
                              :label="weekday.Name"
                              :value="weekday.Value">
                          </el-option>
                        </el-select>
                      </el-form-item>
                      <el-form-item label="Start Time : "
                                    :prop="'schedules.' + index + '.startTime'"
                                    :rules="addStartTimeRule">
                        <el-time-select placeholder="Start Time" v-model="schedule.startTime"
                                        :picker-options="{ start: '08:00', step: '00:15', end: '20:30'}"
                                        style="width: 88%">
                        </el-time-select>
                      </el-form-item>
                      <el-form-item label="End Time:"
                                    :prop="'schedules.'+ index+'.endTime'"
                                    :rules="addEndTimeRule">
                        <el-time-select placeholder="End Time" v-model="schedule.endTime"
                                        :picker-options="{ start: '08:00',step: '00:15',end: '20:30',minTime: schedule.startTime}"
                                        style="width: 88%">
                        </el-time-select>
                      </el-form-item>
                      <el-form-item label="Room Capacity:"
                                    :prop="'schedules.'+ index+'.roomCapacityAsked'"
                      >
                        <el-select v-model="schedule.roomCapacityAsked" filterable placeholder="Room size request"
                                   style="width: 88%" @change="getAvailableRoom(index,schedule)">
                          <el-option
                              v-for="item in roomCapacityList"
                              :key="item"
                              :label="item"
                              :value="item">
                          </el-option>
                        </el-select>
                      </el-form-item>
                      <el-form-item label="Available Room"
                                    :prop="'schedules.'+ index+'.roomId'"
                                    :rules="availableRoomRule">
                        <el-select v-model="schedule.roomId" filterable placeholder="Available Rooms"
                                   style="width: 88%">
                          <el-option
                              v-for="item in availableRoomList"
                              :key="item.roomId"
                              :label="'Room: '+item.roomId"
                              :value="item.roomId">
                          </el-option>
                        </el-select>
                      </el-form-item>

                      <!--                    <el-button type="primary" style="float: right" round @click="addClazzTimeSchedule">add Schedule</el-button>-->
                    </el-card>
                  </div>

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
import moment from 'moment'

export default {
  name: "CourseModify",
  inject: ['reload'],
  data: function () {
    let courseNumberValidator = (rule, value, callback) => {
      if (value !== '') {
        axios.get('http://localhost:8080/admin/course/getCourseBySubjectAndNumber/' + this.editCourseForm.courseSubject + "/" + value).then(resp => {
          console.log(resp)
          if (resp) {
            if (!resp.data) {
              callback()
            } else {
              if (resp.data.courseId === this.editCourseForm.courseId) {
                callback()
              }
              callback(new Error('Already exit!'))
            }
          }
          callback(new Error("error"))
        })
      }
    };

    let getCourseInfoForPrerequisite = (rule, value, callback) => {
      if (value !== '') {
        axios.get('http://localhost:8080/admin/course/getCourseBySubjectAndNumber/' + this.addPrerequisiteForm.courseSubject + '/' + this.addPrerequisiteForm.courseNumber).then(resp => {

          if (resp.data === null) {
            callback(new Error('can not find this course'))
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
            callback(new Error('can not find this course'))
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
            callback(new Error('Can not find a course number!'))
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
    let classSectionValidator = (rule, value, callback) => {
      if (value !== '') {
        if (value === '0') {
          callback(new Error('section can not be 0'))
        } else {
          const index = this.clazzData.findIndex(item => item.section === value);
          if (index === -1) {
            callback();
          } else {
            callback(new Error('This section already exists! try another number.'))
          }
        }
      } else {
        callback(new Error('invalid input'));
      }
    };
    let classSectionValidatorForEdit = (rule, value, callback) => {
      if (value !== '') {
        if (value === '0') {
          callback(new Error('section can not be 0'))
        } else {
          const index = this.clazzData.findIndex(item => item.section === value);
          if (index === -1) {
            callback();
          } else {
            if (this.clazzData[index].classId === this.editClazzForm.classId) {
              callback();
            } else {
              callback(new Error('This section already exists! try another number.'))
            }
          }
        }
      } else {
        callback(new Error('invalid input'));
      }
    };
    let classCapacityValidator = (rule, value, callback) => {
      if (value !== '') {
        if (value > 180) {
          callback(new Error('Max room capacity is 180'));
          console.log(this.addClazzForm.enrolled)
        } else if (value <= this.addClazzForm.enrolled) {
          callback(new Error('Minimum should bigger than enrolled'));
        } else {
          callback()
        }
      } else {
        callback()
      }
    };
    let classEnrollDeadlineValidator = (rule, value, callback) => {
      if (value !== null) {
        let oDate1 = new Date(value);
        let oDate2 = new Date();
        if (oDate1.getTime() === oDate2.getTime()) {
          callback(new Error('The Deadline can not be today!'));
        } else if (oDate1.getTime() > oDate2.getTime()) {
          callback();
        } else {
          callback(new Error('Must be in the future!'));
        }
      }
    };
    let classDropNoPenaltyDeadlineValidator = (rule, value, callback) => {
      if (value !== null) {
        let oDate1 = new Date(value);
        let oDate2 = new Date(this.addClazzForm.enrollDeadline);
        if (oDate1.getTime() === oDate2.getTime()) {
          callback(new Error('The Drop Deadline can not be Enroll Deadline!'));
        } else if (oDate1.getTime() > oDate2.getTime()) {
          callback();
        } else {
          callback(new Error('Should after enroll DeadLine!'));
        }
      }
    };
    let classDropNoPenaltyDeadlineValidatorForEdit = (rule, value, callback) => {
      if (value !== null) {
        let oDate1 = new Date(value);
        let oDate2 = new Date(this.editClazzForm.enrollDeadline);
        if (oDate1.getTime() === oDate2.getTime()) {
          callback(new Error('The Drop Deadline can not be Enroll Deadline!'));
        } else if (oDate1.getTime() > oDate2.getTime()) {
          callback();
        } else {
          callback(new Error('Should after enroll DeadLine!'));
        }
      }
    };
    let classDropNoFailDeadlineValidator = (rule, value, callback) => {
      if (value !== null) {
        let oDate1 = new Date(value);
        let oDate2 = new Date(this.addClazzForm.dropNoPenaltyDeadline);
        if (oDate1.getTime() === oDate2.getTime()) {
          callback(new Error('Same with Drop no Penalty'));
        } else if (oDate1.getTime() > oDate2.getTime()) {
          callback();
        } else {
          callback(new Error('Should after Drop no Penalty DeadLine!'));
        }
      }
    };
    let classDropNoFailDeadlineValidatorForEdit = (rule, value, callback) => {
      if (value !== null) {
        let oDate1 = new Date(value);
        let oDate2 = new Date(this.editClazzForm.dropNoPenaltyDeadline);
        if (oDate1.getTime() === oDate2.getTime()) {
          callback(new Error('Same with Drop no Penalty'));
        } else if (oDate1.getTime() > oDate2.getTime()) {
          callback();
        } else {
          callback(new Error('Should after Drop no Penalty DeadLine!'));
        }
      }
    };

    let addWeekdayRuleValidator = (rule, value, callback) => {
      if (value !== null) {
        const arr = this.addClazzForm.schedules.filter(item => item.weekday === value)
        console.log(arr)
        console.log(arr.length)

        if (arr.length === 1 || arr.length === 0) {
          callback()
        } else {
          callback(new Error('Pls schedule to different day!'))
        }
      } else {
        callback(new Error('invalid input!'))
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
              {required: true, message: 'Course number can not be none', trigger: ['blur', 'change']},
              {type: 'number', message: 'Please input correct Number', trigger: ['blur', 'change']},
              {validator: courseNumberValidator, trigger: ['blur', 'change']}
            ],
        credit:
            [
              {required: true, message: 'Course credit can not be none', trigger: 'blur'},
              {type: 'number', message: 'Please input correct Number', trigger: ['blur', 'change']},
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

      addClazzRules: {
        profId:
            [
              {required: true, message: 'Professor can not be none', trigger: ['blur', 'change']},
            ],
        section:
            [
              {required: true, message: 'Section can not be none', trigger: 'blur'},
              {type: 'number', message: 'Please input correct Number', trigger: ['blur', 'change']},
              {validator: classSectionValidator, trigger: ['blur', 'change']}
            ],
        enrolled:
            [
              {required: true, message: 'Enrolled number can not be none', trigger: 'blur'},
              {type: 'number', message: 'Please input correct Number', trigger: ['blur', 'change']},
            ],
        enrollCapacity:
            [
              {required: true, message: 'Capacity can not be none', trigger: 'blur'},
              {type: 'number', message: 'Please input correct Number', trigger: ['blur', 'change']},
              {validator: classCapacityValidator, trigger: ['blur', 'change']}
            ],
        enrollDeadline:
            [
              {required: true, message: 'Enroll Deadline can not be none', trigger: 'blur'},
              {validator: classEnrollDeadlineValidator, trigger: ['blur']}
            ],
        dropNoPenaltyDeadline:
            [
              {required: true, message: 'Deadline can not be none', trigger: 'blur'},
              {validator: classDropNoPenaltyDeadlineValidator, trigger: ['blur']},
            ],
        dropNoFailDeadline:
            [
              {required: true, message: 'Deadline can not be none', trigger: 'blur'},
              {validator: classDropNoFailDeadlineValidator, trigger: ['blur']},
            ]
      },

      editClazzRules: {
        profId:
            [
              {required: true, message: 'Professor can not be none', trigger: ['blur', 'change']},
            ],
        section:
            [
              {required: true, message: 'Section can not be none', trigger: 'blur'},
              {type: 'number', message: 'Please input correct Number', trigger: ['blur', 'change']},
              {validator: classSectionValidatorForEdit, trigger: ['blur', 'change']}
            ],
        classStatus:
            [
              {required: true, message: 'Status can not be none', trigger: ['blur', 'change']},
            ],
        enrolled:
            [
              {required: true, message: 'Enrolled number can not be none', trigger: 'blur'},
              {type: 'number', message: 'Please input correct Number', trigger: ['blur', 'change']},
            ],
        enrollCapacity:
            [
              {required: true, message: 'Capacity can not be none', trigger: 'blur'},
              {type: 'number', message: 'Please input correct Number', trigger: ['blur', 'change']},
              {validator: classCapacityValidator, trigger: ['blur', 'change']}
            ],
        enrollDeadline:
            [
              {required: true, message: 'Enroll Deadline can not be none', trigger: ['blur', 'change']},
              {validator: classEnrollDeadlineValidator, trigger: ['blur']}
            ],
        dropNoPenaltyDeadline:
            [
              {required: true, message: 'Deadline can not be none', trigger: ['blur', 'change']},
              {validator: classDropNoPenaltyDeadlineValidatorForEdit, trigger: ['blur', 'change']},
            ],
        dropNoFailDeadline:
            [
              {required: true, message: 'Deadline can not be none', trigger: ['blur', 'change']},
              {validator: classDropNoFailDeadlineValidatorForEdit, trigger: ['blur', 'change']},
            ]
      },

      weekday: [
        {required: true, message: 'Weekday can not be none', trigger: ['blur', 'change']},
        {validator: addWeekdayRuleValidator, trigger: ['blur', 'change']},
      ],
      addStartTimeRule: [
        {required: true, message: 'Start Time can not be none', trigger: ['blur', 'change']}
      ],
      addEndTimeRule: [
        {required: true, message: 'End Time can not be none', trigger: ['blur', 'change']}
      ],
      addRoomCapacityRule: [
        {required: true, message: 'Room Capacity Request can not be none', trigger: ['blur', 'change']},
      ],
      availableRoomRule: [
        {required: true, message: 'Room Capacity Request can not be none', trigger: ['blur', 'change']}
      ],

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
      editClazzDrawerProp: {
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
          weekday: '',
          startTime: '',
          endTime: '',
          roomCapacityAsked: '',
          roomId: '',
        }],
        courseId: '',
        classStatus: '',
        section: '',
        enrolled: '0',
        enrollCapacity: '',
        profId: '',
        enrollDeadline: '',
        dropNoPenaltyDeadline: '',
        dropNoFailDeadline: '',
        classDesc: '',
      },

      editClazzForm: {
        schedules: [{
          weekday: '',
          startTime: '',
          endTime: '',
          roomCapacityAsked: '',
          roomId: '',
        }],
        courseId: '',
        classStatus: '',
        section: '',
        enrolled: '0',
        enrollCapacity: '',
        profId: '',
        enrollDeadline: '',
        dropNoPenaltyDeadline: '',
        dropNoFailDeadline: '',
        classDesc: '',
      },
      scheduleForm: {},
      professorList: [],

      statusList: [
        {
          Name: "Open",
          Value: "open",
        },
        {
          Name: "Close",
          Value: "close",
        },
        {
          Name: "Cancel",
          Value: "cancel",
        },
      ],
      weekdayList: [
        {
          Name: "Monday",
          Value: "Mon",
        },
        {
          Name: "Tuesday",
          Value: "Tues",
        },
        {
          Name: "Wednesday",
          Value: "Wed",
        },
        {
          Name: "Thursday",
          Value: "Thurs",
        },
        {
          Name: "Friday",
          Value: "Fri",
        },
        {
          Name: "Saturday",
          Value: "Sat",
        },
        {
          Name: "Sunday",
          Value: "Sun",
        },
      ],
      roomCapacityList: [],

      availableRoomList: [],

      editScheduleIndex: 0,

      classBasicInfo: {},

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
      this.$refs.editCourseForm.validate(valid => {
        if (valid) {
          if (this.loading) {
            return;
          }
          this.$confirm('Confirm to submit change？')
              .then(_ => {
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
              })
              .catch(_ => {
              });
        } else {  // invalid input
          this.$message({
            showClose: true,
            message: 'Warning: Please input valid info',
            type: 'warning'
          });
          return false
        }
      })
    },
    cancelForm() {
      this.loading = false;
      this.drawerProp.editDrawVisible = false;
      this.addPrerequisiteDrawerProp.editDrawVisible = false;
      this.addPreclusionDrawerProp.editDrawVisible = false;
      this.addClazzDrawerProp.editDrawVisible = false;
      this.editClazzDrawerProp.editDrawVisible = false;
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
      this.$refs.addPrerequisiteForm.validate(valid => {
        if (valid) {
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
        } else {  // invalid input
          this.$message({
            showClose: true,
            message: 'Warning: Please input valid info',
            type: 'warning'
          });
          return false
        }
      })

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
      this.$refs.addPreclusionForm.validate(valid => {
        if (valid) {
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
        } else {  // invalid input
          this.$message({
            showClose: true,
            message: 'Warning: Please input valid info',
            type: 'warning'
          });
          return false
        }
      })

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
      axios.get('http://localhost:8080/admin/class/getClassroomSizeList').then(resp => {
        this.roomCapacityList = resp.data
        console.log(this.roomCapacityList)
      })
      this.addClazzDrawerProp.editDrawVisible = true;
    },
    addClazzTimeSchedule() {
      this.addClazzForm.schedules.push({
        weekday: '',
        startTime: '',
        endTime: '',
        roomCapacityAsked: '',
        roomId: '',
      });
      console.log(this.addClazzForm)
    },
    delClazzTimeSchedule(index) {
      this.addClazzForm.schedules.splice(index, 1);
      console.log(this.addClazzForm)
    },

    getAvailableRoom(index, schedule) {
      axios.post('http://localhost:8080/admin/class/classroomSchedule/', qs.stringify(schedule), {headers: {'Content-Type': 'application/x-www-form-urlencoded'}}).then(resp => {
        console.log(resp.data)
        if (resp.data === null) {
          this.$notify.error({
            title: 'Error',
            message: 'Ops,Automatic schedule failed',
          });
        } else {
          this.availableRoomList = resp.data
          this.$notify({
            title: 'Success',
            message: 'Automatic classroom schedule Success!',
            type: 'success'
          });
        }
      })
    },

    saveNewClazz(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          if (this.loading) {
            return;
          }
          this.$confirm('Confirm to submit new class？')
              .then(_ => {
                this.scheduleForm = this.addClazzForm.schedules;

                this.classBasicInfo = this.addClazzForm;
                this.$delete(this.classBasicInfo, 'schedules')
                this.classBasicInfo.courseId = this.courseInfo.courseId;
                this.classBasicInfo.classStatus = 'open';

                console.log(this.classBasicInfo);


                this.loading = true;
                this.timer = setTimeout(() => {
                  // 动画关闭需要一定的时间
                  setTimeout(() => {
                    this.loading = false;
                  }, 400);
                }, 2000);

                axios.post("http://localhost:8080/admin/class/addNewClassInfo/", this.classBasicInfo).then(resp => {
                  console.log(resp)
                  if (resp.data != null) {
                    this.scheduleForm.push({
                      profId: resp.data.profId,
                      classId: resp.data.classId,
                    });
                    console.log(this.scheduleForm);
                    axios.post("http://localhost:8080/admin/class/addNewClassSchedules/", this.scheduleForm).then(resp => {
                      console.log(resp)
                      if (resp.data === "success") {
                        this.loading = false;
                        this.addClazzDrawerProp.editDrawVisible = false
                        this.reload()
                        clearTimeout(this.timer);
                        this.$notify({
                          title: 'Success',
                          message: 'Add a new class!',
                          type: 'success'
                        });
                      } else {
                        this.loading = false;
                        this.addClazzDrawerProp.editDrawVisible = false
                        this.reload()
                        clearTimeout(this.timer);
                        this.$notify.error({
                          title: 'Error',
                          message: 'Ops,Something goes wrong!',
                        });
                      }
                    })
                  }
                })

              })
              .catch(_ => {
              });
        } else {  // invalid input
          this.$message({
            showClose: true,
            message: 'Warning: Please input valid info',
            type: 'warning'
          });
        }
      })
    },

    handleSubTableData(row, expandedRows) {
      console.log(row.classId)
      if (expandedRows.length > 0) {
        axios.get('http://localhost:8080/admin/class/getClassSchedulesByClassId/' + row.classId).then(resp => {
          if (resp) {
            this.clazzData.forEach((temp, index) => {
              if (temp.classId === row.classId) {
                this.clazzData[index].schedules = resp.data
              }
            })
          }
        })
      }

    },

    handleClassEdit(index, row) {
      axios.get('http://localhost:8080/admin/class/getClassroomSizeList').then(resp => {
        this.roomCapacityList = resp.data
        console.log(this.roomCapacityList)
      })
      axios.get('http://localhost:8080/admin/class/getClassInfoByCourseId/' + this.$route.params.courseId).then(resp => {
        if (resp) {
          resp.data.map(item => {
            item.schedules = []
          })
          const tempData = resp.data
          axios.get('http://localhost:8080/admin/class/getClassSchedulesByClassId/' + row.classId).then(resp => {
            if (resp) {
              this.clazzData.forEach((temp, index) => {
                if (temp.classId === row.classId) {
                  tempData[index].schedules = resp.data
                  this.editClazzForm = tempData[index]
                }
              })
            }
          })
        }
      })
      console.log(this.editClazzForm)
      this.editClazzDrawerProp.editDrawVisible = true;
    },
    handleClassDelete(index, row) {
      this.$confirm('Delete this class : \n"' + row.classId + " - " + row.section + '" ?', 'Check', {
        type: 'warning'
      })
          .then(() => {
            axios.delete('http://localhost:8080/admin/class/deleteClassByClassId/' + row.classId).then(resp => {
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
    saveNewEditClazz(formName) {
      console.log("asdfg")
      console.log(this.editClazzForm)
      this.$refs[formName].validate(valid => {
        if (valid) {
          if (this.loading) {
            return;
          }
          this.$confirm('Confirm to submit change？')
              .then(_ => {
                this.scheduleForm = this.editClazzForm.schedules;

                this.classBasicInfo = this.editClazzForm;
                this.$delete(this.classBasicInfo, 'schedules')

                this.classBasicInfo.courseId = this.courseInfo.courseId;

                console.log(this.classBasicInfo);


                this.loading = true;
                this.timer = setTimeout(() => {
                  // 动画关闭需要一定的时间
                  setTimeout(() => {
                    this.loading = false;
                  }, 400);
                }, 2000);

                axios.post("http://localhost:8080/admin/class/updateClassInfo/", this.classBasicInfo).then(resp => {
                  console.log(resp)
                  if (resp.data != null) {
                    this.scheduleForm.push({
                      profId: resp.data.profId,
                      classId: resp.data.classId,
                    });
                    axios.post("http://localhost:8080/admin/class/updateClassSchedules/", this.scheduleForm).then(resp => {
                      console.log(resp)
                      if (resp.data === "success") {
                        this.loading = false;
                        this.editClazzDrawerProp.editDrawVisible = false
                        this.reload()
                        clearTimeout(this.timer);
                        this.$notify({
                          title: 'Success',
                          message: 'update the class!',
                          type: 'success'
                        });
                      } else {
                        this.loading = false;
                        this.editClazzDrawerProp.editDrawVisible = false
                        this.reload()
                        clearTimeout(this.timer);
                        this.$notify.error({
                          title: 'Error',
                          message: 'Ops,Something goes wrong!',
                        });
                      }
                    })
                  }
                })

              })
              .catch(_ => {
              });
        } else {  // invalid input
          this.$message({
            showClose: true,
            message: 'Warning: Please input valid info',
            type: 'warning'
          });
        }
      })
    },

  }
  ,
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
    axios.get('http://localhost:8080/admin/class/getProfessorList').then(resp => {
      this.professorList = resp.data
      console.log(this.professorList)
    })
    axios.get('http://localhost:8080/admin/class/getClassInfoByCourseId/' + this.$route.params.courseId).then(resp => {
      if (resp) {
        resp.data.map(item => {
          item.schedules = []
        })
        this.clazzData = resp.data
      }
    })
  }
  ,
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


.mgb20 {
  margin-bottom: 20px;
}

.todo-item {
  font-size: 14px;
}

.demo-table-expand {
  font-size: 0;
}

.demo-table-expand label {
  width: 130px;
  color: #99a9bf;
}

.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 50%;
}

.user-info-list {
  font-size: 15px;
  color: #222;
  line-height: 25px;
}

.user-info-list span {
  margin-left: 5px;
}

.user-info-list label {
  width: 50px;
  float: left;
  text-align: right;
}

</style>

<style lang="scss">
.el-drawer.rtl {
  overflow: scroll
}
</style>
