import { createSelector } from '@reduxjs/toolkit';

export const selectBillboard = state => state.movies.billboard;
export const selectTrending = state => state.movies.trending;
export const selectAction = state => state.movies.action;
export const selectAnime = state => state.movies.anime;
export const selectRomance = state => state.movies.romance;
export const selectNetflixOriginal = state => state.movies.netflixOriginal;
export const selectHorror = state => state.movies.horror;
export const selectAdventure = state => state.movies.adventure;
export const selectTopRated = state => state.movies.topRated;
export const selectComedy = state => state.movies.comedy;

export const trendingMoviesSelector = createSelector(
  [selectTrending],
  trending => trending.data
);
