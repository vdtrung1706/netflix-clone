import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { homepageRequests } from '@services/requests.service';
import { fetchingResults, initStateAndFetchThunks } from '@utils/redux.utils';

/* FUNCTIONS */
function fetchThunk(genre) {
  return createAsyncThunk(`movies/fetch_${genre}`, (url) =>
    fetchingResults(url),
  );
}

/* MOVIES SLICE */
const [initialState, homepageFetchThunks] = initStateAndFetchThunks(
  homepageRequests,
  fetchThunk,
);

const extraReducers = (builder) => {
  Object.keys(homepageRequests).map((genre) => {
    builder.addCase(homepageFetchThunks[genre].fulfilled, (state, action) => {
      state[genre].data = action.payload;
      state[genre].loading = false;
    });

    builder.addCase(homepageFetchThunks[genre].pending, (state) => {
      state[genre].loading = true;
    });

    builder.addCase(homepageFetchThunks[genre].rejected, (state) => {
      state[genre].error = `Error fetching ${genre} movies in homepage`;
    });
  });
};

const moviesSlice = createSlice({
  name: 'homepage',
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

export { homepageFetchThunks };

export const { actions: homepageActions, reducer: homepageReducer } =
  moviesSlice;
