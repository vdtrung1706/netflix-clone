const { createSlice } = require('@reduxjs/toolkit');

const initialState = {
  muted: false,
  language: 'eu',
};

const playerSlice = createSlice({
  name: 'player',
  initialState,
  reducers: {
    toggleMuted: (state) => ({ ...state, muted: !state.muted }),
  },
});

export const { actions: playerActions, reducer: playerReducer } = playerSlice;
