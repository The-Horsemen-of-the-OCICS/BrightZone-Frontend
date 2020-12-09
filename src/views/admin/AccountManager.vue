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
        >Batch Deletion
        </el-button>
        <el-select style="width: 15%" v-model="query.role" clearable placeholder="User Role" class="handle-select mr10">
          <el-option key="1" label="Administrator" value="administrator"></el-option>
          <el-option key="2" label="Professor" value="professor"></el-option>
          <el-option key="3" label="Student" value="student"></el-option>
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
        size="25%"
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

          <el-form ref="editAccountForm" :model="editAccountForm" :rules="editAccountRules"
                   style="margin-top: 5%;" label-width="auto" :label-position="labelPosition">
            <el-form-item label="User Name :" prop="name" style="margin-top: 5%;width: 70%">
              <el-input v-model="editAccountForm.name"></el-input>
            </el-form-item>
            <el-form-item label="User Role :" prop="type" style="margin-top: 5%;width: 100%">
              <el-select v-model="editAccountForm.type" filterable placeholder="Please Input or Select">
                <el-option
                    v-for="item in typeList"
                    :key="item.Name"
                    :label="item.Name"
                    :value="item.Value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="Faculty :" prop="facultyId" style="margin-top: 5%">
              <el-select v-model="editAccountForm.facultyId" filterable placeholder="Please Input or Select">
                <el-option
                    v-for="item in faculties"
                    :key="item.facultyId"
                    :label="item.facultyName"
                    :value="item.facultyId">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="Program :" prop="program" style="margin-top: 5%">
              <el-select v-model="editAccountForm.program" filterable placeholder="Please Input or Select">
                <el-option
                    v-for="item in faculties"
                    :key="item.facultyId"
                    :label="item.facultyName"
                    :value="item.facultyId">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="Email :" prop="email" style="margin-top: 5%;width: 70%">
              <el-input v-model="editAccountForm.email" readonly></el-input>
            </el-form-item>
            <el-form-item label="Status : " prop="accountStatus" style="margin-top: 5%;width: 70%">
              <el-select v-model="editAccountForm.accountStatus" filterable placeholder="Please Select Status"
              >
                <el-option
                    v-for="status in statusList"
                    :key="status.Value"
                    :label="status.Name"
                    :value="status.Value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-form>


        </el-card>

      </div>
    </el-drawer>

  </div>
</template>

<script>
import axios from "axios";

