import useUserLists from '@hooks/useUserLists';
import { selectUser } from '@store/auth/selectors.auth';
import { authActions } from '@store/auth/slice.auth';
import { lazy, Suspense, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Routes from './routes/Routes';

const Nav = lazy(() => import('@components/layout/nav/Nav'));

export default function App() {
  const { currentUser } = useSelector(selectUser);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(authActions.checkUserSession());
  }, [dispatch]);

  useUserLists(currentUser?.uid);

  return (
    <div className="w-full overflow-x-hidden">
      <Suspense fallback={null}>
        <header>{currentUser && <Nav />}</header>
      </Suspense>
      <Routes />
    </div>
  );
}
