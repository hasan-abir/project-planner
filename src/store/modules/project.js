import * as firebase from 'firebase/app'
import { db } from '../../firebase'
import router from '../../router'

const state = {
  fetchingCurrentProject: true,
  currentProject: {},
  fetchingProjects: true,
  projects: [],
  creatingProject: false,
  removingProject: false,
  addingTask: false,
  updatingTask: false,
  removingTask: false,
  errors: null,
  success: null,
}

const getters = {
  fetchingCurrentProject: (state) => state.fetchingCurrentProject,
  currentProject: (state) => state.currentProject,
  fetchingProjects: (state) => state.fetchingProjects,
  projects: (state) => state.projects,
  creatingProject: (state) => state.creatingProject,
  removingProject: (state) => state.removingProject,
  addingTask: (state) => state.addingTask,
  updatingTask: (state) => state.updatingTask,
  removingTask: (state) => state.removingTask,
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
        let tasks = []

        const querySnapshot = await db
          .collection('users')
          .doc(author)
          .collection('projects')
          .doc(projectId)
          .collection('tasks')
          .get()

        querySnapshot.forEach((doc) => {
          tasks = [...tasks, { id: doc.id, ...doc.data() }]
        })

        project = {
          id: projectRef.id,
          ...projectRef.data(),
          tasks,
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
  async deleteProject({ commit, rootState }, args) {
    const { projectId, toggleDelete } = args

    try {
      commit('removingProject', true)

      const author = rootState.auth.user.userId

      const projectDoc = await db
        .collection('users')
        .doc(author)
        .collection('projects')
        .doc(projectId)

      const tasksSnapshot = await projectDoc.collection('tasks').get()

      const batch = await db.batch()

      tasksSnapshot.forEach(function(doc) {
        batch.delete(doc.ref)
      })

      await batch.commit()

      await projectDoc.delete()

      toggleDelete(false)

      commit('removingProject', false)

      router.push('/dashboard')
    } catch (err) {
      commit('setErrors', { query: err.message })
    }
  },
  async addTask({ commit, rootState }, args) {
    const { projectId, note, status, clearForm } = args

    try {
      commit('addingTask', null)

      if (note === '')
        return commit('setErrors', {
          note: 'Adding a note is required',
        })

      const author = rootState.auth.user.userId

      const newTask = {
        note,
        status,
      }

      const docRef = await db
        .collection('users')
        .doc(author)
        .collection('projects')
        .doc(projectId)
        .collection('tasks')
        .add(newTask)

      commit('projectUpdated', { id: docRef.id, ...newTask })

      clearForm()
    } catch (err) {
      commit('setErrors', { non_field: err.message })
    }
  },
  async updateTask({ commit, rootState }, args) {
    const { projectId, taskId, status, toggleActions } = args

    try {
      commit('updatingTask', null)

      const author = rootState.auth.user.userId

      const taskDoc = await db
        .collection('users')
        .doc(author)
        .collection('projects')
        .doc(projectId)
        .collection('tasks')
        .doc(taskId)

      if ((await taskDoc.get()).exists) {
        await taskDoc.update({
          status,
        })

        commit('taskUpdated', {
          id: taskId,
          status,
        })

        toggleActions(false)
      }
    } catch (err) {
      commit('setErrors', { query: err.message })
    }
  },
  async removeTask({ commit, rootState }, args) {
    const { projectId, taskId, toggleActions } = args

    try {
      commit('removingTask', null)

      const author = rootState.auth.user.userId

      await db
        .collection('users')
        .doc(author)
        .collection('projects')
        .doc(projectId)
        .collection('tasks')
        .doc(taskId)
        .delete()

      commit('taskRemoved', taskId)

      toggleActions(false)
    } catch (err) {
      commit('setErrors', { query: err.message })
    }
  },
  clearSuccess({ commit }) {
    commit('clearSuccess')
  },
  clearErrors({ commit }) {
    commit('setErrors', null)
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
  removingProject: (state, val) => {
    state.removingProject = val
    state.errors = null
    state.success = null
  },
  addingTask: (state) => {
    state.addingTask = true
    state.errors = null
    state.success = null
  },
  updatingTask: (state) => {
    state.updatingTask = true
    state.errors = null
    state.success = null
  },
  removingTask: (state) => {
    state.removingTask = true
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
  projectUpdated: (state, val) => {
    state.addingTask = false
    state.currentProject.tasks = [...state.currentProject.tasks, val]
    state.success = {
      projectUpdated: 'Task created successfully!',
    }
  },
  taskUpdated: (state, val) => {
    state.updatingTask = false

    const tasks = [...state.currentProject.tasks]

    const index = tasks.findIndex((item) => item.id === val.id)

    tasks[index].status = val.status

    state.currentProject.tasks = tasks
  },
  taskRemoved: (state, val) => {
    state.removingTask = false

    const tasks = [...state.currentProject.tasks].filter(
      (item) => item.id !== val
    )

    state.currentProject.tasks = tasks
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
    state.addingTask = false
    state.updatingTask = false
    state.removingTask = false
  },
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
}
