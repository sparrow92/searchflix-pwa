export const state = () => ({
  country: process.browser ? (localStorage.getItem('country') || null) : null
});

export const getters = {
  isCountrySelected(state) {
    return state.country !== null
  },

  selectedCountry(state) {
    return state.country
  }
}

export const mutations = {
  STORE_COUNTRY(state, payload) {
    state.country = payload;
  },
};

export const actions = {
  updateCountry({ commit }, country) {
    localStorage.setItem('country', country);
    commit('STORE_COUNTRY', country)
  }
};