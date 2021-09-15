import * as React from 'react';
import routes from './Routes';
import { Route, Switch } from 'react-router-dom';
import { Billboard } from '@components/layout';

const C = Billboard.component;

export default function App() {
  return (
    <React.Fragment>
      <div className="container">
        <Switch>
          <Route path="/" exact render={() => <C />} />
        </Switch>
        <div>hello </div>
      </div>
    </React.Fragment>
  );
}
