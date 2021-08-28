import { userSagas } from './sagas/userSagas';
import { all, call } from 'redux-saga/effects';

function* rootSaga() {
  yield all([call(userSagas)]);
}

export default rootSaga;
