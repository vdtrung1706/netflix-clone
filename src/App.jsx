import Homepage from './pages/Homepage';
import { BrowserRouter as Router, Redirect, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectCurrentUser } from './redux/selectors/userSelectors';
import TVShowsPage from './pages/TVShowsPage';
import MoviesPage from './pages/MoviesPage';
import IndexPage from './pages/IndexPage';
import AuthPage from './pages/AuthPage';

const App = () => {
  const currentUser = useSelector(selectCurrentUser);

  return (
    <Router>
      {/* {currentUser && <NavContainer />} */}

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
