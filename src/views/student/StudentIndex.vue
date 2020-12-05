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
.el-row {
  display: flex;
  flex-wrap: wrap;
}
.box-card {
  min-width: 100%;
  height: 100%;
}
.image {
  width: 100%;
  display: block;
}
.clearfix:before,
.clearfix:after {
  padding: 0;
  display: table;
  content: "";
}

.clearfix:after {
  clear: both
}

.user-info {
  display: flex;
  align-items: center;
  padding-bottom: 15px;
  border-bottom: 1px solid #ccc;
  margin-bottom: 10px;
}

.user-avator {
  width: 120px;
  height: 120px;
  border-radius: 50%;
}

.user-info-cont {
  padding-left: 50px;
  flex: 1;
  font-size: 30px;
  color: #222;
}

.user-info-cont div:last-child {
  margin-top: 5px;
  font-size: 20px;
  color: #999;
}

.user-info-list {
  font-size: 14px;
  color: #999;
  line-height: 25px;
}

.user-info-list span {
  margin-left: 70px;
}

.mgb20 {
  margin-bottom: 20px;
}

</style>