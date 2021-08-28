import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  loading: false,
  error: null,
  currentUser: null,
};

const handleStart = state => ({ ...state, loading: true });

const handleFailure = (state, action) => ({ ...state, error: action.payload });

const handleSuccess = (state, action) => ({
  ...state,
  loading: false,
  error: null,
  currentUser: action.payload,
});

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    signInWithGoogleStart: handleStart,
    signInWithEmailStart: handleStart,
    signUpStart: handleStart,

    signInSuccess: handleSuccess,
    signUpSuccess: handleSuccess,
    signOutSuccess: state => {
      return { ...state, currentUser: null, error: null, loading: false };
    },

    signInFailure: (state, action) => handleFailure(state, action),
    signOutFailure: (state, action) => handleFailure(state, action),
    signUpFailure: (state, action) => handleFailure(state, action),
  },
});

export default userSlice;

export const userActions = userSlice.actions;
export const userReducer = userSlice.reducer;
