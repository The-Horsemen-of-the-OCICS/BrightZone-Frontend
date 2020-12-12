<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="8">
        <el-card shadow="hover" class="mgb20" style="height:490px;">
          <img src="@/assets/img/img.jpg" class="user-avator" style="text-align:center;"/>
          <div class="user-info">


          </div>
          <div>
            <div class="user-info-list" style="text-align: left;">
              <div class="user-info-name"><label> User ID : </label> <span> {{ $store.state.account.userId }}</span>
              </div>
            </div>

            <div class="user-info-list" style="text-align: left;">
              <div style="margin-top: 25px" class="user-info-name"><label> User Name : </label>
                <span> {{ $store.state.account.name }}</span>
              </div>
            </div>

            <div class="user-info-list" style="text-align: left;">
              <div style="margin-top: 25px" class="user-info-name"><label> User Role
                : </label><span>{{ $store.state.account.type }}</span></div>
            </div>

            <div class="user-info-list" style="text-align: left;">
              <div style="margin-top: 25px" class="user-info-name"><label> Email Address
                : </label><span>{{ $store.state.account.email }}</span></div>
            </div>
            <div class="user-info-list" style="text-align: left;">
              <div style="margin-top: 25px" class="user-info-name"><label> Last Login Time
                : </label><span>{{ $store.state.account.lastLogin | FormatDate('yyyy-MM-dd HH:mm:ss') }}</span></div>
            </div>
          </div>
        </el-card>
      </el-col>
      <el-col :span="8">
        <el-card shadow="hover" style="height:490px;">
          <div slot="header" class="clearfix">
            <span>CMS To do</span>
            <el-button style="float: right; padding: 3px 0" type="text" @click="drawerProp.addTaskDrawer = true">add
            </el-button>
          </div>
          <el-table :show-header="false" :data="todoList" style="width:100%;" height="400">
            <el-table-column width="20">
              <template slot-scope="scope">
                <div :class="tableRowClassName(scope.row)" style="width: 5px">
                  |
                </div>
              </template>
            </el-table-column>
            <el-table-column width="40">
              <template slot-scope="scope">
                <el-checkbox v-model="scope.row.status" @change="handleTodoStatusChange(scope.row)"></el-checkbox>
              </template>
            </el-table-column>

            <el-table-column>
              <template slot-scope="scope">
                <div
                    class="todo-item"
                    :class="{'todo-item-del': scope.row.status}"
                >{{ scope.row.notes }}
                </div>
              </template>
            </el-table-column>
            <el-table-column width="80">
              <template slot-scope="scope">
                <el-button
                    type="text"
                    icon="el-icon-edit"
                    @click="handleEditTodo(scope.row)"
                >Modify
                </el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-card>
      </el-col>
      <el-col :span="8">
        <el-col :gutter="20" class="mgb20">
          <div>
            <el-row :span="8">
              <el-card shadow="hover" :body-style="{padding: '0px'}">
                <div class="grid-content grid-con-1">
                  <i class="el-icon-lx-people grid-con-icon"></i>
                  <div class="grid-cont-right">
                    <div class="grid-num">{{ accountNum }}</div>
                    <div>Overall Accounts</div>
                  </div>
                </div>
              </el-card>
            </el-row>
            <el-row :span="8">
              <el-card shadow="hover" :body-style="{padding: '0px'}" style="margin-top: 28px">
                <div class="grid-content grid-con-2">
                  <i class="el-icon-lx-global grid-con-icon"></i>
                  <div class="grid-cont-right">
                    <div class="grid-num">{{ courseNum }}</div>
                    <div>Overall Courses</div>
                  </div>
                </div>
              </el-card>
            </el-row>
            <el-row :span="8">
              <el-card shadow="hover" :body-style="{padding: '0px'}" style="margin-top: 28px">
                <div class="grid-content grid-con-3">
                  <i class="el-icon-lx-read grid-con-icon"></i>
                  <div class="grid-cont-right">
                    <div class="grid-num">{{ clazzNum }}</div>
                    <div>Overall Classes</div>
                  </div>
                </div>
              </el-card>
            </el-row>
            <el-row :span="8">
              <el-card shadow="hover" :body-style="{padding: '0px'}" style="margin-top: 28px">
                <div class="grid-content grid-con-4">
                  <i class="el-icon-lx-location grid-con-icon"></i>
                  <div class="grid-cont-right">
                    <div class="grid-num">{{ classroomNum }}</div>
                    <div>Overall Classrooms</div>
                  </div>
                </div>
              </el-card>
            </el-row>
          </div>

        </el-col>
      </el-col>
    </el-row>
    <div class="">
      <div class="crumbs">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item><i class="el-icon-lx-copy"></i> Notifications</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <div class="container">
        <el-tabs v-model="message">
          <el-tab-pane :label="`Unread Msg(${unread.length})`" name="second">
            <el-table :data="unread" :show-header="false" style="width: 100%">
              <el-table-column>
                <template slot-scope="scope">
                  <span class="message-title">{{ scope.row.title }}</span>
                </template>
              </el-table-column>
              <el-table-column prop="date" width="180"></el-table-column>
              <el-table-column width="120">
                <template slot-scope="scope">
                  <el-button size="small" @click="handleRead(scope.$index)">标为已读</el-button>
                </template>
              </el-table-column>
            </el-table>
            <div class="handle-row">
              <el-button type="primary">全部标为已读</el-button>
            </div>
          </el-tab-pane>
          <el-tab-pane :label="`Read Msg(${read.length})`" name="third">
            <template v-if="message === 'third'">
              <el-table :data="read" :show-header="false" style="width: 100%">
                <el-table-column>
                  <template slot-scope="scope">
                    <span class="message-title">{{ scope.row.title }}</span>
                  </template>
                </el-table-column>
                <el-table-column prop="date" width="150"></el-table-column>
                <el-table-column width="120">
                  <template slot-scope="scope">
                    <el-button type="danger" @click="handleDel(scope.$index)">删除</el-button>
                  </template>
                </el-table-column>
              </el-table>
              <div class="handle-row">
                <el-button type="danger">删除全部</el-button>
              </div>
            </template>
          </el-tab-pane>
          <el-tab-pane :label="`Recycle(${recycle.length})`" name="fourth">
            <template v-if="message === 'fourth'">
              <el-table :data="recycle" :show-header="false" style="width: 100%">
                <el-table-column>
                  <template slot-scope="scope">
                    <span class="message-title">{{ scope.row.title }}</span>
                  </template>
                </el-table-column>
                <el-table-column prop="date" width="150"></el-table-column>
                <el-table-column width="120">
                  <template slot-scope="scope">
                    <el-button @click="handleRestore(scope.$index)">还原</el-button>
                  </template>
                </el-table-column>
              </el-table>
              <div class="handle-row">
                <el-button type="danger">清空回收站</el-button>
              </div>
            </template>
          </el-tab-pane>
          <el-tab-pane :label="`Draft${draft.length})`" name="first">
            <el-table :data="unread" :show-header="false" style="width: 100%">
              <el-table-column>
                <template slot-scope="scope">
                  <span class="message-title">{{ scope.row.title }}</span>
                </template>
              </el-table-column>
              <el-table-column prop="date" width="180"></el-table-column>
              <el-table-column width="120">
                <template slot-scope="scope">
                  <el-button size="small" @click="handleRead(scope.$index)">标为已读</el-button>
                </template>
              </el-table-column>
            </el-table>
            <!--          <div class="handle-row">-->
            <!--            <el-button type="primary">全部标为已读</el-button>-->
            <!--          </div>-->
          </el-tab-pane>
          <el-button style="float: right; padding: 3px 0" type="text" @click="drawerProp.addTaskDrawer = true">add
          </el-button>
        </el-tabs>
      </div>
    </div>
    <el-drawer
        title="Add a Task"
        :with-header="drawerProp.withHeader"
        size="25%"
        :append-to-body="drawerProp.appendToBody"
        :visible.sync="drawerProp.addTaskDrawer"
        :direction="drawerProp.direction"
        :modal="drawerProp.model"
        :before-close="cancelForm">
      <div class="demo-drawer__content">
        <el-card shadow="hover" style="height:1000px;">
          <div slot="header" class="clearfix" style="text-align: left">
            <a style="font-size: large;color: #20a0ff">Add a New Task</a>
            <el-button-group style="float: right">
              <el-button type="danger" @click="cancelForm" style="width: 80px">Cancel
              </el-button>
              <el-button type="primary" @click="handleSubmitting()" :loading="loading"
                         style="width: 80px">{{ loading ? 'Submitting ...' : 'Submit' }}
              </el-button>
            </el-button-group>
          </div>
          <div class="form-box" style="float: left">
            <el-form ref="form" :model="addTaskForm" :rules="addTaskRules" style="text-align: left;margin-top: 5%"
                     label-width="auto" :label-position="'right'">
              <el-form-item label="Task Name :" prop="notes" style="margin-top: 5%;width: 55%">
                <el-input v-model="addTaskForm.notes"></el-input>
              </el-form-item>
              <el-form-item label="Urgent Level:" prop="level" style="margin-top: 10%">
                <el-radio-group v-model="addTaskForm.level">
                  <el-radio-button label="Urgent"></el-radio-button>
                  <el-radio-button label="Prior"></el-radio-button>
                  <el-radio-button label="Normal"></el-radio-button>
                </el-radio-group>
              </el-form-item>
              <el-form-item label="Start Time" prop="startTime" style="margin-top: 10%">
                <el-date-picker
                    v-model="addTaskForm.startTime"
                    type="date"
                    placeholder="Select Start Time"
                    format="yyyy-MM-dd">
                </el-date-picker>
              </el-form-item>
              <el-form-item label="End Time" prop="endTime" style="margin-top: 10%">
                <el-date-picker
                    v-model="addTaskForm.endTime"
                    type="date"
                    placeholder="Select End Time"
                    format="yyyy-MM-dd">
                </el-date-picker>
              </el-form-item>
            </el-form>

          </div>


        </el-card>

      </div>
    </el-drawer>

    <el-drawer
        title="Modify a Task"
        :with-header="editTodoDrawProp.withHeader"
        size="25%"
        :append-to-body="editTodoDrawProp.appendToBody"
        :visible.sync="editTodoDrawProp.editTodoDrawVisible"
        :direction="editTodoDrawProp.direction"
        :modal="editTodoDrawProp.model"
        :before-close="cancelForm">
      <div class="demo-drawer__content">
        <el-card shadow="hover" style="height:1000px;">
          <div slot="header" class="clearfix" style="text-align: left">
            <a style="font-size: large;color: #20a0ff">Modify the Task</a>
            <el-button-group style="float: right">
              <el-button type="danger" @click="cancelForm" style="width: 80px">Cancel
              </el-button>
              <el-button type="primary" @click="handleEditSubmitting()" :loading="loading"
                         style="width: 80px">{{ loading ? 'Submitting ...' : 'Submit' }}
              </el-button>
            </el-button-group>
          </div>
          <div class="form-box" style="float: left">
            <el-form ref="form" :model="editTodoForm" :rules="addTaskRules" style="text-align: left;margin-top: 5%"
                     label-width="auto" :label-position="'right'">
              <el-form-item label="Task Name :" prop="notes" style="margin-top: 5%;width: 55%">
                <el-input v-model="editTodoForm.notes"></el-input>
              </el-form-item>
              <el-form-item label="Urgent Level:" prop="level" style="margin-top: 10%">
                <el-radio-group v-model="editTodoForm.level">
                  <el-radio-button label="Urgent"></el-radio-button>
                  <el-radio-button label="Prior"></el-radio-button>
                  <el-radio-button label="Normal"></el-radio-button>
                </el-radio-group>
              </el-form-item>
              <el-form-item label="Start Time" prop="startTime" style="margin-top: 10%">
                <el-date-picker
                    v-model="editTodoForm.startTime"
                    type="date"
                    placeholder="Select Start Time"
                    format="yyyy-MM-dd">
                </el-date-picker>
              </el-form-item>
              <el-form-item label="End Time" prop="endTime" style="margin-top: 10%">
                <el-date-picker
                    v-model="editTodoForm.endTime"
                    type="date"
                    placeholder="Select End time"
                    format="yyyy-MM-dd">
                </el-date-picker>
              </el-form-item>
            </el-form>

          </div>


        </el-card>

      </div>
    </el-drawer>


  </div>


