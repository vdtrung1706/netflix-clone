import { Nav } from '@components/layout';
import { userSlice } from '@store/devtools/userSlice';
import { selectUser } from '@store/selectors/userSelectors';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Routes from './routes/Routes';

export default function App() {
  const { currentUser } = useSelector(selectUser);
  const dispatch = useDispatch();

  // useEffect(() => {
  //   dispatch(userSlice.actions.checkUserSession());
  // }, [dispatch]);

  return (
    <div className="w-full overflow-x-hidden">
      <Nav />
      {/* {currentUser && <Nav />} */}
      <Routes />
    </div>
  );
}
