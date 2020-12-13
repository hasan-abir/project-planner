import { v4 as uuidv4 } from 'uuid'

const state = {
  currentProject: {
    tasks: [
      { id: uuidv4(), note: 'Task 1', status: 'todo' },
      { id: uuidv4(), note: 'Task 2', status: 'in-progress' },
      { id: uuidv4(), note: 'Task 3', status: 'done' },
    ],
  },
  errors: null,
  success: null,
}

const getters = {
  currentProject: (state) => state.currentProject,
  errors: (state) => state.errors,
  success: (state) => state.success,
}

const actions = {
  async addTask({ commit }, args) {
    const { note, status, clearForm } = args

    try {
      if (note === '')
        return commit('setErrors', {
          note: 'Adding a note is required',
        })

      const newTask = {
        note,
        status,
      }

      commit('projectUpdated', { id: uuidv4(), ...newTask })

      clearForm()
    } catch (err) {
      commit('setErrors', { non_field: err.message })
    }
  },
  async updateTask({ commit }, args) {
    const { taskId, status, toggleActions } = args
    try {
      commit('taskUpdated', {
        id: taskId,
        status,
      })

      toggleActions(false)
    } catch (err) {
      commit('setErrors', { query: err.message })
    }
  },
  async removeTask({ commit }, args) {
    const { taskId, toggleActions } = args

    try {
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
}

const mutations = {
  projectUpdated: (state, val) => {
    state.currentProject.tasks = [...state.currentProject.tasks, val]
    state.success = {
      projectUpdated: 'Task created successfully!',
    }
  },
  taskUpdated: (state, val) => {
    const tasks = [...state.currentProject.tasks]

    const index = tasks.findIndex((item) => item.id === val.id)

    tasks[index].status = val.status

    state.currentProject.tasks = tasks
  },
  taskRemoved: (state, val) => {
    const tasks = [...state.currentProject.tasks].filter(
      (item) => item.id !== val
    )

    state.currentProject.tasks = tasks
  },
  clearSuccess: (state) => {
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
