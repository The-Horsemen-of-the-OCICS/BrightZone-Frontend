<template>
  <el-menu
      class="professorNav"
      default-active="0"
      @open="handleOpen"
      @close="handleClose"
      router
  >
    <el-menu-item index="myCampus" >
      <i class="el-icon-s-home"></i>
      <span slot="title">Home</span>
    </el-menu-item>
    <el-submenu index="viewDeliverables">
      <template slot="title">
        <i class="el-icon-s-order"></i>
        <span>Manage Deliverables</span>
      </template>
      <el-menu-item index="viewDeliverables">
        <i class="el-icon-document-checked"></i>
        <span>View Deliverables</span>
      </el-menu-item>
      <el-menu-item index="editDeliverable">
        <i class="el-icon-edit"></i>
        <span>Edit Deliverable</span>
      </el-menu-item>
    </el-submenu>
    <el-submenu index="studentMenu">
      <template slot="title">
        <i class="el-icon-user-solid"></i>
        <span>Manage Students</span>
      </template>
      <el-menu-item index="viewStudents">
        <i class="el-icon-user"></i>
        <span>View Students</span>
      </el-menu-item>
      <el-menu-item index="viewSubmissions">
        <i class="el-icon-document-copy"></i>
        <span>View Submissions</span>
      </el-menu-item>
      <el-menu-item index="evaluateSubmission">
        <i class="el-icon-finished"></i>
        <span>Evaluate Submission</span>
      </el-menu-item>
    </el-submenu>
  </el-menu>
</template>

<script>
export default {
  name: "professorNav.vue",
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    }
  }
}
</script>

<style scoped>

</style>