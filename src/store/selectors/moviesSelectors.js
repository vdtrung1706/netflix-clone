import { moviesRequests } from '@services/requests.service';

export const moviesSelectors = Object.keys(moviesRequests).map(
  (genre) => (state) => state.movies[genre],
);
