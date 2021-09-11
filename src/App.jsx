import { Nav } from '@components/layout';
import useUserLists from '@hooks/useUserLists';
import { selectUser } from '@store/auth/selectors.auth';
import { authActions } from '@store/auth/slice.auth';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Routes from './routes/Routes';

export default function App() {
  const { currentUser } = useSelector(selectUser);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(authActions.checkUserSession());
  }, [currentUser, dispatch]);

  useUserLists(currentUser?.uid);

  return (
    <div className="w-full overflow-x-hidden">
      {/* <Nav /> */}
      {currentUser && <Nav />}
      <Routes />
    </div>
  );
}
