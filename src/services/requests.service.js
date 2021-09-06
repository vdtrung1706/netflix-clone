import { monthAgoDate } from '@utils/convertor.utils';
import { API_KEY } from './axios.service';

export const SEARCH_ENDPOINT = `/search/multi?api_key=${API_KEY}&language=en-US&query=`;

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

export const tvshowsRequests = {
  trendingSeries: {
    title: 'Trending Now',
    url: `/trending/tv/week?api_key=${API_KEY}&language=en-US`,
  },
  netflixOriginal: {
    title: 'Only on Netflix',
    url: `/discover/tv?api_key=${API_KEY}&with_networks=213&language=en-US`,
  },
  actionAdventureSeries: {
    title: 'Action and Adventure',
    url: `/discover/tv?api_key=${API_KEY}&with_genres=10759&language=en-US`,
  },
  sciFiFantasySeries: {
    title: 'SciFiFantasy',
    url: `/discover/tv?api_key=${API_KEY}&with_genres=10765&language=en-US`,
  },
  animationSeries: {
    title: 'Animation',
    url: `/discover/tv?api_key=${API_KEY}&with_genres=16&language=en-US`,
  },
  discoverSeries: {
    title: 'Discover',
    url: `/discover/tv?api_key=${API_KEY}&language=en-US`,
  },
  comedySeries: {
    title: 'Comedy',
    url: `/discover/tv?api_key=${API_KEY}&with_genres=35&language=en-US`,
  },
  crimeSeries: {
    title: 'Crime Series',
    url: `/discover/tv?api_key=${API_KEY}&with_genres=80&language=en-US`,
  },
  documentarySeries: {
    title: 'Documentary Series',
    url: `/discover/tv?api_key=${API_KEY}&with_genres=99&language=en-US`,
  },
  familySeries: {
    title: 'Binge-watch with Family',
    url: `/discover/tv?api_key=${API_KEY}&with_genres=10751&language=en-US`,
  },
  kidsSeries: {
    title: 'Kids',
    url: `/discover/tv?api_key=${API_KEY}&with_genres=10762&language=en-US`,
  },
};

export const latestRequests = {
  newRelease: {
    title: 'New Release',
    url: `/discover/movie?api_key=${API_KEY}&primary_release_date.gte=${monthAgoDate()}&language=en-US`,
  },
  upComing: {
    title: 'Up Comming on Netflix',
    url: `/discover/movie?api_key=${API_KEY}&primary_release_date.gte=${monthAgoDate()}&language=en-US`,
  },
};