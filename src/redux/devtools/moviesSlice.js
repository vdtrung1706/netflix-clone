import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { randomIndex } from '../../utils';
import { moviesRequests } from '../../services/requests';
import axios from '../../services/axios';

/* FUNCTIONS */
async function fetchingResults(url) {
  const res = await axios.get(url);
  const data = await res.data;
  return data.results;
}

function fetchThunk(genre) {
  return createAsyncThunk(`movies/fetch_${genre}`, url => fetchingResults(url));
}

function initStateAndFetchThunks(genres) {
  const fetchThunks = [];
  const state = {
    billboard: { loading: false, error: '', movie: {} },
  };

  if (!genres) return [state, fetchThunks];

  Object.keys(genres).map(genre => {
    state[genre] = { loading: false, error: '', data: [] };

    fetchThunks.push(fetchThunk(genre));
  });

  return [state, fetchThunks];
}

export const fetchBillboardFromAPI = createAsyncThunk(
  'movies/fetch_billboard',
  async url => {
    const res = await axios.get(url);
    const results = await res.data.results;
    return results[randomIndex(results.length)];
  }
);

/* MOVIES SLICE */
const [initialState, fetchThunks] = initStateAndFetchThunks(moviesRequests);

const extraReducers = builder => {
  builder.addCase(fetchBillboardFromAPI.fulfilled, (state, action) => {
    state.billboard.movie = action.payload;
    state.billboard.loading = false;
  });

  builder.addCase(fetchBillboardFromAPI.pending, state => {
    state.billboard.loading = true;
  });

  builder.addCase(fetchBillboardFromAPI.rejected, state => {
    state.billboard.error = 'Error fetching billboard movie';
  });

  Object.keys(moviesRequests).map((genre, index) => {
    builder.addCase(fetchThunks[index].fulfilled, (state, action) => {
      state[genre].data = action.payload;
      state[genre].loading = false;
    });

    builder.addCase(fetchThunks[index].pending, state => {
      state[genre].loading = true;
    });

    builder.addCase(fetchThunks[index].rejected, state => {
      state[genre].error = `Error fetching ${genre}`;
    });
  });
};

const moviesSlice = createSlice({
  name: 'movies',
  initialState,
  extraReducers,
});

const moviesReducer = moviesSlice.reducer;
const moviesActions = moviesSlice.actions;

export { moviesSlice, fetchThunks, moviesReducer, moviesActions };
