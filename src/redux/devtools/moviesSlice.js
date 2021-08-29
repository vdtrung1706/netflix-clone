import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../services/axios';
import { randomIndex } from '../../utils';

const stateModal = {
  loading: false,
  error: '',
  data: [],
};

const initialState = {
  billboard: { loading: false, error: '', movie: {} },
  trending: { ...stateModal },
  topRated: { ...stateModal },
  netflixOriginal: { ...stateModal },
  action: { ...stateModal },
  adventure: { ...stateModal },
  comedy: { ...stateModal },
  anime: { ...stateModal },
  horror: { ...stateModal },
  romance: { ...stateModal },
};

export const fetchBillboardFromAPI = createAsyncThunk(
  'movies/fetchBillboard',
  async url => {
    const res = await axios.get(url);
    const results = await res.data.results;
    return results[randomIndex(results.length)];
  }
);

export const fetchTrendingFromAPI = createAsyncThunk(
  'movies/fetchTrending',
  async url => {
    const res = await axios.get(url);
    const data = await res.data;
    return data.results;
  }
);

export const fetchTopRatedFromAPI = createAsyncThunk(
  'movies/fetchTopRated',
  async url => {
    const res = await axios.get(url);
    const data = await res.data;
    return data.results;
  }
);

export const fetchNetflixOriginalFromAPI = createAsyncThunk(
  'movies/fetchNetflixOriginal',
  async url => {
    const res = await axios.get(url);
    const data = await res.data;
    return data.results;
  }
);

export const fetchAdventureFromAPI = createAsyncThunk(
  'movies/fetchAdventure',
  async url => {
    const res = await axios.get(url);
    const data = await res.data;
    return data.results;
  }
);

export const fetchActionFromAPI = createAsyncThunk(
  'movies/fetchAction',
  async url => {
    const res = await axios.get(url);
    const data = await res.data;
    return data.results;
  }
);

export const fetchComedyFromAPI = createAsyncThunk(
  'movies/fetchComedy',
  async url => {
    const res = await axios.get(url);
    const data = await res.data;
    return data.results;
  }
);

export const fetchAnimeFromAPI = createAsyncThunk(
  'movies/fetchAnime',
  async url => {
    const res = await axios.get(url);
    const data = await res.data;
    return data.results;
  }
);

export const fetchRomanceFromAPI = createAsyncThunk(
  'movies/fetchRomance',
  async url => {
    const res = await axios.get(url);
    const data = await res.data;
    return data.results;
  }
);

export const fetchHorrorFromAPI = createAsyncThunk(
  'movies/fetchHorror',
  async url => {
    const res = await axios.get(url);
    const data = await res.data;
    return data.results;
  }
);

const moviesSlice = createSlice({
  name: 'movies',
  initialState,
  reducers: {
    hello: () => {
      console.log('hello');
    },
  },
  extraReducers: builder => {
    builder.addCase(fetchBillboardFromAPI.fulfilled, (state, action) => {
      state.billboard.movie = action.payload;
      state.billboard.loading = false;
    });
    builder.addCase(fetchBillboardFromAPI.pending, state => {
      state.billboard.loading = true;
    });
    builder.addCase(fetchBillboardFromAPI.rejected, state => {
      state.billboard.error = 'Error fetching billboard movie';
    });

    builder.addCase(fetchTrendingFromAPI.fulfilled, (state, action) => {
      state.trending.data = action.payload;
      state.trending.loading = false;
    });
    builder.addCase(fetchTrendingFromAPI.pending, state => {
      state.trending.loading = true;
    });
    builder.addCase(fetchTrendingFromAPI.rejected, state => {
      state.trending.error = 'Error fetching trending movies';
    });

    builder.addCase(fetchActionFromAPI.fulfilled, (state, action) => {
      state.action.data = action.payload;
      state.action.loading = false;
    });
    builder.addCase(fetchActionFromAPI.pending, state => {
      state.action.loading = true;
    });
    builder.addCase(fetchActionFromAPI.rejected, state => {
      state.action.error = 'Error fetching action movies';
    });

    builder.addCase(fetchAdventureFromAPI.fulfilled, (state, action) => {
      state.adventure.data = action.payload;
      state.adventure.loading = false;
    });
    builder.addCase(fetchAdventureFromAPI.pending, state => {
      state.adventure.loading = true;
    });
    builder.addCase(fetchAdventureFromAPI.rejected, state => {
      state.adventure.error = 'Error fetching adventure movies';
    });

    builder.addCase(fetchAnimeFromAPI.fulfilled, (state, action) => {
      state.anime.data = action.payload;
      state.anime.loading = false;
    });
    builder.addCase(fetchAnimeFromAPI.pending, state => {
      state.anime.loading = true;
    });
    builder.addCase(fetchAnimeFromAPI.rejected, state => {
      state.anime.error = 'Error fetching anime movies';
    });

    builder.addCase(fetchComedyFromAPI.fulfilled, (state, action) => {
      state.comedy.data = action.payload;
      state.comedy.loading = false;
    });
    builder.addCase(fetchComedyFromAPI.pending, state => {
      state.comedy.loading = true;
    });
    builder.addCase(fetchComedyFromAPI.rejected, state => {
      state.comedy.error = 'Error fetching comedy movies';
    });

    builder.addCase(fetchHorrorFromAPI.fulfilled, (state, action) => {
      state.horror.data = action.payload;
      state.horror.loading = false;
    });
    builder.addCase(fetchHorrorFromAPI.pending, state => {
      state.horror.loading = true;
    });
    builder.addCase(fetchHorrorFromAPI.rejected, state => {
      state.horror.error = 'Error fetching horror movies';
    });

    builder.addCase(fetchNetflixOriginalFromAPI.fulfilled, (state, action) => {
      state.netflixOriginal.data = action.payload;
      state.netflixOriginal.loading = false;
    });
    builder.addCase(fetchNetflixOriginalFromAPI.pending, state => {
      state.netflixOriginal.loading = true;
    });
    builder.addCase(fetchNetflixOriginalFromAPI.rejected, state => {
      state.netflixOriginal.error = 'Error fetching netflix original movies';
    });

    builder.addCase(fetchTopRatedFromAPI.fulfilled, (state, action) => {
      state.topRated.data = action.payload;
      state.topRated.loading = false;
    });
    builder.addCase(fetchTopRatedFromAPI.pending, state => {
      state.topRated.loading = true;
    });
    builder.addCase(fetchTopRatedFromAPI.rejected, state => {
      state.topRated.error = 'Error fetching topRated movies';
    });

    builder.addCase(fetchRomanceFromAPI.fulfilled, (state, action) => {
      state.romance.data = action.payload;
      state.romance.loading = false;
    });
    builder.addCase(fetchRomanceFromAPI.pending, state => {
      state.romance.loading = true;
    });
    builder.addCase(fetchRomanceFromAPI.rejected, state => {
      state.romance.error = 'Error fetching romance movies';
    });
  },
});

export default moviesSlice;

export const moviesActions = moviesSlice.actions;
export const moviesReducer = moviesSlice.reducer;
