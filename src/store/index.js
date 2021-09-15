import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import rootReducer from './rootReducer';
import thunk from 'redux-thunk';

export default (preloadedState) => {
  const sagaMiddleware = createSagaMiddleware();

  return {
    ...createStore(
      rootReducer,
      preloadedState,
      applyMiddleware(thunk, sagaMiddleware),
    ),
    runSaga: sagaMiddleware.run,
  };
};
