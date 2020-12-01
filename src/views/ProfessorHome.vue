<template>
  <div class="wrapper">
    <Header></Header>
    <ProfessorNav></ProfessorNav>
    <div class="content-box" :class="{'content-collapse':collapse}">
      <div class="content">
        <transition name="move" mode="out-in">
          <keep-alive>
            <router-view :key="$route.fullPath"></router-view>
          </keep-alive>
        </transition>
      </div>
    </div>
  </div>
</template>

<script>
import ProfessorNav from '@/components/ProfessorNav.vue'
import Header from '@/views/common/Header.vue';
import bus from "@/components/common/bus";


export default {
  name: 'ProfessorHome',
  data() {
    return {
      collapse: false,
      userId: this.$store.state.account.userId
    };
  },
  components: {
    Header,
    ProfessorNav
  },
  created() {
    bus.$on('collapse-content', msg => {
    this.collapse = msg;});
  },
}
</script>
