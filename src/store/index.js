import { combineReducers } from 'redux';
import userReducer from './user/reducer';
import { configureStore } from '@reduxjs/toolkit';
import { moviesSlice } from './movies/slice';

const reducer = combineReducers({
  user: userReducer,
  movies: moviesSlice.reducer,
});

const enhanced =
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();

const store = configureStore({
  reducer,
  enhanced,
});

export default store;
