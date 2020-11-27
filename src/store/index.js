import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    account: {
      userId: '',
      name: '',
      type: '',
      email: '',
    }
  },
  mutations: {
    login(state, account) {
      state.account = account;
      sessionStorage.setItem("userMsg", JSON.stringify(state));
    },
    logout(state) {
      state.account.userId = '';
      state.account.name = '';
      state.account.type = '';
      state.account.email = '';
      sessionStorage.removeItem("userMsg");
    }
  },
  actions: {
  },
  modules: {
  }
})
