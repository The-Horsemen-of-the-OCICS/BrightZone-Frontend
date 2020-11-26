<template>
  <div class="wrapper">
    <v-head></v-head>
    <StudentNav></StudentNav>
    <div class="content-box" :class="{'content-collapse':collapse}">
      <div class="content">
        <transition name="move" mode="out-in">
          <keep-alive>
            <router-view></router-view>
          </keep-alive>
        </transition>
      </div>
    </div>
  </div>
</template>

<script>
import vHead from '@/views/admin/AdminHeader.vue';
import StudentNav from './StudentNav.vue'
import bus from "@/components/common/bus";


export default {
  name: 'StudentHome',
  data() {
    return {
      collapse: false
    };
  },
  components: {
    vHead,
    StudentNav
  },
  created() {
    bus.$on('collapse-content', msg => {
      this.collapse = msg;
    });
  },
}
</script>