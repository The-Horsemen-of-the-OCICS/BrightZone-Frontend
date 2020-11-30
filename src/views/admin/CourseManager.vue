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
        <el-button type="primary" icon="el-icon-add" @click="handleAddCourse" style="float: right" round>Add new</el-button>
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
                @click="handleDetails(scope.$index, scope.row)"
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

    <!-- 编辑弹出框 -->
    <el-dialog title="编辑" :visible.sync="editVisible" width="30%">
      <el-form ref="form" :model="form" label-width="70px">
        <el-form-item label="用户名">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="地址">
          <el-input v-model="form.address"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
                <el-button @click="editVisible = false">取 消</el-button>
                <el-button type="primary" @click="saveEdit">确 定</el-button>
            </span>
    </el-dialog>
  </div>
</template>

<script>
import axios from "axios";
import {fetchData} from "@/api";

export default {
  name: "CourseManager",
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

      multipleSelection: [],
      delList: [],
      editVisible: false,

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
    // 触发搜索按钮
    handleSearch() {
      this.$set(this.query, 'pageIndex', 1);
      this.getData();
    },
    // 删除操作
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
    // 编辑操作
    handleDetails(index, row) {
      this.$router.push({
        path: '/admin/courseDetails',
        query: {
          id: row.courseId,
        }
      })
      // this.idx = index;
      // this.form = row;
      // this.editVisible = true;
    },
    // 保存编辑
    saveEdit() {
      this.editVisible = false;
      this.$message.success(`修改第 ${this.idx + 1} 行成功`);
      this.$set(this.tableData, this.idx, this.form);
    },
    // 分页导航
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