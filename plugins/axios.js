export default function ({ $axios }) {
  $axios.onRequest(config => {
    config.headers.common['x-rapidapi-host'] = process.env.X_RAPIDAPI_HOST;
    config.headers.common['x-rapidapi-key'] = process.env.X_RAPIDAPI_KEY;
    config.headers.common['useQueryString'] = true;
  })
}