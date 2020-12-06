<template>
  <div>
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>
          <i class="el-icon-lx-people"></i> Account
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
        >批量删除
        </el-button>
        <el-select v-model="query.address" placeholder="User Role" class="handle-select mr10">
          <el-option key="1" label="Administrator" value="administrator"></el-option>
          <el-option key="2" label="Professor" value="professor"></el-option>
          <el-option key="3" label="Student" value="student"></el-option>
          <el-option key="4" label="Teaching Assistant" value="teaching_assistant"></el-option>
        </el-select>
        <el-input v-model="query.name" placeholder="username" class="handle-input mr10"></el-input>
        <el-button type="primary" icon="el-icon-search" @click="handleSearch">Search</el-button>
      </div>
      <el-table
          :data="tableData"
          border
          class="table"
          ref="multipleTable"
          header-cell-class-name="table-header"
          @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" min-width="2" align="center"></el-table-column>
        <el-table-column prop="userId" label="ID" min-width="6"></el-table-column>
        <el-table-column prop="name" label="Username" min-width="10"></el-table-column>
        <el-table-column prop="type" label="Role" min-width="10"></el-table-column>

        <el-table-column prop="facultyId" label="Faculty" min-width="12">
          <template slot-scope="scope">
            {{ faculties.find(faculty => faculty.facultyId === scope.row.facultyId).facultyName }}
          </template>
        </el-table-column>

        <el-table-column prop="program" label="Program" min-width="20"></el-table-column>
        <el-table-column prop="email" label="Email" min-width="15"></el-table-column>
        <el-table-column label="Status" align="center" min-width="5">
          <template slot-scope="scope">
            <el-tag
                :type="scope.row.accountStatus==='current'?'success':scope.row.accountStatus==='unauthorized'?'primary':scope.row.accountStatus==='expelled'?'danger':scope.row.accountStatus==='sabbatical'?'info':scope.row.accountStatus==='alumni'?'default':''"
            >{{ scope.row.accountStatus }}
            </el-tag>
          </template>
        </el-table-column>

        <el-table-column label="Last login" min-width="10">
          <template slot-scope="scope">
            {{ scope.row.lastLogin | FormatDate('yyyy-MM-dd HH:mm:ss') }}
          </template>

        </el-table-column>
        <el-table-column label="Operator" min-width="10" align="center">
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
        title="Modify an Account"
        :with-header="editAccountDrawerProp.withHeader"
        size="35%"
        :append-to-body="editAccountDrawerProp.appendToBody"
        :visible.sync="editAccountDrawerProp.editDrawVisible"
        :direction="editAccountDrawerProp.direction"
        :modal="editAccountDrawerProp.model"
        :before-close="cancelForm">
      <div class="demo-drawer__content">
        <el-card shadow="hover" style="height:1000px;">
          <div slot="header" class="clearfix" style="text-align: left">
            <a style="font-size: large;color: #20a0ff">Modify an Account</a>
            <el-button-group style="float: right">
              <el-button type="danger" @click="cancelForm" style="width: 80px">Cancel
              </el-button>
              <el-button type="primary" @click="handleEditSubmitting()" :loading="loading"
                         style="width: 80px">{{ loading ? 'Submitting ...' : 'Submit' }}
              </el-button>
            </el-button-group>
          </div>
          <div class="form-box" style="float: left">
            <el-form ref="form" :model="editAccountForm" :rules="editAccountRules" style="text-align: left;margin-top: 5%">
              <el-form-item label="Task Name :" prop="notes" label-width="formLabelWidth" style="margin-top: 5%">
                <el-input v-model="editAccountForm.name"></el-input>
              </el-form-item>

            </el-form>

          </div>


        </el-card>

      </div>
    </el-drawer>

  </div>
</template>

<script>
import {fetchData} from "@/api";
import axios from "axios";

export default {
  name: "AccountManager",
  data() {
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

      faculties: [],

      multipleSelection: [],
      delList: [],
      editVisible: false,

      editAccountForm: {},
      editAccountDrawerProp: {
        direction: 'rtl',
        editDrawVisible: false,
        withHeader: false,
        appendToBody: true,
        model: false
      },
      editAccountRules:{

      },
      form: {},
      loading: false,
      timer: null,
      idx: -1,
      id: -1
    };
  },
  created() {
    //this.getData();
    axios.get('http://localhost:8080/admin/account/getAll/0/10').then(resp => {
      this.tableData = resp.data.content
      this.pageSize = resp.data.size
      this.pageTotal = resp.data.totalElements
    })
    axios.get('http://localhost:8080/admin/account/getAllFaculties').then(resp => {
      this.faculties = resp.data;
    })
  },
  methods: {
    // 获取 easy-mock 的模拟数据
    getData() {
      fetchData(this.query).then(res => {
        console.log(res);
        this.tableData = res.list;
        this.pageTotal = res.pageTotal || 50;
      });
    },
    // 触发搜索按钮
    handleSearch() {
      this.$set(this.query, 'pageIndex', 1);
      this.getData();
    },
    // 删除操作
    handleDelete(index, row) {
      // Double check
      this.$confirm('CMS will delete ' + row.type + ' ' + row.name + '`s account info !', 'Check', {
        type: 'warning'
      })
          .then(() => {
            axios.delete('http://localhost:8080/admin/account/deleteAccount/' + row.userId).then(resp => {
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
    // 编辑操作
    handleEdit(index, row) {
      console.log(index)
      this.editAccountForm = row;
      this.editAccountDrawerProp.editDrawVisible = true;
    },
    cancelForm() {
      this.loading = false;
      this.editAccountDrawerProp.editDrawVisible = false;
      clearTimeout(this.timer);
    },
    // 保存编辑
    saveEdit() {
      this.editVisible = false;
      this.$message.success(`修改第 ${this.idx + 1} 行成功`);
      this.$set(this.tableData, this.idx, this.form);
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

    // Page Navigation
    handlePageChange(currentPage) {
      axios.get('http://localhost:8080/admin/account/getAll/' + (currentPage - 1) + '/10').then(resp => {
        console.log(resp)
        this.tableData = resp.data.content
        this.pageSize = resp.data.size
        this.pageTotal = resp.data.totalElements
      })
    },
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