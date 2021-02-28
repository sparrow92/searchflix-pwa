import countries from './data/country/all'
import genres from './data/genre/all'
import movies from './data/movie/all'

const fetch = (mockData, time = 0) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockData)
    }, time)
  })
}

export default {
  fetchCountries () {
    return fetch(countries, 1000)
  },

  fetchGenres () {
    return fetch(genres, 1000)
  },

  fetchMovies () {
    return fetch(movies, 1000)
  },

  async fetchMovieImages (id) {
    let images = await import(`./data/movie/${id}/images`).then(module => module.default);
    return fetch(images, 1000)
  },

  async fetchMovieDetails (id) {
    let details = await import(`./data/movie/${id}/details`).then(module => module.default);
    return fetch(details, 1000)
  }

}