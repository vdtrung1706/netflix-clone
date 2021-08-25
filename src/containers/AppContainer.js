import { connect } from 'react-redux';
import { setCurrentUser } from '../store/user/actions';
import App from '../App';

const mapDispatchToProps = {
  setCurrentUser,
};

export const AppContainer = connect(null, mapDispatchToProps)(App);
