import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { tvshowsRequests } from '@services/requests.service';
import { fetchingResults, initStateAndFetchThunks } from '@utils/redux.utils';

/* FUNCTIONS */
function fetchThunk(genre) {
  return createAsyncThunk(`tvshows/fetch_${genre}`, (url) =>
    fetchingResults(url),
  );
}

/* TVSHOWS SLICE */
const [initialState, tvshowsFetchThunks] = initStateAndFetchThunks(
  tvshowsRequests,
  fetchThunk,
);

const extraReducers = (builder) => {
  Object.keys(tvshowsRequests).map((genre) => {
    builder.addCase(tvshowsFetchThunks[genre].fulfilled, (state, action) => {
      state[genre].data = action.payload;
      state[genre].loading = false;
    });
    builder.addCase(tvshowsFetchThunks[genre].pending, (state) => {
      state[genre].loading = true;
    });
    builder.addCase(tvshowsFetchThunks[genre].rejected, (state) => {
      state[genre].error = `Error fetching ${genre} tvshow`;
    });
  });
};

const tvshowsSlice = createSlice({
  name: 'tvshows',
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

export { tvshowsFetchThunks };

export const { actions: tvshowsActions, reducer: tvshowsReducer } =
  tvshowsSlice;
