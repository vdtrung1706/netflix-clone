import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { axios } from '@services/axios.service';
import { randomIndex } from '@utils/array.utils';

export const fetchBillboardMovie = createAsyncThunk(
  'billboard/fetch_billboardMovie',
  async (url) => {
    const res = await axios.get(url);
    const results = await res.data.results;
    return results[randomIndex(results.length)];
  },
);

export const fetchBillboardTVShow = createAsyncThunk(
  'billboard/fetch_billboardTVShow',
  async (url) => {
    const res = await axios.get(url);
    const results = await res.data.results;
    return results[randomIndex(results.length)];
  },
);

const initialState = {
  movie: {
    loading: false,
    error: '',
    data: null,
  },
  tvshow: {
    loading: false,
    error: '',
    data: null,
  },
};

export const billboardSlice = createSlice({
  name: 'billboard',
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchBillboardMovie.fulfilled, (state, action) => {
      state.movie.data = action.payload;
      state.movie.loading = false;
    });
    builder.addCase(fetchBillboardMovie.pending, (state) => {
      state.movie.loading = true;
    });
    builder.addCase(fetchBillboardMovie.rejected, (state) => {
      state.movie.error = 'Error fetching billboard movie';
    });

    builder.addCase(fetchBillboardTVShow.fulfilled, (state, action) => {
      state.tvshow.data = action.payload;
      state.tvshow.loading = false;
    });
    builder.addCase(fetchBillboardTVShow.pending, (state) => {
      state.tvshow.loading = true;
    });
    builder.addCase(fetchBillboardTVShow.rejected, (state) => {
      state.tvshow.error = 'Error fetching billboard tvshow';
    });
  },
});
