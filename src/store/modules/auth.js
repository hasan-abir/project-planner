const state = {
  isLoggedIn: false,
  loadingUser: true,
}

const getters = {
  isLoggedIn: (state) => state.isLoggedIn,
}

const actions = {}

const mutations = {}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
}
