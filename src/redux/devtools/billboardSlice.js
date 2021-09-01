import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { randomIndex } from '../../utils';
import axios from '../../services/axios';

export const fetchBillboardFromAPI = createAsyncThunk(
  'billboard/fetch_billboard',
  async url => {
    const res = await axios.get(url);
    const results = await res.data.results;
    return results[randomIndex(results.length)];
  }
);

const initialState = {
  loading: false,
  error: '',
  movie: {},
};

export const billboardSlice = createSlice({
  name: 'billboard',
  initialState,
  extraReducers: builder => {
    builder.addCase(fetchBillboardFromAPI.fulfilled, (state, action) => {
      state.movie = action.payload;
      state.loading = false;
    });
    builder.addCase(fetchBillboardFromAPI.pending, state => {
      state.loading = true;
    });
    builder.addCase(fetchBillboardFromAPI.rejected, state => {
      state.error = 'Error fetching billboard movie';
    });
  },
});
