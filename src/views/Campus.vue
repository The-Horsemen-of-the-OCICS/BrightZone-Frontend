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
      collapse: false,
      userId: this.$store.state.account.userId
    };
  },
  components: {
    vHead,
    ProfessorNav
  },
  created() {
    if (!this.userId || this.userId === '' || this.userId < 2000000 || this.userId >= 3000000) {
      this.$router.push('/404');
    } else {
      bus.$on('collapse-content', msg => {
        this.collapse = msg;
      });
    }

  },
}
</script>