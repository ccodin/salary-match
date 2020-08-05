import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    minWage: null,
    maxWage: null,
    maxIsGtMin: null,
    isModalOpen: false,
    currency: '€',
    currentTab: 'TabEmployee'
  },
  mutations: {
    setMinWage (state, wage) {
      if (isNaN(+wage)) return

      state.minWage = +wage || null
      if (state.minWage !== null && state.maxWage !== null) {
        this.commit('setMaxIsGtMin', state.minWage <= state.maxWage)
      }
    },
    setMaxWage (state, wage) {
      if (isNaN(+wage)) return

      state.maxWage = +wage || null
      if (state.minWage !== null && state.maxWage !== null) {
        this.commit('setMaxIsGtMin', state.minWage <= state.maxWage)
      }
    },
    setMaxIsGtMin (state, maxIsGreater) {
      state.maxIsGtMin = maxIsGreater
    },
    openModal (state) {
      state.isModalOpen = true
    },
    closeModal (state) {
      state.isModalOpen = false
    },
    switchTab (state, tab) {
      state.currentTab = tab
    }
  },
  actions: {
    resetWages ({ commit }) {
      commit('setMinWage', null)
      commit('setMaxWage', null)
      commit('setMaxIsGtMin', null)
    }
  }
})
