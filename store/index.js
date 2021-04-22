export const state = () => ({
  country: process.browser ? (localStorage.getItem('country') || null) : null
});

export const getters = {
  countrySelected(state) {
    return state.country !== null
  }
}

export const mutations = {
  STORE_COUNTRY(state, payload) {
    state.country = payload.country;
  },
};

export const actions = {
  updateCountry({ commit }, country) {
    localStorage.setItem('country', country);
    commit('STORE_COUNTRY', country)
  }
};