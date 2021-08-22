import { SET_CURRENT_USER } from './actions';

const inititalState = {
  currentUser: null,
};

const reducer = (state = inititalState, action) => {
  if (action.type === SET_CURRENT_USER) {
    return { ...state, currentUser: action.payload.user };
  }

  return state;
};

export default reducer;
