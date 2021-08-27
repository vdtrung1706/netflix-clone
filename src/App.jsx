import Homepage from './pages/Homepage';
import { BrowserRouter as Router, Redirect, Route } from 'react-router-dom';
import { useEffect, useRef } from 'react';
import { auth } from './firebase';
import { createUserProfileDocument } from './firebase/user';
import { NavContainer } from './containers/NavContainer';
import { useSelector } from 'react-redux';
import TVShowsPage from './pages/TVShowsPage';
import MoviesPage from './pages/MoviesPage';
import IndexPage from './pages/IndexPage';
import AuthPage from './pages/AuthPage';

const App = ({ setCurrentUser }) => {
  const currentUser = useSelector(state => state.user.currentUser);

  const unsubscribeFromAuth = useRef(null);

  useEffect(() => {
    unsubscribeFromAuth.current = auth.onAuthStateChanged(async authUser => {
      const user = await createUserProfileDocument(authUser);
      setCurrentUser(user);
    });

    return () => {
      if (!unsubscribeFromAuth) return;

      this.unsubscribeFromAuth.current();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Router>
      {currentUser && <NavContainer />}

      <Route path="/">
        {/* {currentUser ? <Redirect to="/browse" /> : <Redirect to="/welcome" />} */}
        <AuthPage />
      </Route>

      <Route path="/welcome">
        <IndexPage />
      </Route>

      <Route path="/browse">
        <Homepage />
      </Route>

      <Route path="/login">
        {!currentUser ? <AuthPage /> : <Redirect to="/browse" />}
      </Route>

      <Route path="/tvshows">
        {currentUser ? <TVShowsPage /> : <Redirect to="/login" />}
      </Route>

      <Route path="/movies">
        {currentUser ? <MoviesPage /> : <Redirect to="/login" />}
      </Route>
    </Router>
  );
};

export default App;
