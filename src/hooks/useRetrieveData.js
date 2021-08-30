import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { fetchThunks } from '../redux/devtools/moviesSlice';
import { moviesRequests } from '../services/requests';
import { movieSelectors } from '../redux/selectors/moviesSelectors';

function dataTemplate(id, thunk, selector, url, title, genre) {
  return { id, thunk, url, title, genre, selector };
}

const movies = Object.keys(moviesRequests).map((genre, index) => {
  return dataTemplate(
    index,
    fetchThunks[index],
    movieSelectors[index],
    moviesRequests[genre].url,
    moviesRequests[genre].title,
    genre
  );
});

const tvShows = [];

const fetchData = {
  movies,
  tvShows,
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
