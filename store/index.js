export const state = () => ({
  country: process.browser ? (localStorage.getItem('country') || null) : null,
  movies: []
});

export const getters = {
  isCountrySelected(state) {
    return state.country !== null
  },

  selectedCountry(state) {
    return state.country
  },

  getMovies(state) {
    return state.movies;
  }
}

export const mutations = {
  STORE_COUNTRY(state, payload) {
    state.country = payload
  },

  ADD_MOVIE(state, movie) {
    let array = state.movies.filter(item => {
      return item.id === movie.id
    });

    if (!array.length) {
      state.movies.push(movie)
    }
  },

  REMOVE_MOVIE(state, id) {
    let array = state.movies.filter(item => {
      return item.id === id
    });

    if (array.length) {
      state.movies.splice(state.movies.map(item => item.id).indexOf(id), 1)
    }
  },
};

export const actions = {
  updateCountry({ commit }, country) {
    localStorage.setItem('country', country);
    commit('STORE_COUNTRY', country)
  },

  addMovie({ commit }, movie) {
    commit('ADD_MOVIE', movie)
  },

  removeMovie({ commit }, id) {
    commit('REMOVE_MOVIE', id)
  }
};