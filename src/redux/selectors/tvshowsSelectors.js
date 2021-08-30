import { tvshowsRequests } from '../../services/requests';

export const tvshowsSelectors = Object.keys(tvshowsRequests).map(
  genre => state => state.tvshows[genre]
);
