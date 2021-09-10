import SkeletonSliders from '@components/layout/loader/SkeletonSliders';
import { selectUser } from '@store/selectors/userSelectors';
import { AnimatePresence } from 'framer-motion';
import { lazy, Suspense } from 'react';
import { useSelector } from 'react-redux';
import { Redirect, Route, Switch, useLocation } from 'react-router-dom';
import AccountPage from '../pages/AccountPage';
import AuthPage from '../pages/AuthPage';
import HelpCenterPage from '../pages/HelpCenterPage';
import KidsPage from '../pages/KidsPage';
import ProfilesPage from '../pages/ProfilesPage';
import TVShowsPage from '../pages/TVShowsPage';
import WelcomePage from '../pages/WelcomePage';
const LatestPage = lazy(() => import('../pages/LatestPage'));
const MoviesPage = lazy(() => import('../pages/MoviesPage'));
const MyListPage = lazy(() => import('../pages/MyListPage'));
const SearchPage = lazy(() => import('../pages/SearchPage'));
const Homepage = lazy(() => import('../pages/Homepage'));

const Routes = () => {
  const { currentUser } = useSelector(selectUser);
  const location = useLocation();

  return (
    <div>
      <AnimatePresence exitBeforeEnter>
        <Suspense
          fallback={
            <div className="pt-20">
              <SkeletonSliders />
            </div>
          }
        >
          <Switch location={location} key={location.pathname}>
            <Route
              exact
              path="/browse"
              render={() =>
                currentUser ? <Homepage /> : <Redirect to="/welcome" />
                // <Homepage />
              }
            />
            <Route
              exact
              path="/browse/movies"
              render={() =>
                currentUser ? <MoviesPage /> : <Redirect to="/welcome" />
              }
            />
            <Route
              exact
              path="/browse/tvshows"
              render={() =>
                currentUser ? <TVShowsPage /> : <Redirect to="/welcome" />
              }
            />
            <Route
              exact
              path="/browse/my-list"
              render={() =>
                currentUser ? <MyListPage /> : <Redirect to="/welcome" />
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
          </Switch>
        </Suspense>
      </AnimatePresence>

      <Switch location={location} key={location.pathname}>
        <Route exact path="/" render={() => <Redirect to="/login" />} />
        {/* <Route exact path="/" render={() => <Redirect to="/browse" />} /> */}
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
            currentUser ? <SearchPage /> : <Redirect to="/login" />
          }
        />

        <Route
          exact
          path="/profiles/manage"
          render={() =>
            currentUser ? <ProfilesPage /> : <Redirect to="/welcome" />
          }
        />
        <Route
          exact
          path="/help-center"
          render={() =>
            currentUser ? <HelpCenterPage /> : <Redirect to="/welcome" />
          }
        />
        <Route
          exact
          path="/your-account"
          render={() =>
            currentUser ? <AccountPage /> : <Redirect to="/welcome" />
          }
        />
        <Route
          exact
          path="/login"
          render={() =>
            currentUser ? <Redirect to="/browse" /> : <AuthPage />
          }
        />
        <Route path="*" redner={() => <Redirect to="/" />} />
      </Switch>
    </div>
  );
};

export default Routes;
