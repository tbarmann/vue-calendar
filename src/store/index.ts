import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    isLoading: false,
    loadingErrorMessage: null
  },
  mutations: {
    SET_IS_LOADING(state, isLoading) {
      state.isLoading = isLoading;
    },
    SET_LOADING_ERROR_MESSAGE(state, message) {
      state.loadingErrorMessage = message;
    }

  },
  actions: {
    setIsLoading({commit}, isLoading) {
      commit("SET_IS_LOADING", isLoading);
    },
    clearLoadingErrorMessage({commit}) {
      commit("SET_LOADING_ERROR_MESSAGE", null);
    },
    setLoadingErrorMessage({commit}, message) {
      commit("SET_LOADING_ERROR_MESSAGE", message);
    }
  },
  getters: {
    isLoading: (state) => state.isLoading,
    loadingErrorMessage: (state) => state.loadingErrorMessage
  },
  modules: {}
});
