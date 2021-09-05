import { all, call } from 'redux-saga/effects';
import { userSagas } from './sagas/userSagas';

function* rootSaga() {
  yield all([call(userSagas)]);
}

export default rootSaga;
