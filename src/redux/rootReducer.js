import { combineReducers } from 'redux';
import { billboardSlice } from './devtools/billboardSlice';
import { latestReducer } from './devtools/latestSlice';
import { moviesReducer } from './devtools/moviesSlice';
import { tvshowsReducer } from './devtools/tvshowsSlice';
import { userReducer } from './devtools/userSlice';

const rootReducer = combineReducers({
  user: userReducer,
  billboard: billboardSlice.reducer,
  movies: moviesReducer,
  tvshows: tvshowsReducer,
  latest: latestReducer,
});

export default rootReducer;
