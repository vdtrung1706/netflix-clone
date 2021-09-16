import { selectCurrentUser } from '@store/auth/selectors.auth';
import { selectUserLists } from '@store/user-lists/selectors.user-lists';
import { playerActions } from '@store/player/slice.player';
import { selectPlayer } from '@store/player/selectors.player';
import { userListsActions } from '@store/user-lists/slice.user-lists';
import { includeObjectById } from '@utils/array.utils';
import { useCallback, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const useSliderItem = (movie) => {
  const dispatch = useDispatch();
  const { uid } = useSelector(selectCurrentUser);
  const { muted } = useSelector(selectPlayer);
  const { myList, likedList, dislikedList } = useSelector(selectUserLists);
  const inMyList = useMemo(
    () => includeObjectById(myList, movie.id),
    [movie.id, myList],
  );
  const liked = useMemo(
    () => includeObjectById(likedList, movie.id),
    [likedList, movie.id],
  );
  const disliked = useMemo(
    () => includeObjectById(dislikedList, movie.id),
    [dislikedList, movie.id],
  );

  const toggleMyList = useCallback(() => {
    dispatch(userListsActions.toggleMyList({ movie, uid }));
  }, [dispatch, movie, uid]);

  const toggleLiked = useCallback(() => {
    dispatch(userListsActions.toggleLiked({ movie, uid }));
  }, [dispatch, movie, uid]);

  const toggleDisliked = useCallback(() => {
    dispatch(userListsActions.toggleDisliked({ movie, uid }));
  }, [dispatch, movie, uid]);

  const toggleMuted = useCallback(() => {
    dispatch(playerActions.toggleMuted());
  }, [dispatch]);

  return {
    muted,
    inMyList,
    liked,
    disliked,
    toggleDisliked,
    toggleLiked,
    toggleMuted,
    toggleMyList,
  };
};

export default useSliderItem;
