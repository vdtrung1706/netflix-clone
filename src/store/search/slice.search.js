import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchingResults } from '@utils/redux.utils';

const initialState = {
  loading: false,
  error: '',
  searchContent: '',
  results: [],
};

const fetchSearchResults = createAsyncThunk('search/fetch_results', (url) =>
  fetchingResults(url),
);

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    changeSearchContent: (state, action) => {
      return { ...state, searchContent: action.payload };
    },
    removeSearchContent: (state) => {
      return { ...state, searchContent: '' };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchSearchResults.fulfilled, (state, action) => {
      state.results = action.payload;
      state.loading = false;
      state.error = '';
    });
    builder.addCase(fetchSearchResults.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchSearchResults.rejected, (state, action) => {
      state.results = [];
      state.loading = false;
      state.error = action.payload;
    });
  },
});

export { fetchSearchResults };

export const { actions: searchActions, reducer: searchReducer } = searchSlice;
