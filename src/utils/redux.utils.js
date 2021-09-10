import { axios } from '@services/axios.service';

export async function fetchingResults(url) {
  const res = await axios.get(url);
  const data = await res.data;
  return data.results;
}

export function initStateAndFetchThunks(genres = {}, callback) {
  const thunks = {};
  const state = { loading: false };
  const genreKeys = Object.keys(genres);

  genreKeys.map((genre) => {
    state[genre] = {
      loading: false,
      error: '',
      data: [],
    };
    thunks[genre] = callback(genre);
  });

  return [state, thunks];
}

export function conllectIdAndDocs(doc) {
  return { id: doc.id, ...doc.data() };
}
