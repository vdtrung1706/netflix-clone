import requests from '../services/requests';

import {
  fetchTrendingFromAPI,
  fetchTopRatedFromAPI,
  fetchNetflixOriginalFromAPI,
  fetchHorrorFromAPI,
  fetchComedyFromAPI,
  fetchAnimeFromAPI,
  fetchAdventureFromAPI,
  fetchActionFromAPI,
  fetchRomanceFromAPI,
} from '../store/movies/slice';

import {
  selectTrending,
  selectAction,
  selectComedy,
  selectAdventure,
  selectAnime,
  selectHorror,
  selectRomance,
  selectNetflixOriginal,
  selectTopRated,
} from '../store/movies/selectors';
import { useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';

const fetchData = {
  movies: [
    {
      id: 0,
      thunk: fetchTrendingFromAPI,
      url: requests.trending,
      title: 'Trending',
      genre: 'Trending',
      selector: selectTrending,
    },
    {
      id: 1,
      thunk: fetchActionFromAPI,
      url: requests.actionMovies,
      title: 'Action',
      genre: 'Action',
      selector: selectAction,
    },
    {
      id: 2,
      thunk: fetchNetflixOriginalFromAPI,
      url: requests.netflixOrignals,
      title: 'Netflix Original',
      genre: 'netflixOriginal',
      selector: selectNetflixOriginal,
    },
    {
      id: 3,
      thunk: fetchAdventureFromAPI,
      url: requests.adventureMovies,
      title: 'Adventure',
      genre: 'Adventure',
      selector: selectAdventure,
    },
    {
      id: 4,
      thunk: fetchComedyFromAPI,
      url: requests.comedyMovies,
      title: 'Comedy',
      genre: 'Comedy',
      selector: selectComedy,
    },
    {
      id: 5,
      thunk: fetchAnimeFromAPI,
      url: requests.animeMovies,
      title: 'Anime',
      genre: 'Anime',
      selector: selectAnime,
    },
    {
      id: 6,
      thunk: fetchHorrorFromAPI,
      url: requests.horrorMovies,
      title: 'Horror',
      genre: 'Horror',
      selector: selectHorror,
    },
    {
      id: 7,
      thunk: fetchTopRatedFromAPI,
      url: requests.topRated,
      title: 'Top Rated',
      genre: 'TopRated',
      selector: selectTopRated,
    },
    {
      id: 8,
      thunk: fetchRomanceFromAPI,
      url: requests.romanceMovies,
      title: 'Romance',
      genre: 'Romance',
      selector: selectRomance,
    },
  ],
  series: [],
};

const useRetrieveData = type => {
  const dispatch = useDispatch();
  const [slidersInfo, setSlidersInfo] = useState();

  useEffect(() => {
    if (type === 'MOVIES') {
      const sliders = fetchData.movies.map(genre => {
        dispatch(genre.thunk(genre.url));
        return { ...genre };
      });

      setSlidersInfo(sliders);
    }
  }, [dispatch, type]);

  return slidersInfo;
};

export default useRetrieveData;
