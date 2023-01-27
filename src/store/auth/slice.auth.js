import { createSlice } from '@reduxjs/toolkit';
import { LOCAL_STORAGE_KEY } from '../../constants/local-storage-constant';

const initialState = {
  loading: false,
  error: null,
  currentUser: JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY.CURRENT_USER)),
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
