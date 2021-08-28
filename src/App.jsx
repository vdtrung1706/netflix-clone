import Homepage from './pages/Homepage';
import { BrowserRouter as Router, Redirect, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectUser } from './redux/selectors/userSelectors';
import TVShowsPage from './pages/TVShowsPage';
import MoviesPage from './pages/MoviesPage';
import IndexPage from './pages/IndexPage';
import AuthPage from './pages/AuthPage';
import Nav from './components/layout/Nav';

const App = () => {
  const { loading, error, currentUser } = useSelector(selectUser);

  return (
    <Router>
      {loading && <div>Loading...</div>}
      {error && <div>{error}</div>}

      {currentUser && <Nav />}

      <Route path="/">
        {currentUser ? <Redirect to="/browse" /> : <Redirect to="/welcome" />}
      </Route>

      <Route path="/welcome" component={IndexPage} />

      <Route path="/browse" component={Homepage} />

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
