import { connect } from 'react-redux';
import Nav from '../components/layout/Nav';

const mapStateToProps = state => {
  return {
    currentUser: state.user.currentUser,
  };
};

export const NavContainer = connect(mapStateToProps)(Nav);
