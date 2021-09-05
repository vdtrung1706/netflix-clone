import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { moviesRequests } from '@services/requests.service';
import { fetchingResults, initStateAndFetchThunks } from '@utils/redux.utils';

/* FUNCTIONS */
function fetchThunk(genre) {
  return createAsyncThunk(`movies/fetch_${genre}`, (url) =>
    fetchingResults(url),
  );
}

/* MOVIES SLICE */
const [initialState, moviesFetchThunks] = initStateAndFetchThunks(
  moviesRequests,
  fetchThunk,
);

const extraReducers = (builder) => {
  Object.keys(moviesRequests).map((genre) => {
    builder.addCase(moviesFetchThunks[genre].fulfilled, (state, action) => {
      state[genre].data = action.payload;
      state[genre].loading = false;
    });

    builder.addCase(moviesFetchThunks[genre].pending, (state) => {
      state[genre].loading = true;
    });

    builder.addCase(moviesFetchThunks[genre].rejected, (state) => {
      state[genre].error = `Error fetching ${genre} movies`;
    });
  });
};

const moviesSlice = createSlice({
  name: 'movies',
  initialState,
  reducers: {
    onFetches: (state) => {
      state.loading = true;
    },
    onFetchesSuccess: (state) => {
      state.loading = false;
    },
  },
  extraReducers,
});

export { moviesSlice, moviesFetchThunks };
