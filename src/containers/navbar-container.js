import { connect } from 'react-redux';
import Navbar from '../components/layout/navbar';

const mapStateToProps = state => {
  return {
    currentUser: state.user.currentUser,
  };
};

export const NavBarContainer = connect(mapStateToProps)(Navbar);
