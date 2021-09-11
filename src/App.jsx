import { Nav } from '@components/layout';
import { authActions } from '@store/auth/slice.auth';
import { selectUser } from '@store/auth/selectors.auth';
import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Routes from './routes/Routes';
import { firestore } from './firebase';
import { conllectIdAndDocs } from '@utils/redux.utils';
import { userListsActions } from '@store/user-lists/slice.user-lists';

export default function App() {
  const { currentUser } = useSelector(selectUser);
  const dispatch = useDispatch();

  const unsubcribeFromMyList = useRef(null);
  const unsubcribeFromLiked = useRef(null);
  const unsubcribeFromDisliked = useRef(null);

  useEffect(() => {
    console.log(currentUser);
    if (!currentUser) {
      dispatch(authActions.checkUserSession());
      return;
    }
    unsubcribeFromLiked.current = firestore
      .collection('users')
      .doc(currentUser.uid)
      .collection('my-list')
      .onSnapshot((snapshot) => {
        const myList = snapshot.docs.map(conllectIdAndDocs);
        dispatch(userListsActions.setMyList(myList));
      });

    unsubcribeFromDisliked.current = firestore
      .collection('users')
      .doc(currentUser.uid)
      .collection('disliked')
      .onSnapshot((snapshot) => {
        const disliked = snapshot.docs.map(conllectIdAndDocs);
        dispatch(userListsActions.setDislikedList(disliked));
      });

    unsubcribeFromMyList.current = firestore
      .collection('users')
      .doc(currentUser.uid)
      .collection('liked')
      .onSnapshot((snapshot) => {
        const liked = snapshot.docs.map(conllectIdAndDocs);
        dispatch(userListsActions.setLikedList(liked));
      });

    return () => {
      if (unsubcribeFromMyList.current) unsubcribeFromMyList.current();
      if (unsubcribeFromLiked.current) unsubcribeFromLiked.current();
      if (unsubcribeFromDisliked.current) unsubcribeFromDisliked.current();
    };
  }, [dispatch, currentUser]);

  return (
    <div className="w-full overflow-x-hidden">
      {/* <Nav /> */}
      {currentUser && <Nav />}
      <Routes />
    </div>
  );
}
