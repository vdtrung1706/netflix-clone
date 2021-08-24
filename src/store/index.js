import { combineReducers } from 'redux';
import { sliderSlice } from './slider/sliderSlice';
import userReducer from './user/reducer';
import { configureStore } from '@reduxjs/toolkit';
const reducer = combineReducers({
  user: userReducer,
  slider: sliderSlice.reducer,
});

const enhanced =
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();

const store = configureStore({
  reducer,
  enhanced,
});

export default store;
