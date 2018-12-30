import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    storeVal:"Test store",
    socket: {}
  },
  mutations: {
    SET_MESSAGES(state, value) {
      state.storeVal = value;
    },
    SET_SOCKET(state, value) {
      state.socket = value;
    }
  },
  getters :{
    getSocket: state => () => state.socket
  }
});

