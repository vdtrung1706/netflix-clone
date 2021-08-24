export const initialState = {
  movies: [],
  viewedSoFar: 0,
  distance: 0,
  totalInViewport: 0,
  currentPage: 0,
  totalPages: 0,
  containerWidth: 0,
  hasPre: false,
  hasNext: false,
};

const moveSection = (state, action) => {
  if (action.payload === 'RIGHT') {
    state.viewedSoFar = state.viewedSoFar + state.totalInViewport;
    state.distance = state.distance - state.containerWidth;
    state.currentPage = state.currentPage + 1;
  }

  if (action.payload === 'LEFT') {
    state.viewedSoFar = state.viewedSoFar - state.totalInViewport;
    state.distance = state.distance + state.containerWidth;
    state.currentPage = state.currentPage - 1;
  }

  if (action.payload === 'RESET') {
    state.viewedSoFar = 0;
    state.distance = 0;
    state.currentPage = 0;
  }

  setNextAndPre(state);
};

const setMovies = (state, action) => {
  state.movies = action.payload;
};

const setContainerWidth = (state, action) => {
  const { containerWidth, itemWidth } = action.payload;

  if (containerWidth && itemWidth && state.movies) {
    const totalInViewport = Math.ceil(containerWidth / itemWidth);

    state.containerWidth = containerWidth;
    state.totalInViewport = totalInViewport;
    state.totalPages = state.movies.length / totalInViewport;

    setNextAndPre(state);
  }
};

const setNextAndPre = state => {
  state.hasPre = state.distance < 0;
  state.hasNext =
    state.viewedSoFar + state.totalInViewport < state.movies.length;
};

export const reducers = {
  moveSection,
  setMovies,
  setContainerWidth,
  setNextAndPre,
};
