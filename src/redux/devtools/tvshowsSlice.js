import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { tvshowsRequests } from '../../services/requests';
import { fetchingResults, initStateAndFetchThunks } from '../../utils';

/* FUNCTIONS */
function fetchThunk(genre) {
  return createAsyncThunk(`tvshows/fetch_${genre}`, url =>
    fetchingResults(url)
  );
}

/* TVSHOWS SLICE */
const [initialState, tvshowsFetchThunks] = initStateAndFetchThunks(
  tvshowsRequests,
  fetchThunk
);

const extraReducers = builder => {
  Object.keys(tvshowsRequests).map(genre => {
    builder.addCase(tvshowsFetchThunks[genre].fulfilled, (state, action) => {
      state[genre].data = action.payload;
      state[genre].loading = false;
    });

    builder.addCase(tvshowsFetchThunks[genre].pending, state => {
      state[genre].loading = true;
    });

    builder.addCase(tvshowsFetchThunks[genre].rejected, state => {
      state[genre].error = `Error fetching ${genre} tvshow`;
    });
  });
};

const tvshowsSlice = createSlice({
  name: 'tvshows',
  initialState,
  extraReducers,
});

const tvshowsReducer = tvshowsSlice.reducer;
const tvshowsActions = tvshowsSlice.actions;

export {
  tvshowsSlice,
  tvshowsFetchThunks,
  tvshowsReducer,
  tvshowsActions as tvshowsAction,
};
