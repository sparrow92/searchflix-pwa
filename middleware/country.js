export default function ({ redirect, store }) {
  if (store.getters.isCountrySelected) {
    redirect('/app');
  }
};