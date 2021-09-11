import { all, call } from 'redux-saga/effects';
import { authSagas } from './auth/sagas.auth';
import { userListsSagas } from './user-lists/sagas.user-lists';

function* rootSaga() {
  yield all([call(authSagas), call(userListsSagas)]);
}

export default rootSaga;
