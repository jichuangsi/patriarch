import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
const state = {
  teacher: [],
  message:[]
}

const mutations = {
  TEACHER (state, val) {
    state.teacher = val
  },
  MESSAGE (state, val) {
    state.message = val
  }
}

export default new Vuex.Store({
  state,
  mutations
})
