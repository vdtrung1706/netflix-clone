import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  loading: false,
  error: null,
  currentUser: null,
};

const handleStart = state => ({ ...state, loading: true });

const handleFailure = (state, action) => ({
  ...state,
  error: action.payload,
  loading: false,
});

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
    signInGoogleStart: handleStart,
    signInEmailStart: handleStart,
    signInSuccess: handleSuccess,
    signInFailure: handleFailure,

    signUpStart: handleStart,
    signUpSuccess: state => ({ ...state }),
    signUpFailure: handleFailure,

    signOutStart: handleStart,
    signOutSuccess: state => {
      return { ...state, currentUser: null, error: null, loading: false };
    },
    signOutFailure: handleFailure,

    checkUserSession: () => {},
  },
});

export default userSlice;

export const userActions = userSlice.actions;
export const userReducer = userSlice.reducer;
