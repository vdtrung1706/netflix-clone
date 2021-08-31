const { createAsyncThunk, createSlice } = require('@reduxjs/toolkit');
const { fetchingResults } = require('../../utils');

const initialState = {
  loading: false,
  error: '',
  inputValue: '',
  results: [],
};

export const fetchSearchResults = createAsyncThunk(
  'search/fetch_results',
  url => fetchingResults(url)
);

export const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    changeInputValue: (state, action) => {
      return { ...state, inputValue: action.payload };
    },
    removeInputValue: state => {
      return { ...state, inputValue: '' };
    },
  },
  extraReducers: builder => {
    builder.addCase(fetchSearchResults.fulfilled, (state, action) => {
      const results = [...action.payload].filter(
        item => item.backdrop_path || item.poster_path
      );

      state.results = results;
      state.loading = false;
      state.error = '';
    });
    builder.addCase(fetchSearchResults.pending, state => {
      state.loading = true;
    });
    builder.addCase(fetchSearchResults.rejected, (state, action) => {
      state.results = [];
      state.loading = false;
      state.error = action.payload;
    });
  },
});
