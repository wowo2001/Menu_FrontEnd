// src/store/index.js
import { createStore } from 'vuex';

const store = createStore({
  state: {
    isAuthenticated: false, // Set this flag based on actual authentication status
  },
  mutations: {
    setAuthenticated(state, status) {
      state.isAuthenticated = status;
    },
  },
});

export default store;
