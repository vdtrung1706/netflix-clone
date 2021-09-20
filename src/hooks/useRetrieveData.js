import {
  latestRequests,
  moviesRequests,
  tvshowsRequests,
  homepageRequests,
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
import {
  homepageActions,
  homepageFetchThunks,
} from '@store/homepage/slice.homepage';
import { homepageSelectors } from '@store/homepage/selectors.homepage';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

function dataTemplate(id, thunk, selector, url, title, genre, large = false) {
  let type = url.includes('movie') ? 'MOVIE_PAGE' : 'TV_PAGE';
  return { id, thunk, url, title, genre, selector, large, type };
}

const homepage = Object.keys(homepageRequests).map((key, index) => {
  const large = key === 'netflixOriginal' ? true : false;

  return dataTemplate(
    index,
    homepageFetchThunks[key],
    homepageSelectors[index],
    homepageRequests[key].url,
    homepageRequests[key].title,
    homepageRequests[key].genre,
    large,
  );
});

const movies = Object.keys(moviesRequests).map((key, index) => {
  const large = key === 'netflixOriginal' ? true : false;

  return dataTemplate(
    index,
    moviesFetchThunks[key],
    moviesSelectors[index],
    moviesRequests[key].url,
    moviesRequests[key].title,
    moviesRequests[key].genre,
    large,
  );
});

const tvShows = Object.keys(tvshowsRequests).map((key, index) => {
  const large = key === 'netflixOriginal' ? true : false;

  return dataTemplate(
    index,
    tvshowsFetchThunks[key],
    tvshowsSelectors[index],
    tvshowsRequests[key].url,
    tvshowsRequests[key].title,
    tvshowsRequests[key].genre,
    large,
  );
});

const latest = Object.keys(latestRequests).map((key, index) => {
  return dataTemplate(
    index,
    latestFetchThunks[key],
    latestSelectors[index],
    latestRequests[key].url,
    latestRequests[key].title,
    latestRequests[key].genre,
  );
});

const fetchData = {
  homepage,
  movies,
  tvShows,
  latest,
};

const useRetrieveData = (type) => {
  const [slidersProps, setSlidersProps] = useState();

  const dispatch = useDispatch();

  useEffect(() => {
    if (type === 'HOMEPAGE') {
      dispatch(homepageActions.onFetches());
      const sliders = fetchData.homepage.map((props) => {
        dispatch(props.thunk(props.url));
        return { ...props };
      });
      setSlidersProps(sliders);
    }

    if (type === 'MOVIES') {
      dispatch(moviesActions.onFetches());
      const sliders = fetchData.movies.map((props) => {
        dispatch(props.thunk(props.url));
        return { ...props };
      });
      setSlidersProps(sliders);
    }

    if (type === 'TVSHOWS') {
      dispatch(tvshowsActions.onFetches());
      const sliders = fetchData.tvShows.map((props) => {
        dispatch(props.thunk(props.url));
        return { ...props };
      });
      setSlidersProps(sliders);
    }

    if (type === 'LATEST') {
      dispatch(latestActions.onFetches());
      const sliders = fetchData.latest.map((props) => {
        dispatch(props.thunk(props.url));
        return { ...props };
      });
      setSlidersProps(sliders);
    }
  }, [dispatch, type]);

  return slidersProps;
};

export default useRetrieveData;
