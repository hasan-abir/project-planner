import * as firebase from 'firebase/app'
import { db } from '../../firebase'

const state = {
  fetchingCurrentProject: true,
  currentProject: {},
  fetchingProjects: true,
  projects: [],
  creatingProject: false,
  errors: null,
  success: null,
}

const getters = {
  fetchingCurrentProject: (state) => state.fetchingCurrentProject,
  currentProject: (state) => state.currentProject,
  fetchingProjects: (state) => state.fetchingProjects,
  projects: (state) => state.projects,
  creatingProject: (state) => state.creatingProject,
  errors: (state) => state.errors,
  success: (state) => state.success,
}

const actions = {
  async fetchCurrentProject({ commit, rootState }, projectId) {
    try {
      commit('fetchingCurrentProject', null)

      const author = rootState.auth.user.userId

      const projectRef = await db
        .collection('users')
        .doc(author)
        .collection('projects')
        .doc(projectId)
        .get()

      let project = {}

      if (projectRef.exists) {
        project = {
          id: projectRef.id,
          ...projectRef.data(),
        }
      }

      commit('currentProjectFetched', project)
    } catch (err) {
      commit('setErrors', { query: err.message })
    }
  },
  async fetchUserProjects({ commit, rootState }) {
    try {
      commit('fetchingProjects', null)

      const author = rootState.auth.user.userId

      const querySnapshot = await db
        .collection('users')
        .doc(author)
        .collection('projects')
        .get()

      let projects = []

      querySnapshot.forEach((doc) => {
        const project = {
          id: doc.id,
          ...doc.data(),
        }
        projects = [project, ...projects]
      })

      commit('projectsFetched', projects)
    } catch (err) {
      commit('setErrors', { query: err.message })
    }
  },
  async createProject({ commit, rootState }, args) {
    const { projectTitle, clearForm } = args

    try {
      commit('creatingProject', null)

      if (projectTitle === '')
        return commit('setErrors', {
          title: 'Project title is required',
        })

      const author = rootState.auth.user.userId

      const newProject = {
        title: projectTitle,
        publishedAt: firebase.firestore.Timestamp.fromDate(new Date()),
      }

      const docRef = await db
        .collection('users')
        .doc(author)
        .collection('projects')
        .add(newProject)

      commit('projectCreated', {
        id: docRef.id,
        ...newProject,
      })

      clearForm()
    } catch (err) {
      commit('setErrors', { non_field: err.message })
    }
  },
  clearSuccess({ commit }) {
    commit('clearSuccess')
  },
  clearProjects({ commit }) {
    commit('clearProjects', null)
  },
}

const mutations = {
  fetchingCurrentProject: (state) => {
    state.fetchingCurrentProject = true
  },
  currentProjectFetched: (state, val) => {
    state.currentProject = val
    state.fetchingCurrentProject = false
  },
  fetchingProjects: (state) => {
    state.fetchingProjects = true
  },
  projectsFetched: (state, val) => {
    val.sort((a, b) => a.publishedAt.nanoseconds - b.publishedAt.nanoseconds)

    state.projects = val
    state.fetchingProjects = false
  },
  creatingProject: (state) => {
    state.creatingProject = true
    state.errors = null
    state.success = null
  },
  projectCreated: (state, val) => {
    state.creatingProject = false
    state.projects = [val, ...state.projects]
    state.success = {
      projectCreated: 'Project created successfully!',
    }
  },
  clearSuccess: (state) => {
    state.success = null
  },
  clearProjects: (state) => {
    state.currentProject = {}
    state.projects = []
    state.errors = null
    state.success = null
  },
  setErrors: (state, val) => {
    state.creatingProject = false
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
