import { moviesRequests } from '../../services/requests';

export const moviesSelectors = Object.keys(moviesRequests).map(
  genre => state => state.movies[genre]
);
