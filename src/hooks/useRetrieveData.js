import {
  latestRequests,
  moviesRequests,
  tvshowsRequests,
} from '@services/requests.service';
import { latestSelectors } from '@store/latest/selectors.latest';
import { latestActions, latestFetchThunks } from '@store/latest/slice.latest';
import { moviesSelectors } from '@store/movies/selectors.movies';
import { moviesActions, moviesFetchThunks } from '@store/movies/slice.movies';
import { tvshowsSelectors } from '@store/tvshows/selectors.tvshows';
import {
  tvshowsActions,
  tvshowsFetchThunks,
} from '@store/tvshows/slice.tvshows';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

function dataTemplate(id, thunk, selector, url, title, genre, large = false) {
  let type = url.includes('movie') ? 'MOVIES' : 'TVSHOWS';
  return { id, thunk, url, title, genre, selector, large, type };
}

const movies = Object.keys(moviesRequests).map((genre, index) => {
  let large = false;
  if (genre == 'netflixOrignal') {
    large = true;
  }

  return dataTemplate(
    index * 2,
    moviesFetchThunks[genre],
    moviesSelectors[index],
    moviesRequests[genre].url,
    moviesRequests[genre].title,
    genre,
    large,
  );
});

const tvShows = Object.keys(tvshowsRequests).map((genre, index) => {
  let large = genre === 'netflixOriginal' ? true : false;

  return dataTemplate(
    index,
    tvshowsFetchThunks[genre],
    tvshowsSelectors[index],
    tvshowsRequests[genre].url,
    tvshowsRequests[genre].title,
    genre,
    large,
  );
});

const latest = Object.keys(latestRequests).map((genre, index) => {
  return dataTemplate(
    index,
    latestFetchThunks[genre],
    latestSelectors[index],
    latestRequests[genre].url,
    latestRequests[genre].title,
    genre,
  );
});

const fetchData = {
  movies,
  tvShows,
  latest,
};

const useRetrieveData = (type) => {
  const [sliders, setSliders] = useState();

  const dispatch = useDispatch();

  useEffect(() => {
    if (type === 'MOVIES') {
      dispatch(moviesActions.onFetches());
      const sliders = fetchData.movies.map((props) => {
        dispatch(props.thunk(props.url));
        return { ...props };
      });
      setSliders(sliders);
    }

    if (type === 'TVSHOWS') {
      dispatch(tvshowsActions.onFetches());
      const sliders = fetchData.tvShows.map((props) => {
        dispatch(props.thunk(props.url));
        return { ...props };
      });
      setSliders(sliders);
    }

    if (type === 'LATEST') {
      dispatch(latestActions.onFetches());
      const sliders = fetchData.latest.map((props) => {
        dispatch(props.thunk(props.url));
        return { ...props };
      });
      setSliders(sliders);
    }
  }, [dispatch, type]);

  return sliders;
};

export default useRetrieveData;
