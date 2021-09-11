import { createSlice } from '@reduxjs/toolkit';
import { includeObjectById } from '@utils/array.utils';

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

    // update ui side, 'cause waiting for firebase clound update then auto render -> too long :(
    toggleMyList(state, action) {
      const { movie } = action.payload;
      if (includeObjectById(state.myList, movie.id)) {
        state.myList = state.myList.filter((item) => item.id != movie.id);
      } else {
        state.myList = [movie, ...state.myList];
      }
    },
    toggleLiked(state, action) {
      const { movie } = action.payload;
      // remove it from disliked list before add it into liked list
      state.dislikedList = state.dislikedList.filter(
        (item) => item.id != movie.id,
      );
      if (includeObjectById(state.likedList, movie.id)) {
        state.likedList = state.likedList.filter((item) => item.id != movie.id);
      } else {
        state.likedList.push(movie);
      }
    },
    toggleDisliked(state, action) {
      const { movie } = action.payload;
      state.likedList = state.likedList.filter((item) => item.id != movie.id);
      if (includeObjectById(state.dislikedList, movie.id)) {
        state.dislikedList = state.dislikedList.filter(
          (item) => item.id != movie.id,
        );
      } else {
        state.dislikedList.push(movie);
      }
    },
    actionFailure: (state, action) => {
      return { ...state, error: action.payload };
    },
  },
});

export const { actions: userListsActions, reducer: userListsReducer } =
  userListsSlice;
