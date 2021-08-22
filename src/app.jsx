import { Homepage } from './pages';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { useEffect, useRef } from 'react';
import { auth } from './firebase';
import { createUserProfileDocument } from './firebase/user';
import { NavBarContainer } from './containers/navbar-container';

const App = ({ setCurrentUser }) => {
  const unsubscribeFromAuth = useRef();

  useEffect(() => {
    unsubscribeFromAuth.current = auth.onAuthStateChanged(async authUser => {
      const user = await createUserProfileDocument(authUser);
      setCurrentUser(user);
    });

    return () => {
      this.unsubscribeFromAuth.current();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Router>
      <NavBarContainer />
      <Route path="/browse">
        <Homepage />
      </Route>
    </Router>
  );
};

export default App;
