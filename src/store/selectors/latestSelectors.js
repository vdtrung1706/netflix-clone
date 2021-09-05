import { latestRequests } from '@services/requests.service';

export const latestSelectors = Object.keys(latestRequests).map(
  (genre) => (state) => state.latest[genre],
);
