export const state = () => ({
  country: process.browser ? (localStorage.getItem('country') || null) : null,
  movies:  process.browser ? (JSON.parse(localStorage.getItem('movies')) || []) : [],
  blacklist:  process.browser ? (JSON.parse(localStorage.getItem('blacklist')) || []) : [],
  query: {
    query: '',
    limit: '', 
    offset: '', 
    genre_list: '',
    type: '',
    start_year: '',
    end_year: '',
    audiosubtitle_andor: '',
    start_rating: '',
    end_rating: '',
    subtitle: '',
    audio: '',
    countrylist: '',
  },
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
  },

  getBlacklist(state) {
    return state.blacklist
  },

  getQuery(state) {
    return state.query
  }
}

export const mutations = {
  STORE_COUNTRY(state, payload) {
    state.country = payload
  },

  ADD_MOVIE(state, movie) {
    let array = state.movies.filter(item => {
      return item.netflixid === movie.id
    });

    if (!array.length) {
      state.movies.push(movie)
    }
  },

  REMOVE_MOVIE(state, id) {
    let array = state.movies.filter(item => {
      return item.netflixid === id
    });

    if (array.length) {
      state.movies.splice(state.movies.map(item => item.netflixid).indexOf(id), 1)
    }
  },

  ADD_GENRE(state, genre) {
    let array = state.blacklist.filter(item => {
      return item.netflixid === genre.netflixid
    });

    if (!array.length) {
      state.blacklist.push(genre)
    }
  },

  REMOVE_GENRE(state, id) {
    let array = state.blacklist.filter(item => {
      return item.netflixid === id
    });

    if (array.length) {
      state.blacklist.splice(state.blacklist.map(item => item.netflixid).indexOf(id), 1)
    }
  },

  STORE_QUERY(state, payload) {
    state.query = payload
  },
};

export const actions = {
  updateCountry({ commit }, country) {
    localStorage.setItem('country', country);
    commit('STORE_COUNTRY', country)
  },

  addMovie({ commit, state }, movie) {
    commit('ADD_MOVIE', movie);
    localStorage.setItem('movies', JSON.stringify(state.movies));
  },

  removeMovie({ commit, state }, id) {
    commit('REMOVE_MOVIE', id);
    localStorage.setItem('movies', JSON.stringify(state.movies));
  },

  addGenre({ commit, state }, genre) {
    commit('ADD_GENRE', genre);
    localStorage.setItem('blacklist', JSON.stringify(state.blacklist));
  },

  removeGenre({ commit, state }, id) {
    commit('REMOVE_GENRE', id);
    localStorage.setItem('blacklist', JSON.stringify(state.blacklist));
  },

  saveQuery({ commit }, query) {
    commit('STORE_QUERY', query);
  }
};