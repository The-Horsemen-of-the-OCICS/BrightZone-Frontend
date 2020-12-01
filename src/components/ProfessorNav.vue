<template>
  <div class="sidebar">
    <el-menu
        :collapse="collapse"
        class="sidebar-el-menu"
        default-active="0"
        background-color="#324157"
        text-color="#bfcbd9"
        active-text-color="#20a0ff"
        @open="handleOpen"
        @close="handleClose"
        router
    >
      <el-menu-item index="index" >
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
      <el-menu-item index="/professor/profile">
        <i class="el-icon-lx-profile"></i>
        <span>Profile</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script>
import bus from "@/components/common/bus";

export default {
  name: "professorNav.vue",
  created() {
    bus.$on('collapse', msg => {
      this.collapse = msg;
      bus.$emit('collapse-content', msg);
    });
  },
  data() {
    return {
      collapse: false,
    }
  },
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
.sidebar {
  display: block;
  position: absolute;
  left: 0;
  top: 70px;
  bottom: 0;
  overflow-y: scroll;
  text-align: left;
}

.sidebar::-webkit-scrollbar {
  width: 0;
}

.sidebar-el-menu:not(.el-menu--collapse) {
  width: 250px;
}

.sidebar > ul {
  height: 100%;
}
</style>
