import { useDispatch, useSelector } from 'react-redux';
import { selectUser } from './redux/selectors/userSelectors';

import Nav from './components/layout/Nav';
import { useEffect } from 'react';
import { userActions } from './redux/devtools/userSlice';
import Routes from './routes/Routes';

const App = () => {
  const { currentUser } = useSelector(selectUser);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(userActions.checkUserSession());
  }, [dispatch]);

  return (
    <div className="w-full overflow-x-hidden">
      {currentUser && <Nav />}
      <Routes />
    </div>
  );
};

export default App;
