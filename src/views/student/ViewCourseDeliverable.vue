<template>
  <div>
    <el-card>
    <el-table
        stripe
        :data="deliverableData"
        style="width: 100%"
        empty-text='No opened courses found!'
        ref="openedCourseTable"
    >

      <el-table-column
          label="Deliverable Desc"
          prop="deliverableDesc"
          sortable
      >
      </el-table-column>
      <el-table-column
          label="Deadline"
          prop="deadline"
>
      </el-table-column>

      <el-table-column
          label="SubmitTime"
          prop="submitTime"
>
      </el-table-column>

      <el-table-column
          label="Score"
          prop="score"
      >
      </el-table-column>

      <el-table-column align="right">

      <el-upload
        class="upload-container"
        ref="upload"
        action="#"
         :file-list="fileList"
        slot-scope="scope"
        :limit= "1"
			  :on-change="handleChange"
        :auto-upload="false">
        <el-button slot="trigger" size="small" type="primary">Choose File</el-button>


        <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload(scope.row)">Upload</el-button>

      </el-upload>
      </el-table-column>
    </el-table>


    </el-card>



  </div>

  
</template>

<script>
import axios from "axios";

export default {
  name: "ViewCourseDeliverable",
  created() {
    const _this = this;
    const params = new URLSearchParams([['clazzId', this.$route.params.classId ]]);
    axios.get('http://localhost:8080/getAllDeliverable',{params}).then(function (resp) {
      _this.deliverableData = resp.data;
    })
    console.log(this.$route.params.classId)
  },
  data() {
    return {
      deliverableData: [],
      fileList : [],
      file :{}
    }
  },
  methods: {
    submitUpload(row) {
      let formData = new FormData();
      const _this = this;
      formData.append("file", this.file.raw);
      formData.append("deliverableId", row.deliverableId);
      this.axios.post("http://localhost:8080/submitDeliverable", formData).then(function(resp){
        if (resp.data === 'true') {
           _this.$message({
              type: 'success',
              message: 'Upload Success!'
            });
            _this.file={};
        }else {
            _this.$message.error('Upload Failed!');
        }
       
      
      }).catch(() => {
        this.$message({
          type: 'info',
          message: 'Upload Cancelled'
        });
      });

    
    },
     handleChange(file,fileList){
      console.log("handleChange")
      this.file = fileList[0];
     },
    
  }
}
</script>

<style scoped>
.upload-container /deep/ .el-upload{
    display:inline;
}
</style>