import { latestRequests } from '../../services/requests';

export const latestSelectors = Object.keys(latestRequests).map(
  genre => state => state.latest[genre]
);
