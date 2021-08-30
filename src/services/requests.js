import { API_KEY } from './axios';

export const moviesRequests = {
  trending: {
    title: 'Trending',
    url: `/trending/all/week?api_key=${API_KEY}&language=en-US`,
  },
  topRated: {
    title: 'Popular on Netflix',
    url: `/movie/top_rated?api_key=${API_KEY}&language=en-US`,
  },
  netflixOrignal: {
    title: 'Only on Netflix',
    url: `/discover/tv?api_key=${API_KEY}&with_networks=213&language=en-US`,
  },
  adventureMovies: {
    title: 'Adventure',
    url: `/discover/movie?api_key=${API_KEY}&with_genres=12&language=en-US`,
  },
  comedyMovies: {
    title: 'Comedy movies',
    url: `/discover/movie?api_key=${API_KEY}&with_genres=35&language=en-US`,
  },
  warMovies: {
    title: 'War movies',
    url: `/discover/movie?api_key=${API_KEY}&with_genres=10752&language=en-US`,
  },
  actionMovies: {
    title: 'Action',
    url: `/discover/movie?api_key=${API_KEY}&with_genres=28&language=en-US`,
  },
  animeMovies: {
    title: 'Animation & Japanese anime',
    url: `/discover/movie?api_key=${API_KEY}&with_genres=16&language=en-US`,
  },
  horrorMovies: {
    title: 'Horror movies',
    url: `/discover/movie?api_key=${API_KEY}&with_genres=27&language=en-US`,
  },
  romanceMovies: {
    title: 'Romance',
    url: `/discover/movie?api_key=${API_KEY}&with_genres=10749&language=en-US`,
  },
};

export default {
  trending: `/trending/all/week?api_key=${API_KEY}&language=en-US`,
  popular: `/movie/popular?api_key=${API_KEY}&language=en-US`,
  topRated: `/movie/top_rated?api_key=${API_KEY}&language=en-US`,
  netflixOrignals: `/discover/tv?api_key=${API_KEY}&with_networks=213&language=en-US`,
  adventureMovies: `/discover/movie?api_key=${API_KEY}&with_genres=12&language=en-US`,
  comedyMovies: `/discover/movie?api_key=${API_KEY}&with_genres=35&language=en-US`,
  warMovies: `/discover/movie?api_key=${API_KEY}&with_genres=10752&language=en-US`,
  actionMovies: `/discover/movie?api_key=${API_KEY}&with_genres=28&language=en-US`,
  animeMovies: `/discover/movie?api_key=${API_KEY}&with_genres=16&language=en-US`,
  horrorMovies: `/discover/movie?api_key=${API_KEY}&with_genres=27&language=en-US`,
  romanceMovies: `/discover/movie?api_key=${API_KEY}&with_genres=10749&language=en-US`,
};
