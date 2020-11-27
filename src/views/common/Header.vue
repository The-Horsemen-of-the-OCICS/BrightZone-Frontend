<template>
  <div class="header">
    <!-- collapse button -->
    <div class="collapse-btn" @click="collapseChage">
      <i v-if="!collapse" class="el-icon-s-fold"></i>
      <i v-else class="el-icon-s-unfold"></i>
    </div>
    <div class="logo">CMS-{{ accountType }}</div>
    <div class="logo" v-if="">

    </div>
    <div class="header-right">
      <div class="header-user-con">
        <!-- full screen display -->
        <div class="btn-fullscreen" @click="handleFullScreen">
          <el-tooltip effect="dark" :content="fullscreen?`Cancel full screen`:`Full screen`" placement="bottom">
            <i class="el-icon-rank"></i>
          </el-tooltip>
        </div>
        <!-- message center -->
        <div class="btn-bell">
          <el-tooltip
              effect="dark"
              :content="message?`${message} unread messages`:`Message Box`"
              placement="bottom"
          >
            <i class="el-icon-bell"></i>
<!--            <router-link to="/tabs">-->
<!--              <i class="el-icon-bell"></i>-->
<!--            </router-link>-->
          </el-tooltip>
          <span class="btn-bell-badge" v-if="message"></span>
        </div>
        <!-- user-avator -->
        <div class="user-avator">
          <img src="@/assets/img/img.jpg"/>
        </div>
        <!-- user drop-down menu -->
        <el-dropdown class="user-name" trigger="click" @command="handleDropdownCommand">
                    <span class="el-dropdown-link">
                      {{ accountName }}
                        <i class="el-icon-caret-bottom"></i>
                    </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="profile">Profile</el-dropdown-item>
            <el-dropdown-item divided command="logout">Logout</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>
  </div>
</template>

<script>
import bus from "@/components/common/bus";
import axios from 'axios';

export default {
  name: "Header",
  data() {
    return {
      collapse: false,
      fullscreen: false,
      message: 0,
      name: this.$store.state.account.name,  // account name
      type: this.$store.state.account.type,  // account type (student, professor, admin, teaching_assistant)
    };
  },
  computed: {
    accountName() {
      let name = this.$store.state.account.name
      return name !== ''? name: 'MockName';  // if user doesn't login, name will be ''
    },
    accountType() {
      if (this.type === '') return 'MockAccountType'
      else return this.titleCase(this.type);  // if user doesn't login, type will be ''
    }
  },
  methods: {
    titleCase(str) {
      return str.slice(0,1).toUpperCase() + str.slice(1).toLowerCase();
    },
    handleDropdownCommand(command) {
      if (command === 'logout') {
        axios.get('http://localhost:8080/api/account/logout').then(resp => {
          if (resp.data.success) {  // logout success
            this.$message({
              showClose: true,
              message: 'Logout Success!',
              type: 'success'
            });
            // clear sessionStorage and redirect to login page
            this.$store.commit('logout');
            this.$router.push('/login');
          } else {  // logout fail
            this.$message({
              showClose: true,
              message: 'Error: ' + resp.data.errMsg,
              type: 'error'
            });
          }
        }).catch(err => {})
      } else if (command === 'profile') {
        this.$message({
          message: 'Warning, profile functionality is still under development.',
          type: 'warning'
        });
      }
    },
    // collapse side bar
    collapseChage() {
      this.collapse = !this.collapse;
      bus.$emit('collapse', this.collapse);
    },
    // full screen events
    handleFullScreen() {
      let element = document.documentElement;
      if (this.fullscreen) {
        if (document.exitFullscreen) {
          document.exitFullscreen();
        } else if (document.webkitCancelFullScreen) {
          document.webkitCancelFullScreen();
        } else if (document.mozCancelFullScreen) {
          document.mozCancelFullScreen();
        } else if (document.msExitFullscreen) {
          document.msExitFullscreen();
        }
      } else {
        if (element.requestFullscreen) {
          element.requestFullscreen();
        } else if (element.webkitRequestFullScreen) {
          element.webkitRequestFullScreen();
        } else if (element.mozRequestFullScreen) {
          element.mozRequestFullScreen();
        } else if (element.msRequestFullscreen) {
          // IE11
          element.msRequestFullscreen();
        }
      }
      this.fullscreen = !this.fullscreen;
    }
  },
  mounted() {
    if (document.body.clientWidth < 1500) {
      this.collapseChage();
    }
  }
}
</script>

<style scoped>
.header {
  position: relative;
  box-sizing: border-box;
  width: 100%;
  height: 70px;
  font-size: 22px;
  color: #fff;
}

.collapse-btn {
  float: left;
  padding: 0 21px;
  cursor: pointer;
  line-height: 70px;
}

.header .logo {
  float: left;
  width: 250px;
  line-height: 70px;
}

.header-right {
  float: right;
  padding-right: 50px;
}

.header-user-con {
  display: flex;
  height: 70px;
  align-items: center;
}

.btn-fullscreen {
  transform: rotate(45deg);
  margin-right: 5px;
  font-size: 24px;
}

.btn-bell,
.btn-fullscreen {
  position: relative;
  width: 30px;
  height: 30px;
  text-align: center;
  border-radius: 15px;
  cursor: pointer;
}

.btn-bell-badge {
  position: absolute;
  right: 0;
  top: -2px;
  width: 8px;
  height: 8px;
  border-radius: 4px;
  background: #f56c6c;
  color: #fff;
}

.btn-bell .el-icon-bell {
  color: #fff;
}

.user-name {
  margin-left: 10px;
}

.user-avator {
  margin-left: 20px;
}

.user-avator img {
  display: block;
  width: 40px;
  height: 40px;
  border-radius: 50%;
}

.el-dropdown-link {
  color: #fff;
  cursor: pointer;
}

.el-dropdown-menu__item {
  text-align: center;
}
</style>
