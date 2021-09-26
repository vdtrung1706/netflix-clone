import Nav from '@components/layout/nav/Nav';
import useUserLists from '@hooks/useUserLists';
import { selectUser } from '@store/auth/selectors.auth';
import { authActions } from '@store/auth/slice.auth';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router';
import Routes from './routes/Routes';

export default function App() {
  const { currentUser } = useSelector(selectUser);
  const dispatch = useDispatch();

  const { pathname } = useLocation();

  useEffect(() => {
    dispatch(authActions.checkUserSession());
  }, [dispatch]);

  useUserLists(currentUser?.uid);

  return (
    <div className="relative w-full overflow-x-hidden">
      {currentUser && !pathname.includes('/watch') && <Nav />}
      <Routes />
    </div>
  );
}
