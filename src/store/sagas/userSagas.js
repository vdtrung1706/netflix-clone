import { userListsSlice } from '@store/devtools/userListSlice';
import { all, call, put, takeLatest } from 'redux-saga/effects';
import { auth, firestore, signInWithGoogle, signOut } from '../../firebase';
import { createUserProfileDocument, getCurrentUser } from '../../firebase/user';
import { userSlice } from '../devtools/userSlice';

/** USER AUTH */
export function* signInUserAuthSync(userAuth, additionalInfo) {
  try {
    const user = yield call(
      createUserProfileDocument,
      userAuth,
      additionalInfo,
    );
    yield put(userSlice.actions.signInSuccess(user));
  } catch (error) {
    yield put(userSlice.actions.signInFailure(error.message));
  }
}

export function* signInGoogleSync() {
  try {
    const { user } = yield signInWithGoogle();
    yield signInUserAuthSync(user);
  } catch (error) {
    yield put(userSlice.actions.signInFailure(error.message));
  }
}

export function* signInEmailSync(action) {
  const { email, password } = action.payload;
  try {
    const { user } = yield auth.signInWithEmailAndPassword(email, password);
    yield signInUserAuthSync(user);
  } catch (error) {
    yield put(userSlice.actions.signInFailure(error.message));
  }
}

export function* signOutSync() {
  try {
    yield signOut();
    yield put(userSlice.actions.signOutSuccess());
  } catch (error) {
    yield put(userSlice.actions.signOutFailure(error.message));
  }
}

export function* signUpSync(action) {
  const { email, password, displayName } = action.payload;
  try {
    const { user } = yield auth.createUserWithEmailAndPassword(email, password);
    yield put(
      userSlice.actions.signUpSuccess({
        user,
        additionalInfo: { displayName },
      }),
    );
  } catch (error) {
    yield put(userSlice.actions.signUpFailure(error.message));
  }
}

export function* signInAfterSignUpSync(action) {
  const { user, additionalInfo } = action.payload;
  yield signInUserAuthSync(user, additionalInfo);
}

export function* onSignInGoogleStart() {
  yield takeLatest(userSlice.actions.signInGoogleStart.type, signInGoogleSync);
}

export function* onSignInEmailStart() {
  yield takeLatest(userSlice.actions.signInEmailStart.type, signInEmailSync);
}

export function* onSignUpStart() {
  yield takeLatest(userSlice.actions.signUpStart.type, signUpSync);
}

export function* onSignUpSuccess() {
  yield takeLatest(userSlice.actions.signUpSuccess.type, signInAfterSignUpSync);
}

export function* onSignOutStart() {
  yield takeLatest(userSlice.actions.signOutStart.type, signOutSync);
}

export function* checkUserSessionSync() {
  try {
    const userAuth = yield getCurrentUser();
    if (userAuth) {
      yield signInUserAuthSync(userAuth);
    }
  } catch (error) {
    yield put(userSlice.actions.signInFailure(error.message));
  }
}

export function* onCheckUserSession() {
  yield takeLatest(
    userSlice.actions.checkUserSession.type,
    checkUserSessionSync,
  );
}
/** END OF USER AUTH */

/** USER LIST */
function* removeFromUserList(action, collection) {
  const { movie, userId } = action.payload;
  try {
    yield firestore
      .collection('users')
      .doc(userId)
      .collection(collection)
      .doc(`${movie.id}`)
      .delete();
  } catch (error) {
    yield put(userListsSlice.actions.actionFailure(error.message));
  }
}

function* addToUserList(action, collection) {
  const { movie, userId } = action.payload;
  try {
    yield firestore
      .collection('users')
      .doc(userId)
      .collection(collection)
      .doc(`${movie.id}`)
      .set(movie);
  } catch (error) {
    yield put(userListsSlice.actions.actionFailure(error.message));
  }
}

export function* addToMyList(action) {
  yield addToUserList(action, 'my-list');
}

export function* addToLiked(action) {
  yield addToUserList(action, 'liked');
  yield removeFromDisliked(action);
}

export function* addToDisliked(action) {
  yield addToUserList(action, 'disliked');
  yield removeFromLiked(action);
}

export function* removeFromMyList(action) {
  yield removeFromUserList(action, 'my-list');
}

export function* removeFromLiked(action) {
  yield removeFromUserList(action, 'liked');
}

export function* removeFromDisliked(action) {
  yield removeFromUserList(action, 'disliked');
}

export function* onAddToMyList() {
  yield takeLatest(userListsSlice.actions.addToMyList.type, addToMyList);
}

export function* onAddToLiked() {
  yield takeLatest(userListsSlice.actions.addToLiked.type, addToLiked);
}

export function* onAddToDisliked() {
  yield takeLatest(userListsSlice.actions.addToDisliked.type, addToDisliked);
}

export function* onRemoveFromMyList() {
  yield takeLatest(
    userListsSlice.actions.removeFromMyList.type,
    removeFromMyList,
  );
}

export function* onRemoveFromLiked() {
  yield takeLatest(
    userListsSlice.actions.removeFromLiked.type,
    removeFromLiked,
  );
}

export function* onRemoveFromDisliked() {
  yield takeLatest(
    userListsSlice.actions.removeFromDisliked.type,
    removeFromDisliked,
  );
}
/**END OF USER LIST */

export function* userSagas() {
  yield all([
    call(onSignInEmailStart),
    call(onSignInGoogleStart),
    call(onSignUpStart),
    call(onSignUpSuccess),
    call(onSignOutStart),
    call(onCheckUserSession),
    call(onAddToMyList),
    call(onAddToLiked),
    call(onAddToDisliked),
    call(onRemoveFromMyList),
    call(onRemoveFromDisliked),
    call(onRemoveFromLiked),
  ]);
}
