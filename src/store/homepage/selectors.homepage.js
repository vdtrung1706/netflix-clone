import { homepageRequests } from '@services/requests.service';

export const homepageSelectors = Object.keys(homepageRequests).map(
  (genre) => (state) => state.homepage[genre],
);
