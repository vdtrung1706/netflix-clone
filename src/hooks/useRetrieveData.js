import {
  latestRequests,
  moviesRequests,
  tvshowsRequests,
} from '@services/requests.service';
import { latestFetchThunks, latestSlice } from '@store/devtools/latestSlice';
import { moviesFetchThunks, moviesSlice } from '@store/devtools/moviesSlice';
import { tvshowsFetchThunks, tvshowsSlice } from '@store/devtools/tvshowsSlice';
import { latestSelectors } from '@store/selectors/latestSelectors';
import { moviesSelectors } from '@store/selectors/moviesSelectors';
import { tvshowsSelectors } from '@store/selectors/tvshowsSelectors';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

function dataTemplate(id, thunk, selector, url, title, genre) {
  return { id, thunk, url, title, genre, selector };
}

const movies = Object.keys(moviesRequests).map((genre, index) => {
  return dataTemplate(
    index,
    moviesFetchThunks[genre],
    moviesSelectors[index],
    moviesRequests[genre].url,
    moviesRequests[genre].title,
    genre,
  );
});

const tvShows = Object.keys(tvshowsRequests).map((genre, index) => {
  return dataTemplate(
    index,
    tvshowsFetchThunks[genre],
    tvshowsSelectors[index],
    tvshowsRequests[genre].url,
    tvshowsRequests[genre].title,
    genre,
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
  const [slidersInfo, setSlidersInfo] = useState();

  const dispatch = useDispatch();

  useEffect(() => {
    if (type === 'MOVIES') {
      dispatch(moviesSlice.actions.onFetches());
      const sliders = fetchData.movies.map((genre) => {
        dispatch(genre.thunk(genre.url));
        return { ...genre };
      });
      setSlidersInfo(sliders);
    }

    if (type === 'TVSHOWS') {
      dispatch(tvshowsSlice.actions.onFetches());
      const sliders = fetchData.tvShows.map((genre) => {
        dispatch(genre.thunk(genre.url));
        return { ...genre };
      });
      setSlidersInfo(sliders);
    }

    if (type === 'LATEST') {
      dispatch(latestSlice.actions.onFetches());
      const sliders = fetchData.latest.map((genre) => {
        dispatch(genre.thunk(genre.url));
        return { ...genre };
      });
      setSlidersInfo(sliders);
    }
  }, [dispatch, type]);

  return slidersInfo;
};

export default useRetrieveData;
