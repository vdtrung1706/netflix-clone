import FallbackLoading from '@components/layout/loader/FallbackLoading';
import { lazy, Suspense } from 'react';
import { Redirect, Route, Switch, useLocation } from 'react-router-dom';

const ExtendedPage = lazy(() => import('../pages/ExtendedPage'));
const AccountPage = lazy(() => import('../pages/AccountPage'));
const AuthPage = lazy(() => import('../pages/AuthPage'));
const HelpCenterPage = lazy(() => import('../pages/HelpCenterPage'));
const KidsPage = lazy(() => import('../pages/KidsPage'));
const ProfilesPage = lazy(() => import('../pages/ProfilesPage'));
const TVShowsPage = lazy(() => import('../pages/TVShowsPage'));
const WelcomePage = lazy(() => import('../pages/WelcomePage'));
const LatestPage = lazy(() => import('../pages/LatestPage'));
const MoviesPage = lazy(() => import('../pages/MoviesPage'));
const MyListPage = lazy(() => import('../pages/MyListPage'));
const SearchPage = lazy(() => import('../pages/SearchPage'));
const Homepage = lazy(() => import('../pages/Homepage'));
const WatchPage = lazy(() => import('../pages/WatchPage'));

const Routes = ({ currentUser }) => {
  const location = useLocation();

  return (
    <Suspense fallback={<FallbackLoading location={location.pathname} />}>
      <Switch location={location} key={location.pathname}>
        <Route
          exact
          path="/browse"
          render={() =>
            currentUser ? <Homepage /> : <Redirect to="/welcome" />
          }
        />

        <Route exact path="/browse/genre/:id" component={ExtendedPage} />

        <Route
          exact
          path="/browse/movie"
          render={() =>
            currentUser ? <MoviesPage /> : <Redirect to="/welcome" />
          }
        />

        <Route
          exact
          path="/browse/tv"
          render={() =>
            currentUser ? <TVShowsPage /> : <Redirect to="/welcome" />
          }
        />

        <Route
          exact
          path="/browse/my-list"
          render={() =>
            currentUser ? <MyListPage /> : <Redirect to="/login" />
          }
        />

        <Route
          exact
          path="/latest"
          render={() =>
            currentUser ? <LatestPage /> : <Redirect to="/welcome" />
          }
        />

        <Route
          exact
          path="/kids"
          render={() =>
            currentUser ? <KidsPage /> : <Redirect to="/welcome" />
          }
        />

        <Route
          exact
          path="/"
          render={() =>
            currentUser ? <Redirect to="/browse" /> : <Redirect to="/welcome" />
          }
        />

        <Route
          exact
          path="/welcome"
          render={() =>
            currentUser ? <Redirect to="/browse" /> : <WelcomePage />
          }
        />

        <Route
          path="/search"
          render={() =>
            currentUser ? <SearchPage /> : <Redirect to="/welcome" />
          }
        />

        <Route
          exact
          path="/profiles/manage"
          render={() =>
            currentUser ? <ProfilesPage /> : <Redirect to="/login" />
          }
        />

        <Route exact path="/help-center" render={() => <HelpCenterPage />} />

        <Route
          exact
          path="/your-account"
          render={() =>
            currentUser ? <AccountPage /> : <Redirect to="/login" />
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
          path="/watch"
          render={() =>
            currentUser ? <WatchPage /> : <Redirect to="/welcome" />
          }
        />

        <Route path="*" redner={() => <Redirect to="/welcome" />} />
      </Switch>
    </Suspense>
  );
};

export default Routes;
