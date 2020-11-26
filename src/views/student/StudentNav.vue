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
      <el-menu-item index="/student/index" >
        <i class="el-icon-s-home"></i>
        <span slot="title">Home</span>
      </el-menu-item>
      <el-submenu index="/">
        <template slot="title">
          <i class="el-icon-s-order"></i>
          <span>Registration</span>
        </template>
        <el-menu-item index="/student/viewOpenedCourse">
          <i class="el-icon-document-checked"></i>
          <span>View Opened Courses</span>
        </el-menu-item>
        <el-menu-item index="/student/viewRegisteredCourse">
          <i class="el-icon-document-checked"></i>
          <span>View Registered Courses</span>
        </el-menu-item>
      </el-submenu>
    </el-menu>
  </div>
</template>

<script>
import bus from "@/components/common/bus";

export default {
  name: "StudentNav",
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