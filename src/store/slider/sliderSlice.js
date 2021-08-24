import { createSlice } from '@reduxjs/toolkit';
import { initialState, reducers } from './reducers';

export const sliderSlice = createSlice({
  name: 'slider',
  initialState,
  reducers,
});
