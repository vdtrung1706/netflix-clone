import { NavBar } from './components/layout';
import { Homepage } from './pages';
import { BrowserRouter as Router, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
      <NavBar />
      <Route path="/browse">
        <Homepage />
      </Route>
    </Router>
  );
}

export default App;
