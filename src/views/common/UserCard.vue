<template>
  <el-card style="margin-bottom:20px;">
    <div slot="header" class="clearfix">
      <span>About me</span>
    </div>

    <div class="user-profile">
      <div class="box-center">
        <pan-thumb :height="'100px'" :width="'100px'" :hoverable="false">
          <div>Hello</div>
          {{ account.type }}
        </pan-thumb>
      </div>
      <div class="box-center">
        <div class="user-name text-center">{{ account.name }}</div>
        <div class="user-role text-center">
          <el-tag v-if="account.accountStatus === 'current'" type="success"> {{ account.accountStatus }}</el-tag>
          <el-tag v-if="account.accountStatus === 'alumni'" type="info"> {{ account.accountStatus }}</el-tag>
          <el-tag v-if="account.accountStatus === 'expelled'" type="danger"> {{ account.accountStatus }}</el-tag>
          <el-tag v-if="account.accountStatus === 'sabbatical'" type="warning"> {{ account.accountStatus }}</el-tag>
        </div>
      </div>
    </div>

    <div class="user-bio">
      <div class="user-education user-bio-section">
        <div class="user-bio-section-header">
          <i class="el-icon-lx-read" > Education</i>
        </div>
        <div class="user-bio-section-body">
          <div class="text-muted">
            Ottawa-Carleton Institute
          </div>
          <div v-if="account.type !== 'administrator'" class="text-muted">
            {{ account.faculty }} Faculty
          </div>
          <div v-if="account.type !== 'administrator'" class="text-muted">
            {{ account.program }} Program
          </div>
        </div>
      </div>
    </div>
  </el-card>
</template>

<script>
import PanThumb from '@/views/common/PanThumb'

export default {
  components: { PanThumb },
  props: {
    account: {
      type: Object,
      default: () => {
        return {
          userId: 'MockUserId',
          name: 'MockAccountName',
          type: 'MockAccountType',
          faculty: 'MockFaculty',
          program: 'MockProgram',
          accountStatus: 'MockStatus',
        }
      }
    }
  },
  created() {
  }
}
</script>

<style lang="scss" scoped>
.box-center {
  margin: 0 auto;
  display: table;
}

.text-muted {
  color: #777;
  text-align: left;
}

.user-profile {
  .user-name {
    font-weight: bold;
  }

  .box-center {
    padding-top: 10px;
  }

  .user-role {
    padding-top: 10px;
    font-weight: 400;
    font-size: 14px;
  }

  .box-social {
    padding-top: 30px;

    .el-table {
      border-top: 1px solid #dfe6ec;
    }
  }

  .user-follow {
    padding-top: 20px;
  }
}

.user-bio {
  margin-top: 20px;
  color: #606266;

  span {
    padding-left: 4px;
  }

  .user-bio-section {
    font-size: 14px;
    padding: 15px 0;

    .user-bio-section-header {
      border-bottom: 1px solid #dfe6ec;
      padding-bottom: 10px;
      margin-bottom: 10px;
      font-weight: bold;
      text-align: left;
    }
  }
}
</style>
