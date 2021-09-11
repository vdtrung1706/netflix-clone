import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  myList: [],
  dislikedList: [],
  likedList: [],
  error: '',
};

const userListsSlice = createSlice({
  name: 'user-lists',
  initialState,
  reducers: {
    setMyList(state, action) {
      return { ...state, myList: [...action.payload] };
    },
    setDislikedList(state, action) {
      return { ...state, dislikedList: [...action.payload] };
    },
    setLikedList(state, action) {
      return { ...state, likedList: [...action.payload] };
    },
    toggleMyList() {},
    toggleLiked() {},
    toggleDisliked() {},
    actionFailure: (state, action) => {
      return { ...state, error: action.payload };
    },
  },
});

export const { actions: userListsActions, reducer: userListsReducer } =
  userListsSlice;
