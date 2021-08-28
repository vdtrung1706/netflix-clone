import { combineReducers } from 'redux';
import { moviesReducer } from './devtools/moviesSlice';
import { userReducer } from './devtools/userSlice';

const rootReducer = combineReducers({
  user: userReducer,
  movies: moviesReducer,
});

export default rootReducer;
