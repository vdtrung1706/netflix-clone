import { connect } from 'react-redux';
import NavBar from '../components/layout/nav-bar';

const mapStateToProps = state => {
  return {
    currentUser: state.user.currentUser,
  };
};

export const NavBarContainer = connect(mapStateToProps)(NavBar);
