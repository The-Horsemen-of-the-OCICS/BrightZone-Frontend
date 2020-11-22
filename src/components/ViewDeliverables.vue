<template>
  <div>
    <div style="margin-top: 20px; margin-left: 10px; display: flex; justify-items: flex-end;">
      <el-select v-model="classSelection" filterable placeholder="Select a class" @change="onChangeClass">
        <el-option
            v-for="item in classData"
            :key="item.classId"
            :label="item.classId"
            :value="item.classId">
        </el-option>
      </el-select>
    </div>

    <el-table
        stripe
        :data="deliverableData.filter(data => !search || (data.deliverableDesc?data.deliverableDesc:'').toLowerCase().includes(search.toLowerCase()))"
        style="width: 100%"
        empty-text='No deliverables for this class found!'
        show-summary
        :summary-method="calculateSum"
    >

      <el-table-column
          label="Deliverable ID"
          prop="deliverableId"
          sortable
      >
      </el-table-column>

      <el-table-column
          label="Description"
          prop="deliverableDesc"
          sortable
      >
      </el-table-column>

      <el-table-column
          label="Deadline"
          prop="deadLine"
          sortable
      >
      </el-table-column>

      <el-table-column
          label="Notified"
          prop="isNotified"
          :formatter="formatBoolean"
      >
      </el-table-column>

      <el-table-column
          label="Weight"
          prop="percent"
          sortable
      >
      </el-table-column>

      <el-table-column
          align="right">
        <template slot="header" slot-scope="scope">
          <el-input
              v-model="search"
              size="mini"
              placeholder="Search by Description"/>
        </template>
        <template slot-scope="scope">
          <el-button
              size="mini"
              @click="handleEditDeliverable(scope.$index, scope.row)">Edit</el-button>
          <el-button
              size="mini"
              type="danger"
              @click="handleDeleteDeliverable(scope.$index, scope.row)">Delete</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: "ViewDeliverables",
  created() {
    const _this = this;
    axios.get('http://localhost:8080/getAllClass/2000006').then(function (resp) {
      _this.classData = resp.data;
    })
  },
  data() {
    return {
      formatBoolean: function (row, column, cellValue) {
        var ret = ''
        if (cellValue) {
          ret = "Yes"
        } else {
          ret = "No"
        }
        return ret;
      },
      classSelection: '',
      classData: [
      ],
      deliverableData: [
      ],
      search: ''
    }
  },
  methods: {
    calculateSum(param) {
      const { columns, data } = param;
      const sums = [];
      columns.forEach((column, index) => {
        if (index === 0) {
          sums[index] = 'Weight Sum:';
          return;
        }
        const values = data.map(item => Number(item[column.property]));
        if (index === 4) {
          sums[index] = values.reduce((prev, curr) => {
            const value = Number(curr);
            if (!isNaN(value)) {
              return prev + curr;
            } else {
              return prev;
            }
          }, 0);
        } else {
          sums[index] = '';
        }
      });

      return sums;
    },
    onChangeClass(classId) {
      const _this = this;
      axios.get('http://localhost:8080/getAllDeliverables/' + classId).then(function (resp) {
        _this.deliverableData = resp.data;
        console.log(_this.deliverableData)
      })
    },
    handleEditDeliverable(index, row) {
      console.log(index, row);
      this.$router.push({
        path: '/editDeliverable',
        query: {
          classId: this.classSelection,
          deliverableId: row.deliverableId,
          deliverableDesc: row.deliverableDesc,
          deliverableDeadLine: row.deadLine,
          deliverableWeight: row.percent,
          notified: row.isNotified
        }
    })
    },
    handleDeleteDeliverable(index, row) {
      const _this = this;
      this.$confirm('You are going to delete deliverable #' + row.deliverableId + '.', 'Notification', {
        confirmButtonText: 'Confirm',
        cancelButtonText: 'Cancel',
        type: 'warning'
      }).then(() => {
        axios.delete('http://localhost:8080/deleteDeliverable/' + row.deliverableId).then(function (resp) {
          if (resp.data === 'SUCCEED') {
            _this.$message({
              type: 'success',
              message: 'Deleted Successfully!'
            });
          } else {
            _this.$message.error('Database Error! Failed to delete.');
          }
          _this.onChangeClass(_this.classSelection);
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: 'Delete Cancelled'
        });
      });
    },
    updateAll() {

    }
  }
}
</script>

<style scoped>

</style>