import Homepage from './pages/Homepage';
import { Redirect, Route, Switch, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { selectUser } from './redux/selectors/userSelectors';
import TVShowsPage from './pages/TVShowsPage';
import MoviesPage from './pages/MoviesPage';
import IndexPage from './pages/IndexPage';
import AuthPage from './pages/AuthPage';
import Nav from './components/layout/Nav';
import { useEffect } from 'react';
import { userActions } from './redux/devtools/userSlice';

const App = () => {
  const { currentUser } = useSelector(selectUser);

  const dispatch = useDispatch();
  const location = useLocation();

  useEffect(() => {
    dispatch(userActions.checkUserSession());
  }, [dispatch]);

  return (
    <div className="App w-full overflow-x-hidden">
      {currentUser && <Nav />}

      <Switch location={location} key={location.pathname}>
        <Route exact path="/">
          <Redirect to="/welcome" />
        </Route>

        <Route
          exact
          path="/browse"
          render={() =>
            currentUser ? <Homepage /> : <Redirect to="/welcome" />
          }
        />

        <Route
          exact
          path="/movies"
          render={() =>
            currentUser ? <MoviesPage /> : <Redirect to="/welcome" />
          }
        />

        <Route
          exact
          path="/tvshows"
          render={() =>
            currentUser ? <TVShowsPage /> : <Redirect to="/welcome" />
          }
        />

        <Route
          exact
          path="/login"
          render={() =>
            currentUser ? <Redirect to="/browse" /> : <AuthPage />
          }
        />

        <Route
          exact
          path="/welcome"
          render={() =>
            currentUser ? <Redirect to="/browse" /> : <IndexPage />
          }
        />

        <Route path="*">
          <Redirect to="/" />
        </Route>
      </Switch>
    </div>
  );
};

export default App;
