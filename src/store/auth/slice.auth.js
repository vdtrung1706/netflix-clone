import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  loading: false,
  error: null,
  currentUser: null,
};

const handleStart = (state) => ({ ...state, loading: true });

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

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    signInGoogleStart: handleStart,
    signInEmailStart: handleStart,
    signUpStart: handleStart,
    signOutStart: handleStart,
    signInSuccess: handleSuccess,
    signUpSuccess() {},
    signOutSuccess(state) {
      return { ...state, currentUser: null, error: null, loading: false };
    },
    signInFailure: handleFailure,
    signUpFailure: handleFailure,
    signOutFailure: handleFailure,
    checkUserSession(state) {
      return { ...state, loading: true };
    },
  },
});

export const { actions: authActions, reducer: authReducer } = authSlice;
