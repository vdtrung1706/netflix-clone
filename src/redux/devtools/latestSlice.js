import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { latestRequests } from '../../services/requests';
import { fetchingResults, initStateAndFetchThunks } from '../../utils';

/* FUNCTIONS */
function fetchThunk(genre) {
  return createAsyncThunk(`latest/fetch_${genre}`, url => fetchingResults(url));
}

/* LATEST SLICE */
const [initialState, latestFetchThunks] = initStateAndFetchThunks(
  latestRequests,
  fetchThunk
);

const extraReducers = builder => {
  Object.keys(latestRequests).map(genre => {
    builder.addCase(latestFetchThunks[genre].fulfilled, (state, action) => {
      state[genre].data = action.payload;
      state[genre].loading = false;
    });

    builder.addCase(latestFetchThunks[genre].pending, state => {
      state[genre].loading = true;
    });

    builder.addCase(latestFetchThunks[genre].rejected, state => {
      state[genre].error = `Error fetching ${genre} latest movies/tvshows`;
    });
  });
};

const latestSlice = createSlice({
  name: 'latest',
  initialState,
  reducers: {
    onFetches: state => {
      state.loading = true;
    },
    onFetchesSuccess: state => {
      state.loading = false;
    },
  },
  extraReducers,
});

export { latestSlice, latestFetchThunks };