export default {
  inject: ['reload'],
  name: "AccountManager",

  data() {
    let editUserNameValidator = (rule, value, callback) => {
      if (value !== null) {
        if (value.split(" ").join("").length === 0) {
          callback(new Error("User name can not be all blank"))
        } else {
          callback();
        }
      }
    };
    return {
      query: {
        role: '',  // account role:professor,administrator,student
        name: '',  // account name
        pageIndex: 1,
        pageSize: 10
      },
      pageSize: this.pageSize,
      pageTotal: this.pageTotal,
      tableData: [],
      labelPosition: 'right',
      faculties: [],
      facultyName: '',

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
      statusList: [
        {
          Name: "current",
          Value: "current",
        },
        {
          Name: "unauthorized",
          Value: "unauthorized",
        },
        {
          Name: "expelled",
          Value: "expelled",
        },
        {
          Name: "sabbatical",
          Value: "sabbatical",
        },
        {
          Name: "alumni",
          Value: "alumni",
        },
      ],
      editAccountRules: {
        name:
            [
              {required: true, message: 'Name can not be none', trigger: 'blur'},
              {validator: editUserNameValidator, trigger: ['blur']}
            ],
        type:
            [
              {required: true, message: 'Please choose a level to this task', trigger: 'blur'}
            ],
        facultyId:
            [
              {required: true, message: 'faculty need to be set', trigger: 'blur'}
            ],
        program:
            [
              {required: true, message: 'program need to be set', trigger: 'blur'}
            ],
        accountStatus:
            [
              {required: true, message: 'status need to be set', trigger: 'blur'}
            ],
      },

      typeList: [
        {
          Name: "Admin",
          Value: "administrator",
        },
        {
          Name: "Professor",
          Value: "professor",
        },
        {
          Name: "Student",
          Value: "student",
        },
      ],
      form: {},
      loading: false,
      timer: null,
      idx: -1,
      id: -1
    };
  },
  created() {
    // get params from url
    let type = this.$route.params.type;
    if (type !== undefined) {
      this.query.role = type;
    }
    let name = this.$route.params.name;
    if (name !== undefined) {
      this.query.name = name;
    }
    let pageNum = this.$route.params.pageNum;
    // pageNum (in url) -> this.query.pageIndex (in data()) -> currentPage (in el-pagination)
    this.query.pageIndex = parseInt(pageNum);

    if (type === undefined && name === undefined && pageNum !== undefined) {  // raw query
      axios.get('http://localhost:8080/admin/account/getAll/' + (this.query.pageIndex - 1) + '/10').then(resp => {
        this.tableData = resp.data.content
        this.pageSize = resp.data.size
        this.pageTotal = resp.data.totalElements
      }).catch(err => {
      })
    } else if (type !== undefined && name === undefined && pageNum !== undefined) {  // query by user type
      axios.get('http://localhost:8080/admin/account/getAllByType/' + type + '/' + (this.query.pageIndex - 1) + '/10').then(resp => {
        this.tableData = resp.data.content
        this.pageSize = resp.data.size
        this.pageTotal = resp.data.totalElements
      }).catch(err => {
      })
    } else if (type === undefined && name !== undefined && pageNum !== undefined) {  // query by user name
      axios.get('http://localhost:8080/admin/account/getAllByName/' + name + '/' + (this.query.pageIndex - 1) + '/10').then(resp => {
        this.tableData = resp.data.content
        this.pageSize = resp.data.size
        this.pageTotal = resp.data.totalElements
      })
    } else if (type !== undefined && name !== undefined && pageNum !== undefined) {  // query by user type and user name
      axios.get('http://localhost:8080/admin/account/getAllByTypeAndName/' + type + '/' + name + '/' + (this.query.pageIndex - 1) + '/10').then(resp => {
        this.tableData = resp.data.content
        this.pageSize = resp.data.size
        this.pageTotal = resp.data.totalElements
      }).catch(err => {
      })
    } else {
      this.$router.push('/404')
    }

    axios.get('http://localhost:8080/admin/account/getAllFaculties').then(resp => {
      this.faculties = resp.data;
    })
  },
  methods: {
    handleSearch() {
      if (this.query.role !== '' && this.query.name !== '') {  // query by user type and name
        this.$router.push('/admin/accounts/t/' + this.query.role + '/n/' + this.query.name + '/1');
      } else if (this.query.role !== '' && this.query.name === '') {  // query by user type
        this.$router.push('/admin/accounts/t/' + this.query.role + '/1');
      } else if (this.query.role === '' && this.query.name !== '') {  // query by user name
        this.$router.push('/admin/accounts/n/' + this.query.name + '/1');
      } else {  // raw query
        this.$router.push('/admin/accounts/1');
      }
      this.reload();
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
      this.$message.error(`Deleted ${str}`);
      this.multipleSelection = [];
    },
    // 编辑操作
    handleEdit(index, row) {
      axios.get('http://localhost:8080/admin/account/getAccount/' + row.userId).then(resp => {
        if (resp) {
          this.editAccountForm = resp.data
        }
      })
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
            console.log(this.editAccountForm)
            this.loading = true;
            this.timer = setTimeout(() => {
              // 动画关闭需要一定的时间
              setTimeout(() => {
                this.loading = false;
              }, 400);
            }, 2000);
            axios.put("http://localhost:8080/admin/account/updateAccount", this.editAccountForm).then(resp => {
              console.log(resp)
              if (resp.data === "success") {
                this.loading = false;
                this.editAccountDrawerProp.editDrawVisible = false;
                this.reload()
                clearTimeout(this.timer);
                this.$notify({
                  title: 'Success',
                  message: 'Account modify successfully!',
                  type: 'success'
                });
              } else {
                this.loading = false;
                this.editAccountDrawerProp.editDrawVisible = false;
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
      console.log('In handle page change method, current pageIndex:' + currentPage)
      this.$router.push('/admin/accounts/' + currentPage)
      this.reload()
      if (this.query.role !== '' && this.query.name !== '') {
        this.$router.push('/admin/accounts/t/' + this.query.role + '/n/' + this.query.name + '/' + currentPage);
      } else if (this.query.role !== '' && this.query.name === '') {
        this.$router.push('/admin/accounts/t/' + this.query.role + '/' + currentPage);
      } else if (this.query.role === '' && this.query.name !== '') {
        this.$router.push('/admin/accounts/n/' + this.query.name + '/' + currentPage);
      } else {
        this.$router.push('/admin/accounts/' + currentPage);
      }
      this.reload();
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
