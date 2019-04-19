import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
const state = {
  teacher: []
}

const mutations = {
  TEACHER (state, val) {
    state.teacher = val
  }
}

export default new Vuex.Store({
  state,
  mutations
})
