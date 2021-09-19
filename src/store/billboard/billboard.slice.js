import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { axios } from '@services/axios.service';
import { getMovieInfoUrl, getTVShowInfoUrl } from '@services/requests.service';
import { randomIndex } from '@utils/array.utils';

const fetchBillboardMovie = createAsyncThunk(
  'billboard/fetch_billboardMovie',
  async (url) => {
    var res = await axios.get(url);
    var results = await res.data.results;
    var movie = results[randomIndex(results.length)];
    res = await axios.get(getMovieInfoUrl(movie.id));
    return res.data;
  },
);

const fetchBillboardTVShow = createAsyncThunk(
  'billboard/fetch_billboardTVShow',
  async (url) => {
    var res = await axios.get(url);
    var results = await res.data.results;
    var movie = results[randomIndex(results.length)];
    res = await axios.get(getTVShowInfoUrl(movie.id));
    return res.data;
  },
);

const fetchBillboardLatest = createAsyncThunk(
  'billboard/fetch_billboardLatest',
  async (url) => {
    var res = await axios.get(url);
    var results = await res.data.results;
    var movie = results[randomIndex(results.length)];
    res = await axios.get(getMovieInfoUrl(movie.id));
    return res.data;
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
  latest: {
    loading: false,
    error: '',
    data: null,
  },
};

const billboardSlice = createSlice({
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
    builder.addCase(fetchBillboardLatest.fulfilled, (state, action) => {
      state.latest.data = action.payload;
      state.latest.loading = false;
    });
    builder.addCase(fetchBillboardLatest.pending, (state) => {
      state.latest.loading = true;
    });
    builder.addCase(fetchBillboardLatest.rejected, (state) => {
      state.latest.error = 'Error fetching billboard latest';
    });
  },
});

export { fetchBillboardMovie, fetchBillboardTVShow, fetchBillboardLatest };
export const { actions: billboardActions, reducer: billboardReducer } =
  billboardSlice;
