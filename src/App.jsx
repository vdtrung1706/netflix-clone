import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectUser } from './redux/selectors/userSelectors';
import { userSlice } from './redux/devtools/userSlice';
import Nav from './components/layout/Nav';
import Routes from './routes/Routes';

export default function App() {
  const { currentUser } = useSelector(selectUser);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(userSlice.actions.checkUserSession());
  }, [dispatch]);

  return (
    <div className="w-full overflow-x-hidden">
      {currentUser && <Nav />}
      <Routes />
    </div>
  );
}
