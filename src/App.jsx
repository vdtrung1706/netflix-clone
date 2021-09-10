import { Nav } from '@components/layout';
import { userSlice } from '@store/devtools/userSlice';
import { selectUser } from '@store/selectors/userSelectors';
import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Routes from './routes/Routes';
import { firestore } from './firebase';
import { conllectIdAndDocs } from '@utils/redux.utils';
import { userListsSlice } from '@store/devtools/userListSlice';

export default function App() {
  const { currentUser } = useSelector(selectUser);
  const dispatch = useDispatch();

  const unsubcribeFromMyList = useRef(null);
  const unsubcribeFromLiked = useRef(null);
  const unsubcribeFromDisliked = useRef(null);

  useEffect(() => {
    if (!currentUser) {
      dispatch(userSlice.actions.checkUserSession());
      return;
    }
    unsubcribeFromLiked.current = firestore
      .collection('users')
      .doc(currentUser.uid)
      .collection('my-list')
      .onSnapshot((snapshot) => {
        const myList = snapshot.docs.map(conllectIdAndDocs);
        dispatch(userListsSlice.actions.setMyList(myList));
      });

    unsubcribeFromDisliked.current = firestore
      .collection('users')
      .doc(currentUser.uid)
      .collection('disliked')
      .onSnapshot((snapshot) => {
        const disliked = snapshot.docs.map(conllectIdAndDocs);
        dispatch(userListsSlice.actions.setDisliked(disliked));
      });

    unsubcribeFromMyList.current = firestore
      .collection('users')
      .doc(currentUser.uid)
      .collection('liked')
      .onSnapshot((snapshot) => {
        const liked = snapshot.docs.map(conllectIdAndDocs);
        dispatch(userListsSlice.actions.setLiked(liked));
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
