import { all, call, put, takeLatest } from 'redux-saga/effects';
import { LOCAL_STORAGE_KEY } from '../../constants/local-storage-constant';
import { auth, signInWithGoogle, signOut } from '../../firebase';
import {
  createUserProfileDocument,
  getCurrentUser,
} from '../../firebase/user.firebase';
import { authActions } from './slice.auth';

/** USER AUTH */
export function* signInUserAuthSync(userAuth, additionalInfo) {
  try {
    const user = yield call(
      createUserProfileDocument,
      userAuth,
      additionalInfo,
    );
    localStorage.setItem(LOCAL_STORAGE_KEY.CURRENT_USER, JSON.stringify(user));
    yield put(authActions.signInSuccess(user));
  } catch (error) {
    localStorage.setItem(LOCAL_STORAGE_KEY.CURRENT_USER, JSON.stringify(null));
    yield put(authActions.signInFailure(error.message));
  }
}

export function* signInGoogleSync() {
  try {
    const { user } = yield signInWithGoogle();
    yield signInUserAuthSync(user);
  } catch (error) {
    yield put(authActions.signInFailure(error.message));
  }
}

export function* signInEmailSync(action) {
  const { email, password } = action.payload;
  try {
    const { user } = yield auth.signInWithEmailAndPassword(email, password);
    yield signInUserAuthSync(user);
  } catch (error) {
    yield put(authActions.signInFailure(error.message));
  }
}

export function* signOutSync() {
  try {
    yield signOut();
    localStorage.setItem(LOCAL_STORAGE_KEY.CURRENT_USER, JSON.stringify(null));
    yield put(authActions.signOutSuccess());
  } catch (error) {
    yield put(authActions.signOutFailure(error.message));
  }
}

export function* signUpSync(action) {
  const { email, password, displayName } = action.payload;
  try {
    const { user } = yield auth.createUserWithEmailAndPassword(email, password);
    yield put(
      authActions.signUpSuccess({
        user,
        additionalInfo: { displayName },
      }),
    );
  } catch (error) {
    yield put(authActions.signUpFailure(error.message));
  }
}

export function* signInAfterSignUpSync(action) {
  const { user, additionalInfo } = action.payload;
  yield signInUserAuthSync(user, additionalInfo);
}

export function* onSignInGoogleStart() {
  yield takeLatest(authActions.signInGoogleStart.type, signInGoogleSync);
}

export function* onSignInEmailStart() {
  yield takeLatest(authActions.signInEmailStart.type, signInEmailSync);
}

export function* onSignUpStart() {
  yield takeLatest(authActions.signUpStart.type, signUpSync);
}

export function* onSignUpSuccess() {
  yield takeLatest(authActions.signUpSuccess.type, signInAfterSignUpSync);
}

export function* onSignOutStart() {
  yield takeLatest(authActions.signOutStart.type, signOutSync);
}

export function* checkUserSessionSync() {
  try {
    const userAuth = yield getCurrentUser();
    if (userAuth) {
      yield signInUserAuthSync(userAuth);
    } else {
      localStorage.setItem(
        LOCAL_STORAGE_KEY.CURRENT_USER,
        JSON.stringify(null),
      );
      yield put(authActions.signInFailure('check_session_failure'));
    }
  } catch (error) {
    localStorage.setItem(LOCAL_STORAGE_KEY.CURRENT_USER, JSON.stringify(null));
    yield put(authActions.signInFailure(error.message));
  }
}

export function* onCheckUserSession() {
  yield takeLatest(authActions.checkUserSession.type, checkUserSessionSync);
}
/** END OF USER AUTH */

export function* authSagas() {
  yield all([
    call(onSignInEmailStart),
    call(onSignInGoogleStart),
    call(onSignUpStart),
    call(onSignUpSuccess),
    call(onSignOutStart),
    call(onCheckUserSession),
  ]);
}
