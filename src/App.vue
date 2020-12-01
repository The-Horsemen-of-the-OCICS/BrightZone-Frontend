<template>
  <div id="app">

    <router-view v-if="isRouterAlive"></router-view>
  </div>
</template>

<script>
import bus from "@/components/common/bus";

export default {
  name: 'App',
  provide() {
    return {
      reload: this.reload
    }
  },
  data() {
    return {
      isRouterAlive: true
    }
  },
  methods: {
    reload() {
      this.isRouterAlive = false
      this.$nextTick(function () {
        this.isRouterAlive = true
      })
    }
  },

  created() {

    /**
     * retrieve "userMsg" from sessionStorage when a page is loaded, and assign "userMsg" in sessionStorage to this.$store.state
     *
     * Considering there is no "userMsg" in session Storage when the project is loaded for
     * the first time, so an assertion sessionStorage.getItem("userMsg") is not null is essential
     */
    sessionStorage.getItem("userMsg") && this.$store.replaceState(Object.assign({}, this.$store.state, JSON.parse(sessionStorage.getItem("userMsg"))));

    /**
     * inject data in "this.$store.state" to sessionStorage before loading a new page
     */
    window.addEventListener("beforeunload", () => {
      sessionStorage.setItem("userMsg", JSON.stringify(this.$store.state))
    })

  }
}
</script>

<style>
@import './assets/css/main.css';
@import "./assets/css/color-dark.css";

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}

.el-form-item.is-success .el-input__inner, .el-form-item.is-success .el-input__inner:focus, .el-form-item.is-success .el-textarea__inner, .el-form-item.is-success .el-textarea__inner:focus {
  border-color:#67C23A
}
.el-form-item.is-success .el-input-group__append .el-input__inner, .el-form-item.is-success .el-input-group__prepend .el-input__inner {
  border-color:transparent
}
.el-form-item.is-success .el-input__validateIcon {
  color:#67C23A
}
</style>
