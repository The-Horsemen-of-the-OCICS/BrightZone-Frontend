<template>
  <div class="wrapper">
    <v-head></v-head>
    <StudentCourseNav></StudentCourseNav>
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
import vHead from '@/views/common/Header';
import StudentCourseNav from './StudentCourseNav.vue'
import bus from "@/components/common/bus";


export default {
  name: 'StudentCourseHome',
  data() {
    return {
      collapse: false
    };
  },
  components: {
    vHead,
    StudentCourseNav
  },
  created() {
    bus.$on('collapse-content', msg => {
      this.collapse = msg;
    });
  },
}
</script>
