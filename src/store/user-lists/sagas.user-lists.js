import { all, call, put, takeLatest } from '@redux-saga/core/effects';
import { firestore } from '../../firebase';
import { userListsActions } from './slice.user-lists';

export function* toggleMyListSync(action) {
  const { movie, uid } = action.payload;

  try {
    const movieRef = yield firestore.doc(`users/${uid}/my-list/${movie.id}`);
    const snapshot = yield movieRef.get();
    if (snapshot.exists) {
      yield movieRef.delete();
    } else {
      yield movieRef.set(movie);
    }
  } catch (error) {
    yield put(userListsActions.actionFailure(error.message));
  }
}

export function* toggleLikedSync({ payload: { movie, uid } }) {
  try {
    // check if it's in disliked list.
    const dislikedMovieRef = yield firestore.doc(
      `users/${uid}/disliked/${movie.id}`,
    );
    const dislikedSnapshot = yield dislikedMovieRef.get();
    if (dislikedSnapshot.exists) {
      yield dislikedMovieRef.delete();
    }
    // toggle liked.
    const likedMovieRef = yield firestore.doc(`users/${uid}/liked/${movie.id}`);
    const likedSnapshot = yield likedMovieRef.get();
    if (likedSnapshot.exists) {
      yield likedMovieRef.delete();
    } else {
      yield likedMovieRef.set(movie);
    }
  } catch (error) {
    yield put(userListsActions.actionFailure(error.message));
  }
}

export function* toggleDislikedSync({ payload: { movie, uid } }) {
  try {
    // check if it's in liked list.
    const likedMovieRef = yield firestore.doc(`users/${uid}/liked/${movie.id}`);
    const likedSnapshot = yield likedMovieRef.get();
    if (likedSnapshot.exists) {
      yield likedMovieRef.delete();
    }
    // toggle disliked.
    const dislikedMovieRef = yield firestore.doc(
      `users/${uid}/disliked/${movie.id}`,
    );
    const dislikedSnapshot = yield dislikedMovieRef.get();
    if (dislikedSnapshot.exists) {
      yield dislikedMovieRef.delete();
    } else {
      yield dislikedMovieRef.set(movie);
    }
  } catch (error) {
    yield put(userListsActions.actionFailure(error.message));
  }
}

export function* onToggleMyList() {
  yield takeLatest(userListsActions.toggleMyList.type, toggleMyListSync);
}

export function* onToggleLiked() {
  yield takeLatest(userListsActions.toggleLiked.type, toggleLikedSync);
}

export function* onToggleDisliked() {
  yield takeLatest(userListsActions.toggleDisliked.type, toggleDislikedSync);
}

export function* userListsSagas() {
  yield all([
    call(onToggleMyList),
    call(onToggleLiked),
    call(onToggleDisliked),
  ]);
}
