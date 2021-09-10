const { createSlice } = require('@reduxjs/toolkit');

const initialState = {
  muted: false,
  language: 'eu',
};

export const playerSlice = createSlice({
  name: 'player',
  initialState,
  reducers: {
    toggleMuted: (state) => ({ ...state, muted: !state.muted }),
  },
});
