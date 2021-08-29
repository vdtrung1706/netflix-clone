import { all, put, call, takeLatest } from 'redux-saga/effects';
import { auth, signInWithGoogle, signOut } from '../../firebase';
import { createUserProfileDocument, getCurrentUser } from '../../firebase/user';
import { userActions } from '../devtools/userSlice';

export function* signInUserAuthSync(userAuth, additionalInfo) {
  try {
    const user = yield call(
      createUserProfileDocument,
      userAuth,
      additionalInfo
    );
    yield put(userActions.signInSuccess(user));
  } catch (error) {
    yield put(userActions.signInFailure(error.message));
  }
}

export function* signInGoogleSync() {
  try {
    const { user } = yield signInWithGoogle();
    yield signInUserAuthSync(user);
  } catch (error) {
    yield put(userActions.signInFailure(error.message));
  }
}

export function* signInEmailSync(action) {
  const { email, password } = action.payload;

  try {
    const { user } = yield auth.signInWithEmailAndPassword(email, password);
    yield signInUserAuthSync(user);
  } catch (error) {
    yield put(userActions.signInFailure(error.message));
  }
}

export function* signOutSync() {
  try {
    yield signOut();
    yield put(userActions.signOutSuccess());
  } catch (error) {
    yield put(userActions.signOutFailure(error.message));
  }
}

export function* signUpSync(action) {
  const { email, password, displayName } = action.payload;

  try {
    const { user } = yield auth.createUserWithEmailAndPassword(email, password);
    yield put(
      userActions.signUpSuccess({ user, additionalInfo: { displayName } })
    );
  } catch (error) {
    yield put(userActions.signUpFailure(error.message));
  }
}

export function* signInAfterSignUpSync(action) {
  const { user, additionalInfo } = action.payload;

  yield signInUserAuthSync(user, additionalInfo);
}

export function* onSignInGoogleStart() {
  yield takeLatest(userActions.signInGoogleStart.type, signInGoogleSync);
}

export function* onSignInEmailStart() {
  yield takeLatest(userActions.signInEmailStart.type, signInEmailSync);
}

export function* onSignUpStart() {
  yield takeLatest(userActions.signUpStart.type, signUpSync);
}

export function* onSignUpSuccess() {
  yield takeLatest(userActions.signUpSuccess.type, signInAfterSignUpSync);
}

export function* onSignOutStart() {
  yield takeLatest(userActions.signOutStart.type, signOutSync);
}

export function* checkUserSessionSync() {
  try {
    const userAuth = yield getCurrentUser();
    if (userAuth) {
      yield signInUserAuthSync(userAuth);
    }
  } catch (error) {
    yield put(userActions.signInFailure(error.message));
  }
}

export function* onCheckUserSession() {
  yield takeLatest(userActions.checkUserSession.type, checkUserSessionSync);
}

export function* userSagas() {
  yield all([
    call(onSignInEmailStart),
    call(onSignInGoogleStart),
    call(onSignUpStart),
    call(onSignUpSuccess),
    call(onSignOutStart),
    call(onCheckUserSession),
  ]);
}
