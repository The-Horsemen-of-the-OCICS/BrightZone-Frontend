<template>
  <div class="sidebar">
    <el-menu
        :collapse="collapse"
        class="sidebar-el-menu"
        default-active="0"
        background-color="#324157"
        text-color="#bfcbd9"
        active-text-color="#20a0ff"
         @select="handleSelect">
      <el-menu-item index="/student" >
        <i class="el-icon-s-home"></i>
        <span slot="title">Home</span>
      </el-menu-item>

   <el-menu-item index="/studentCourse/ViewCourseMaterial">
       
        <i class="el-icon-document-checked"></i>
                <span slot="title">Materials</span>
    </el-menu-item>

       <el-menu-item index="/studentCourse/ViewCourseDeliverable">
       
        <i class="el-icon-document-checked"></i>
                <span slot="title">Deliverables</span>
    </el-menu-item>




    </el-menu>
  </div>
</template>

<script>
import bus from "@/components/common/bus";

export default {
  name: "StudentCourseNav",
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
    handleSelect(key, keyPath) {
      console.log(this.$route.params)
    if(key ==  '/studentCourse/ViewCourseDeliverable' || key ==  '/studentCourse/ViewCourseMaterial'){
      this.$router.push({
                path: key+"/"+this.$route.params.clazzId 
              })
    }else{
      this.$router.push({
          path: key
        })
    }
   
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