</template>

<script>
import Schart from 'vue-schart';
import bus from '@/components/common/bus';
import axios from 'axios';

export default {
  inject: ['reload'],
  name: 'dashboard',


  data() {
    let startTimeValidator = (rule, value, callback) => {
      if (value !== null) {
        let oDate1 = new Date(value);
        let oDate2 = new Date();
        if (oDate1.getTime() >= oDate2.getTime()) {
          callback();
        } else {
          callback(new Error('Must be in the future!'));
        }
      }
    };
    let endTimeValidator = (rule, value, callback) => {
      if (value !== null) {
        let oDate1 = new Date(value);
        let oDate2 = new Date(this.addTaskForm.startTime);
        if (oDate1.getTime() >= oDate2.getTime()) {
          callback();
        } else {
          callback(new Error('Should after start time!'));
        }
      }
    };

    return {
      name: localStorage.getItem('ms_username'),
      accountNum: '',
      courseNum: '',
      clazzNum: '',
      classroomNum: '',
      todoList: [],
      addTaskForm: {},
      addTaskRules: {
        notes:
            [
              {required: true, message: 'Task info can not be none', trigger: 'blur'}
            ],
        level:
            [
              {required: true, message: 'Please choose a level to this task', trigger: 'blur'}
            ],
        startTime:
            [
              {required: true, message: 'Start Time need to be set', trigger: 'blur'},
              {validator: startTimeValidator, trigger: ['blur']}
            ],
        endTime:
            [
              {required: true, message: 'End Time need to be set', trigger: 'blur'},
              {validator: endTimeValidator, trigger: ['blur']}
            ],
      },

      value1: '',
      value2: '',

      isShow: false,
      loading: false,
      drawerProp: {
        direction: 'rtl',
        addTaskDrawer: false,
        withHeader: false,
        appendToBody: true,
        model: false
      },
      editTodoDrawProp: {
        direction: 'rtl',
        editTodoDrawVisible: false,
        withHeader: false,
        appendToBody: true,
        model: false
      },

      formLabelWidth: '100px',
      timer: null,
      editTodoForm: {},

      message: 'first',
      showHeader: false,
      draft: [],
      unread: [{
        date: '2018-04-19 20:00:00',
        title: '【系统通知】该系统将于今晚凌晨2点到5点进行升级维护',
      }, {
        date: '2018-04-19 21:00:00',
        title: '今晚12点整发大红包，先到先得',
      }],
      read: [{
        date: '2018-04-19 20:00:00',
        title: '【系统通知】该系统将于今晚凌晨2点到5点进行升级维护'
      }],
      recycle: [{
        date: '2018-04-19 20:00:00',
        title: '【系统通知】该系统将于今晚凌晨2点到5点进行升级维护'
      }]
    };
  },
  components: {
    Schart
  },
  computed: {
    unreadNum() {
      return this.unread.length;
    }
  },

  methods: {
    changeDate() {
      const now = new Date().getTime();
      this.data.forEach((item, index) => {
        const date = new Date(now - (6 - index) * 86400000);
        item.name = `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`;
      });
    },
    handleSubmitting() {
      if (this.loading) {
        return;
      }
      this.$confirm('Confirm to submit？')
          .then(_ => {
            this.addTaskForm.adminId = this.$store.state.account.userId
            this.loading = true;
            console.log(this.addTaskForm)
            this.timer = setTimeout(() => {
              // 动画关闭需要一定的时间
              setTimeout(() => {
                this.loading = false;
              }, 400);
            }, 2000);
            axios.post("http://localhost:8080/admin/index/addAdminToDoList", this.addTaskForm).then(resp => {
              console.log(resp)
              if (resp.data === "success") {
                this.loading = false;
                this.drawerProp.addTaskDrawer = false;
                this.reload()
                clearTimeout(this.timer);
                this.$notify({
                  title: 'Success',
                  message: 'Add a new Task!',
                  type: 'success'
                });

              } else {
                this.loading = false;
                this.drawerProp.addTaskDrawer = false;
                this.reload()
                clearTimeout(this.timer);
                this.$notify.error({
                  title: 'Error',
                  message: 'Ops,Something goes wrong!Try again later!',
                });
              }

            })

          })
          .catch(_ => {
          });
    },
    handleEditSubmitting() {
      if (this.loading) {
        return;
      }
      this.$confirm('Confirm Modify？')
          .then(_ => {
            this.editTodoForm.adminId = this.$store.state.account.userId
            console.log(this.editTodoForm)
            this.loading = true;
            this.timer = setTimeout(() => {
              // 动画关闭需要一定的时间
              setTimeout(() => {
                this.loading = false;
              }, 400);
            }, 2000);
            axios.post("http://localhost:8080/admin/index/modifyAdminToDoList", this.editTodoForm).then(resp => {
              if (resp.data === "success") {
                this.loading = false;
                this.drawerProp.addTaskDrawer = false;
                this.reload()
                clearTimeout(this.timer);
                this.$notify({
                  title: 'Success',
                  message: 'Task modify successfully!',
                  type: 'success'
                });
              } else {
                this.loading = false;
                this.drawerProp.addTaskDrawer = false;
                this.reload()
                clearTimeout(this.timer);
                this.$notify.error({
                  title: 'Error',
                  message: 'Ops,Something goes wrong!Try again later!',
                });
              }

            })

          })
          .catch(_ => {
          });
    },
    cancelForm() {
      this.loading = false;
      this.drawerProp.addTaskDrawer = false;
      this.editTodoDrawProp.editTodoDrawVisible = false;
      clearTimeout(this.timer);
    },
    handleEditTodo(row) {
      axios.get('http://localhost:8080/admin/index/getTodoListById/' + row.id).then(resp => {
        if (resp) {
          this.editTodoForm = resp.data;
        }
      })
      this.editTodoDrawProp.editTodoDrawVisible = true;
      console.log(this.editTodoDrawProp.editTodoDrawVisible)
    },
    handleTodoStatusChange(row) {
      console.log(row.id)
      console.log(row.status)
      axios.get('http://localhost:8080/admin/index/changeAdminTodoListStatus/' + row.id).then(resp => {
        console.log(resp)
      })
    },
    tableRowClassName(row) {
      if (row.level === "Urgent") {
        return 'urgentLevel';
      } else if (row.level === "Prior") {
        return 'priorLevel';
      }
      return 'normalLevel';
    },

    handleRead(index) {
      const item = this.unread.splice(index, 1);
      console.log(item);
      this.read = item.concat(this.read);
    },
    handleDel(index) {
      const item = this.read.splice(index, 1);
      this.recycle = item.concat(this.recycle);
    },
    handleRestore(index) {
      const item = this.recycle.splice(index, 1);
      this.read = item.concat(this.read);
    }
  },
  created() {
    axios.get('http://localhost:8080/admin/index/getAccountsNum').then(resp => {
      this.accountNum = resp.data
    })
    axios.get('http://localhost:8080/admin/index/getCoursesNum').then(resp => {
      this.courseNum = resp.data
    })
    axios.get('http://localhost:8080/admin/index/getClazzNum').then(resp => {
      this.clazzNum = resp.data
    })
    axios.get('http://localhost:8080/admin/index/getClazzRoomNum').then(resp => {
      this.classroomNum = resp.data
    })
    axios.get('http://localhost:8080/admin/index/getAdminToDoList/' + this.$store.state.account.userId).then(resp => {
      this.todoList = resp.data
      console.log(this.todoList)
    })
  }


};
</script>


