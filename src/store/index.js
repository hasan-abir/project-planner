import Vuex from 'vuex'
import Vue from 'vue'
import auth from './modules/auth'
import project from './modules/project'
import testapp from './modules/testapp'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    auth,
    project,
    testapp,
  },
})
