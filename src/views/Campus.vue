<template>
  <div class="campus">
    <el-container style="height: 1000px; border: 1px solid #eee">
    <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
      <ProfessorNav></ProfessorNav>
    </el-aside>
    <el-main>
      <router-view></router-view>
    </el-main>
    </el-container>
  </div>
</template>

<script>
import ProfessorNav from '@/components/ProfessorNav.vue'
import ViewCourse from "@/components/MyCampus";

export default {
  name: 'Campus',
  components: {
    ProfessorNav
  }
}
</script>