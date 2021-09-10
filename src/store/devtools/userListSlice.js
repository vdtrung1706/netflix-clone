import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  myList: [],
  dislikedList: [],
  likedList: [],
  error: '',
};

export const userListsSlice = createSlice({
  name: 'user-list',
  initialState,
  reducers: {
    setMyList: (state, action) => {
      return { ...state, myList: [...action.payload] };
    },
    setDisliked: (state, action) => {
      return { ...state, dislikedList: [...action.payload] };
    },
    setLiked: (state, action) => {
      return { ...state, likedList: [...action.payload] };
    },

    addToMyList: () => {},
    addToLiked: () => {},
    addToDisliked: () => {},
    removeFromMyList: () => {},
    removeFromLiked: () => {},
    removeFromDisliked: () => {},
    actionFailure: (state, action) => {
      return { ...state, error: action.payload };
    },
  },
});
