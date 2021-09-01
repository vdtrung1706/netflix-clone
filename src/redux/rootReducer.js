import { combineReducers } from 'redux';
import { billboardSlice } from './devtools/billboardSlice';
import { latestSlice } from './devtools/latestSlice';
import { moviesSlice } from './devtools/moviesSlice';
import { searchSlice } from './devtools/searchSlice';
import { tvshowsSlice } from './devtools/tvshowsSlice';
import { userSlice } from './devtools/userSlice';

const rootReducer = combineReducers({
  user: userSlice.reducer,
  billboard: billboardSlice.reducer,
  movies: moviesSlice.reducer,
  tvshows: tvshowsSlice.reducer,
  latest: latestSlice.reducer,
  search: searchSlice.reducer,
});

export default rootReducer;
