import { userListsActions } from '@store/user-lists/slice.user-lists';
import { collectIdAndDocs } from '@utils/redux.utils';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { firestore } from '../firebase';

const useUserLists = (userId) => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (!userId) return;
    getLists();

    async function getLists() {
      const getList = async (collection) => {
        const snapshot = await firestore
          .collection('users')
          .doc(userId)
          .collection(collection)
          .get();
        return snapshot.docs.map(collectIdAndDocs);
      };
      dispatch(userListsActions.setMyList(await getList('my-list')));
      dispatch(userListsActions.setLikedList(await getList('liked')));
      dispatch(userListsActions.setDislikedList(await getList('disliked')));
    }
  }, [dispatch, userId]);
};

export default useUserLists;
