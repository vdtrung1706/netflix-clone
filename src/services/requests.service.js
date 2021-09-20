import { monthAgoDate } from '@utils/convertor.utils';
import { API_KEY } from './axios.service';

export const SEARCH_ENDPOINT = `/search/multi?api_key=${API_KEY}&query=`;

export const homepageRequests = {
  trendingToday: {
    title: 'Trending Shows Today',
    url: `/tv/on_the_air?api_key=${API_KEY}`,
    genre: 'on-the-air',
  },
  popular: {
    title: 'Popular on Netflix',
    url: `/movie/popular?api_key=${API_KEY}`,
    genre: 'popular',
  },
  topRated: {
    title: 'Top Rated',
    url: `/tv/top_rated?api_key=${API_KEY}`,
    genre: 'top-rated',
  },
  netflixOriginal: {
    title: 'Only on Netflix',
    url: `/discover/tv?api_key=${API_KEY}&with_networks=213`,
    genre: 'netflix-original',
  },
  comedyMovies: {
    title: 'Comedy movies',
    url: `/discover/movie?api_key=${API_KEY}&with_genres=35`,
    genre: 35,
  },
  animationSeries: {
    title: 'Animation',
    url: `/discover/tv?api_key=${API_KEY}&with_genres=16`,
    genre: 16,
  },
  actionMovies: {
    title: 'Action & SciFi',
    url: `/discover/movie?api_key=${API_KEY}&with_genres=28`,
    genre: 28,
  },
  familySeries: {
    title: 'Binge-watch with Family',
    url: `/discover/tv?api_key=${API_KEY}&with_genres=10751`,
    genre: 10751,
  },
};

export const moviesRequests = {
  trending: {
    title: 'Trending',
    url: `/trending/movie/week?api_key=${API_KEY}`,
    genre: 'trending_now',
  },
  topRated: {
    title: 'Popular on Netflix',
    url: `/movie/top_rated?api_key=${API_KEY}`,
    genre: 'top_rated',
  },
  netflixOriginal: {
    title: 'Only on Netflix',
    url: `/discover/movie?api_key=${API_KEY}&with_networks=213`,
    genre: 'netflix-original',
  },
  adventureMovies: {
    title: 'Adventure',
    url: `/discover/movie?api_key=${API_KEY}&with_genres=12`,
    genre: 12,
  },
  comedyMovies: {
    title: 'Comedy movies',
    url: `/discover/movie?api_key=${API_KEY}&with_genres=35`,
    genre: 35,
  },
  warMovies: {
    title: 'War movies',
    url: `/discover/movie?api_key=${API_KEY}&with_genres=10752`,
    genre: 10752,
  },
  actionMovies: {
    title: 'Action',
    url: `/discover/movie?api_key=${API_KEY}&with_genres=28`,
    genre: 28,
  },
  animeMovies: {
    title: 'Animation & Japanese anime',
    url: `/discover/movie?api_key=${API_KEY}&with_genres=16`,
    genre: 16,
  },
  horrorMovies: {
    title: 'Horror movies',
    url: `/discover/movie?api_key=${API_KEY}&with_genres=27`,
    genre: 27,
  },
  romanceMovies: {
    title: 'Romance',
    url: `/discover/movie?api_key=${API_KEY}&with_genres=10749`,
    genre: 10749,
  },
};

export const tvshowsRequests = {
  trendingSeries: {
    title: 'Trending Now',
    url: `/trending/tv/week?api_key=${API_KEY}`,
    genre: 'trending_now',
  },
  netflixOriginal: {
    title: 'Only on Netflix',
    url: `/discover/tv?api_key=${API_KEY}&with_networks=213`,
    genre: 'netflix-original',
  },
  actionAdventureSeries: {
    title: 'Action and Adventure',
    url: `/discover/tv?api_key=${API_KEY}&with_genres=10759`,
    genre: 10759,
  },
  sciFiFantasySeries: {
    title: 'SciFiFantasy',
    url: `/discover/tv?api_key=${API_KEY}&with_genres=10765`,
    genre: 10765,
  },
  animationSeries: {
    title: 'Animation',
    url: `/discover/tv?api_key=${API_KEY}&with_genres=16`,
    genre: 16,
  },
  discoverSeries: {
    title: 'Discover',
    url: `/discover/tv?api_key=${API_KEY}`,
  },
  comedySeries: {
    title: 'Comedy',
    url: `/discover/tv?api_key=${API_KEY}&with_genres=35`,
    genre: 35,
  },
  crimeSeries: {
    title: 'Crime Series',
    url: `/discover/tv?api_key=${API_KEY}&with_genres=80`,
    genre: 80,
  },
  documentarySeries: {
    title: 'Documentary Series',
    url: `/discover/tv?api_key=${API_KEY}&with_genres=99`,
    genre: 99,
  },
  familySeries: {
    title: 'Binge-watch with Family',
    url: `/discover/tv?api_key=${API_KEY}&with_genres=10751`,
    genre: 10751,
  },
  kidsSeries: {
    title: 'Kids',
    url: `/discover/tv?api_key=${API_KEY}&with_genres=10762`,
    genre: 10762,
  },
};

export const latestRequests = {
  newRelease: {
    title: 'New Release',
    url: `/discover/movie?api_key=${API_KEY}&primary_release_date.gte=${monthAgoDate()}`,
  },
  latestShows: {
    title: 'New Shows on Netflix',
    url: `tv/on_the_air?api_key=${API_KEY}`,
  },
  upComing: {
    title: 'Up Comming on Netflix',
    url: `/movie/upcoming?api_key=${API_KEY}`,
  },
};

export const getMovieInfoUrl = (id) => {
  return `/movie/${id}?api_key=${API_KEY}&append_to_response=images,credits,similar`;
};

export const getTVShowInfoUrl = (id) => {
  return `/tv/${id}?api_key=${API_KEY}&append_to_response=images,credits,similar`;
};
