<template>
  <div class="wrapper">
    <v-head></v-head>
    <ProfessorNav></ProfessorNav>
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
import ProfessorNav from '@/components/ProfessorNav.vue'
import vHead from '@/views/admin/AdminHeader.vue';
import bus from "@/components/common/bus";


export default {
  name: 'Campus',
  data() {
    return {
      collapse: false
    };
  },
  components: {
    vHead,
    ProfessorNav
  },
  created() {
    bus.$on('collapse-content', msg => {
      this.collapse = msg;
    });
  },
}
</script>