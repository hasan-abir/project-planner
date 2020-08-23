import * as firebase from 'firebase/app'
import { db, auth, getCurrentUser } from '../../firebase'
import router from '../../router'

const state = {
  isLoggedIn: false,
  loadingUser: true,
  authenticating: false,
  user: null,
  errors: null,
}

const getters = {
  loadingUser: (state) => state.loadingUser,
  isLoggedIn: (state) => state.isLoggedIn,
  authenticating: (state) => state.authenticating,
  errors: (state) => state.errors,
}

const actions = {
  async loadUser({ commit }) {
    const currentUser = await getCurrentUser()

    if (currentUser) {
      const docRef = await db
        .collection('users')
        .doc(currentUser.uid)
        .get()

      const user = {
        userId: currentUser.uid,
        displayName: docRef.data().displayName,
      }

      commit('authenticated', user)
    } else {
      commit('userNotLoaded', null)
    }
  },
  async basicRegister({ commit }, args) {
    const { displayName, email, password, clearForm } = args
    try {
      commit('authenticating', null)

      const errors = {}

      if (displayName === '') errors.displayName = 'Display name is required'
      if (email === '') errors.email = 'Email is required'
      if (password === '') errors.password = 'Password is required'

      if (Object.keys(errors).length !== 0 && errors.constructor === Object)
        return commit('setErrors', errors)

      await auth.createUserWithEmailAndPassword(email, password)

      const userId = await auth.currentUser.uid

      await db
        .collection('users')
        .doc(userId)
        .set({
          displayName,
        })

      clearForm()

      const newUser = {
        userId,
        displayName,
      }

      commit('authenticated', newUser)
    } catch (err) {
      commit('setErrors', { non_field: err.message })
    }
  },
  async basicLogin({ commit }, args) {
    const { email, password, clearForm } = args
    try {
      commit('authenticating', null)

      const errors = {}

      if (email === '') errors.email = 'Email is required'
      if (password === '') errors.password = 'Password is required'

      if (Object.keys(errors).length !== 0 && errors.constructor === Object)
        return commit('setErrors', errors)

      await auth.signInWithEmailAndPassword(email, password)

      const userId = await auth.currentUser.uid

      const docRef = await db
        .collection('users')
        .doc(userId)
        .get()

      clearForm()

      const user = {
        userId,
        displayName: docRef.data().displayName,
      }

      commit('authenticated', user)

      router.push('/dashboard')
    } catch (err) {
      commit('setErrors', { non_field: err.message })
    }
  },
  async googleSignIn({ commit }, clearForm) {
    try {
      commit('authenticating', null)

      const provider = new firebase.auth.GoogleAuthProvider()

      const result = await auth.signInWithPopup(provider)

      await db
        .collection('users')
        .doc(result.user.uid)
        .set({
          displayName: result.user.displayName,
        })

      clearForm()

      const newUser = {
        userId: result.user.uid,
        displayName: result.user.displayName,
      }

      commit('authenticated', newUser)

      router.push('/dashboard')
    } catch (err) {
      commit('setErrors', { non_field: err.message })
    }
  },
  async logOut({ commit, dispatch }) {
    await auth.signOut()

    dispatch('project/clearProjects', null, { root: true })
    commit('logout', null)
    router.push('/login')
  },
  clearErrors({ commit }) {
    commit('setErrors', null)
  },
}

const mutations = {
  userNotLoaded: (state) => {
    state.loadingUser = false
  },
  authenticating: (state) => {
    state.authenticating = true
    state.errors = null
  },
  authenticated: (state, val) => {
    state.isLoggedIn = true
    state.loadingUser = false
    state.user = val
  },
  logout: (state) => {
    state.isLoggedIn = false
    state.user = null
  },
  setErrors: (state, val) => {
    state.authenticating = false
    state.errors = val
  },
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
}
