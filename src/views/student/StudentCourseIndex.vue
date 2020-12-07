<template>
  <div>
     <el-row :gutter="20">
      <el-col >
        <div>
          <h1 style="display: flex; text-align: left;">{{ '[' + courseData.courseNo + '] ' + courseData.courseName }}</h1>
        </div>
      </el-col>
    </el-row>
  </div>

</template>

<script>

import axios from "axios";

export default {
  name: "StudentCourseIndex",
   created() {
    const _this = this;
    console.log(this.$route.params.clazzId)
    const params = new URLSearchParams([['clazzId', this.$route.params.clazzId ]]);
    axios.get('http://localhost:8080/getCourseVo',{params}).then(function (resp) {
      _this.courseData = resp.data;
    })

    
    
  },
  data() {
    return {
      courseData:{},
    }
  },
  computed: {

  },
  methods:{
    openClass(value) {
      console.log(value);
    },
  }
}
</script>

<style scoped>


</style>