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
              <div class="user-info-name"><label> User Name : </label> <span> {{ $store.state.account.name }}</span>
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
                : </label><span>{{ $store.state.account.lastLoginTime }}</span></div>
            </div>
          </div>
        </el-card>

      </el-col>

      <el-col :span="8">
        <el-card shadow="hover" style="height:490px;">
          <div slot="header" class="clearfix">
            <span>My To do List</span>
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
            <el-card shadow="hover" :body-style="{padding: '0px'}" style="margin-top: 8px">
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
            <el-card shadow="hover" :body-style="{padding: '0px'}" style="margin-top: 8px">
              <div class="grid-content grid-con-3">
                <i class="el-icon-lx-group grid-con-icon"></i>
                <div class="grid-cont-right">
                  <div class="grid-num">{{ clazzNum }}</div>
                  <div>Overall Classes</div>
                </div>
              </div>
            </el-card>
          </el-row>
          <el-row :span="8">
            <el-card shadow="hover" :body-style="{padding: '0px'}" style="margin-top: 8px">
              <div class="grid-content grid-con-4">
                <i class="el-icon-lx-location grid-con-icon"></i>
                <div class="grid-cont-right">
                  <div class="grid-num">{{ clazzNum }}</div>
                  <div>Overall Classrooms</div>
                </div>
              </div>
            </el-card>
          </el-row>
        </el-col>
      </el-col>

    </el-row>
    <el-row :gutter="20">
      <el-col :span="12">
        <el-card shadow="hover">
          <schart ref="bar" class="schart" canvasId="bar" :options="options"></schart>
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card shadow="hover">
          <schart ref="line" class="schart" canvasId="line" :options="options2"></schart>
        </el-card>
      </el-col>
    </el-row>


    <el-drawer
        title="Add a Task"
        :with-header="drawerProp.withHeader"
        size="35%"
        :append-to-body="drawerProp.appendToBody"
        :visible.sync="drawerProp.addTaskDrawer"
        :direction="drawerProp.direction"
        :modal="drawerProp.model"
        :before-close="cancelForm">
      <div class="demo-drawer__content">
        <el-card shadow="hover" style="height:507px;">
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
            <el-form ref="form" :model="addTaskForm" :rules="addTaskRules" style="text-align: left;margin-top: 5%">
              <el-form-item label="Task Name :" prop="notes" label-width="formLabelWidth" style="margin-top: 5%">
                <el-input v-model="addTaskForm.notes"></el-input>
              </el-form-item>
              <el-form-item label="Urgent Level:" prop="level" label-width="formLabelWidth" style="margin-top: 10%">
                <el-radio-group v-model="addTaskForm.level">
                  <el-radio-button label="Urgent"></el-radio-button>
                  <el-radio-button label="Prior"></el-radio-button>
                  <el-radio-button label="Normal"></el-radio-button>
                </el-radio-group>
              </el-form-item>
              <el-form-item label="Action Time" prop="time" label-width="formLabelWidth" style="margin-top: 10%">
                <el-date-picker
                    v-model="addTaskForm.time"
                    type="daterange"
                    align="right"
                    range-separator="to"
                    start-placeholder="start from"
                    end-placeholder="end with"
                    :picker-options="pickerOptions">
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
        size="35%"
        :append-to-body="editTodoDrawProp.appendToBody"
        :visible.sync="editTodoDrawProp.editTodoDrawVisible"
        :direction="editTodoDrawProp.direction"
        :modal="editTodoDrawProp.model"
        :before-close="cancelForm">
      <div class="demo-drawer__content">
        <el-card shadow="hover" style="height:507px;">
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
            <el-form ref="form" :model="editTodoForm" :rules="addTaskRules" style="text-align: left;margin-top: 5%">
              <el-form-item label="Task Name :" prop="notes" label-width="formLabelWidth" style="margin-top: 5%">
                <el-input v-model="editTodoForm.notes"></el-input>
              </el-form-item>
              <el-form-item label="Urgent Level:" prop="level" label-width="formLabelWidth" style="margin-top: 10%">
                <el-radio-group v-model="editTodoForm.level">
                  <el-radio-button label="Urgent"></el-radio-button>
                  <el-radio-button label="Prior"></el-radio-button>
                  <el-radio-button label="Normal"></el-radio-button>
                </el-radio-group>
              </el-form-item>
              <el-form-item label="Action Time" prop="time" label-width="formLabelWidth" style="margin-top: 10%">
                <el-date-picker
                    v-model="editTodoForm.time"
                    type="daterange"
                    align="right"
                    range-separator="to"
                    start-placeholder="start from"
                    end-placeholder="end with"
                    :picker-options="pickerOptions">
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
    return {
      name: localStorage.getItem('ms_username'),
      accountNum: '',
      courseNum: '',
      clazzNum: '',
      todoList: [],
      addTaskForm: {},
      data: [
        {
          name: '2018/09/04',
          value: 1083
        },
        {
          name: '2018/09/05',
          value: 941
        },
        {
          name: '2018/09/06',
          value: 1139
        },
        {
          name: '2018/09/07',
          value: 816
        },
        {
          name: '2018/09/08',
          value: 327
        },
        {
          name: '2018/09/09',
          value: 228
        },
        {
          name: '2018/09/10',
          value: 1065
        }
      ],
      options: {
        type: 'bar',
        title: {
          text: '最近一周各品类销售图'
        },
        xRorate: 25,
        labels: ['周一', '周二', '周三', '周四', '周五'],
        datasets: [
          {
            label: '家电',
            data: [234, 278, 270, 190, 230]
          },
          {
            label: '百货',
            data: [164, 178, 190, 135, 160]
          },
          {
            label: '食品',
            data: [144, 198, 150, 235, 120]
          }
        ]
      },
      options2: {
        type: 'line',
        title: {
          text: '最近几个月各品类销售趋势图'
        },
        labels: ['6月', '7月', '8月', '9月', '10月'],
        datasets: [
          {
            label: '家电',
            data: [234, 278, 270, 190, 230]
          },
          {
            label: '百货',
            data: [164, 178, 150, 135, 160]
          },
          {
            label: '食品',
            data: [74, 118, 200, 235, 90]
          }
        ]
      },
      addTaskRules: {
        notes:
            [
              {required: true, message: 'Task info can not be none', trigger: 'blur'}
            ],
        level:
            [
              {required: true, message: 'Please choose a level to this task', trigger: 'blur'}
            ],
        time:
            [
              {required: true, message: 'Start Time & End Time need to be set', trigger: 'blur'}
            ],
      },

      pickerOptions: {
        shortcuts: [{
          text: 'Next week',
          onClick(picker) {
            const start = new Date();
            const end = new Date();
            end.setTime(end.getTime() + 3600 * 1000 * 24 * 7);
            picker.$emit('pick', [start, end]);
          }
        }, {
          text: 'Next Month',
          onClick(picker) {
            const start = new Date();
            const end = new Date();
            end.setTime(end.getTime() + 3600 * 1000 * 24 * 30);
            picker.$emit('pick', [start, end]);
          }
        }, {
          text: 'Three Month',
          onClick(picker) {
            const start = new Date();
            const end = new Date();
            end.setTime(end.getTime() + 3600 * 1000 * 24 * 90);
            picker.$emit('pick', [start, end]);
          }
        }]
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
    };
  },
  components: {
    Schart
  },
  computed: {},

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
      this.editTodoForm = row;
      //this.drawerProp.addTaskDrawer=true;
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
    }
    // handleListener() {
    //     bus.$on('collapse', this.handleBus);
    //     // 调用renderChart方法对图表进行重新渲染
    //     window.addEventListener('resize', this.renderChart);
    // },
    // handleBus(msg) {
    //     setTimeout(() => {
    //         this.renderChart();
    //     }, 200);
    // },
    // renderChart() {
    //     this.$refs.bar.renderChart();
    //     this.$refs.line.renderChart();
    // }
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
    axios.get('http://localhost:8080/admin/index/getAdminToDoList/' + this.$store.state.account.userId).then(resp => {
      this.todoList = resp.data
      console.log(this.todoList)
    })
  }

};
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
  font-size: 20px;
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

