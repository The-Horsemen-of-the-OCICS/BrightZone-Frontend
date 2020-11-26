<template>
  <div>
     <el-row :gutter="20">
      <el-col :span="14">
        <div>
          <h1 style="display: flex; text-align: left;">CSI 51089</h1>
        </div>
      </el-col>
    </el-row>
  </div>

</template>

<script>

import axios from "axios";

export default {
  name: "StudentIndex",
  created() {
    const _this = this;
    //console.log(this.$route.params.classId)
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
    openClass(value) {
      console.log(value);
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