<style scoped>
.el-row {
  /*margin-bottom: 8px;*/
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
  color: rgb(45, 140, 240);
}

.grid-con-4 .grid-con-icon {
  background: rgb(169, 67, 242);
}

.grid-con-4 .grid-num {
  color: rgb(45, 140, 240);
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

.urgentLevel {
  background-color: #ec2525;
  color: #ec2525;
}

.priorLevel {
  background: rgb(63, 152, 245);
  color: rgb(63, 152, 245);
  border-radius: 10%;
}

.normalLevel {
  background-color: white;
  color: white;
  border-radius: 10%;
}

.user-info-cont div:first-child {
  font-size: 30px;
  color: #222;
}

.user-info-list {
  font-size: 18px;
  color: #222;
  line-height: 30px;
}

.user-info-list span {
  margin-left: 30px;
}

.user-info-list label {
  width: 180px;
  float: left;
  text-align: right;
}

.mgb20 {
  margin-bottom: 2px;
}

.todo-item {
  font-size: 14px;
}

.todo-item-del {
  text-decoration: line-through;
  color: #999;
}

.message-title {
  cursor: pointer;
}

.handle-row {
  margin-top: 30px;
}

.container {
  margin-top: 5px;
  height: 230px;
}

</style>

<style rel="stylesheet/scss" lang="scss">

:focus {

  outline: 0;
}

</style>

<style>
.el-table-column .warning-row {
  background: #20acac;
}

.el-table-column .success-row {
  background: #f0f9eb;
}
</style>

