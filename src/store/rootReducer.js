import { combineReducers } from 'redux';
import { authReducer } from './auth/slice.auth';
import { billboardReducer } from './billboard/billboard.slice';
import { homepageReducer } from './homepage/slice.homepage';
import { latestReducer } from './latest/slice.latest';
import { moviesReducer } from './movies/slice.movies';
import { playerReducer } from './player/slice.player';
import { tvshowsReducer } from './tvshows/slice.tvshows';
import { userListsReducer } from './user-lists/slice.user-lists';

const rootReducer = combineReducers({
  auth: authReducer,
  billboard: billboardReducer,
  homepage: homepageReducer,
  movies: moviesReducer,
  tvshows: tvshowsReducer,
  latest: latestReducer,
  player: playerReducer,
  userLists: userListsReducer,
});

export default rootReducer;
