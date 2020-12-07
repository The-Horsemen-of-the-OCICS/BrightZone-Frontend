<template>
  <div>
     <el-row :gutter="20">
      <el-col :span="14">
        <el-row :gutter="20" class="el-row">
          <el-col :span="12" v-for="c in this.courseData" :key="c.courseId"  style="margin-bottom: 20px;cursor: pointer;" >
            <el-card class="box-card" shadow="hover" @click.native="openCourse(c.clazzId)">
              <div slot="header" class="clearfix" style="margin: -20px">
                <img src="../../assets/img/sunsetpalmsbanner.jpg" class="image">
              </div>
              <div>
                <h3 style="display: flex; text-align: left;">{{ '[' + c.courseNo + '] ' + c.courseName }}</h3>
              </div>
            </el-card>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
  </div>

</template>

<script>

import axios from "axios";
import bus from "@/components/common/bus";

export default {
  name: "StudentIndex",
  created() {
    const _this = this;
    axios.get('http://localhost:8080/getAllRegisteredCourse').then(function (resp) {
      _this.courseData = resp.data;
    });
     bus.$on('register-course', msg => {
       axios.get('http://localhost:8080/getAllRegisteredCourse').then(function (resp) {
      _this.courseData = resp.data;
    })
    });
   bus.$on('drop-course', msg => {
       _this.courseData=_this.courseData.filter((item) => { return item.clazzId !== msg.clazzId; });
    });

               

  },
  data() {
    return {
      courseData:[
      ],
    }
  },
  computed: {

  },
  methods:{
    openCourse(clazzId) {
      console.log(clazzId)
      this.$router.push({
        path: `/studentCourse/index/${clazzId}`,
      })
    },
  }
}
</script>

<style scoped>

.box-card {
  width: 100%;
  height: 100%;
}
.image {
  width: 100%;
  height: 200px;
  display: block;
}


</style>