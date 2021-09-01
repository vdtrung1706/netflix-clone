import axios from '../services/axios';

export function truncate(text, limit) {
  if (text && text.length >= limit) {
    let newText = text.substr(0, limit - 1);

    for (let i = limit - 1; i < text.length; i++) {
      if (text[i] === ' ') {
        return newText + '...';
      }

      newText += text[i];
    }

    return newText + '...';
  }

  return text;
}

export function randomIndex(length) {
  return Math.floor(Math.random() * length);
}

export function monthAgoDate() {
  const date = new Date();
  date.setMonth(date.getMonth() - 1);
  return date.toJSON().slice(0, 10);
}

export async function fetchingResults(url) {
  const res = await axios.get(url);
  const data = await res.data;
  return data.results;
}

export function initStateAndFetchThunks(genres = {}, callback) {
  const thunks = {};
  const state = { loading: false };

  const genreKeys = Object.keys(genres);

  genreKeys.map(genre => {
    state[genre] = {
      loading: false,
      error: '',
      data: [],
    };
    thunks[genre] = callback(genre);
  });

  return [state, thunks];
}
