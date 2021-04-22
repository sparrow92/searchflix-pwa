export default function ({ redirect, store }) {
  if (!store.getters.countrySelected) {
    redirect('/');
  }
};