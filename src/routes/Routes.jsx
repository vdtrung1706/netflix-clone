import { Billboard } from '@components/layout';
import SkeletonSliders from '@components/layout/loader/SkeletonSliders';
import { AnimatePresence } from 'framer-motion';
import { Suspense } from 'react';
import { Route, Switch, useLocation } from 'react-router-dom';

const Routes = () => {
  const location = useLocation();

  return (
    <div>
      <AnimatePresence>
        <Suspense
          fallback={
            <div className="pt-20">
              <SkeletonSliders />
            </div>
          }
        >
          <Switch location={location} key={location.pathname}>
            <Route exact path="/" render={() => <Billboard />} />
          </Switch>
        </Suspense>
      </AnimatePresence>
    </div>
  );
};

export default Routes;
