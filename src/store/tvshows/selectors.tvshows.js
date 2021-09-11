import { tvshowsRequests } from '@services/requests.service';

export const tvshowsSelectors = Object.keys(tvshowsRequests).map(
  (genre) => (state) => state.tvshows[genre],
);
