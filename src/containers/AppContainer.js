import { connect } from 'react-redux';
import { setCurrentUser } from '../redux/user/user.actions';
import App from '../App';

const mapDispatchToProps = {
  setCurrentUser,
};

export const AppContainer = connect(null, mapDispatchToProps)(App);
