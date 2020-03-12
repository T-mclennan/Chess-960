import React, { Component, Fragment } from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavLink,
  NavItem,
} from 'reactstrap';
import { setAuthContent, setMainContent } from '../../actions/authActions';
import Logout from '../auth/Logout';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChessQueen } from '@fortawesome/free-solid-svg-icons';
import SocketContext from '../../socket-context';
import history from '../../history';
import './css/Navbar.css';

class AppNavbar extends Component {
  state = {
    isOpen: false,
  };

  static propTypes = {
    auth: PropTypes.object.isRequired,
  };

  setRegister = async () => {
    await this.props.setAuthContent('REGISTER');
    history.push('/');
  };

  setLogin = async () => {
    await this.props.setAuthContent('LOGIN');
    history.push('/');
  };

  setAboutPage = () => {
    this.props.setMainContent('ABOUT');
  };

  setSettingsPage = () => {
    this.props.setMainContent('SETTINGS');
  };

  //class of mb-5 is margin bottom 5, moves everything else down 5 below the navbar
  render() {
    const { isAuthenticated } = this.props.auth;
    const authLinks = (
      <Fragment>
        <NavItem>
          <NavLink onClick={this.setAboutPage}>About</NavLink>
        </NavItem>
        <NavItem>
          <NavLink href='https://github.com/T-mclennan/Chess-960'>
            Github
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink onClick={this.setSettingsPage}>Settings</NavLink>
        </NavItem>
        <NavItem>
          <SocketContext.Consumer>
            {socket => <Logout socket={socket} />}
          </SocketContext.Consumer>
        </NavItem>
      </Fragment>
    );

    const guestLinks = (
      <Fragment>
        <NavItem>
          <NavLink href='/about'>About</NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            href='https://github.com/T-mclennan/Chess-960'
            target='_blank'
          >
            Github
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink onClick={this.setRegister}>Register</NavLink>
        </NavItem>
        <NavItem>
          <NavLink onClick={this.setLogin}>Log In</NavLink>
        </NavItem>
      </Fragment>
    );

    return (
      // <div>

      <Navbar style={navStyle} dark expand='sm'>
        <div className='navContainer' style={navContainer}>
          <NavbarBrand href={this.props.auth.isAuthenticated ? '/lobby' : '/'}>
            <h2>
              <FontAwesomeIcon
                icon={faChessQueen}
                style={{
                  color: 'white',
                  borderColor: 'red',
                  borderWidth: '1px',
                  marginRight: '0.7rem',
                }}
              />
              Chess 960
            </h2>
          </NavbarBrand>
          {/* <Nav style={{ justifyContent: "center" }}>
            <span className="navbar-text mx-3">
              <strong style={{ fontSize: "1.3rem" }}>
                {player ? `Welcome ${player.username}!` : ""}
              </strong>
            </span>
          </Nav> */}
          <NavbarToggler onClick={this.toggle} />
          <Collapse
            isOpen={this.state.isOpen}
            navbar
            style={{ marginLeft: '38rem' }}
          >
            <Nav className='ml-auto' navbar>
              {isAuthenticated ? authLinks : guestLinks}
            </Nav>
          </Collapse>
        </div>
      </Navbar>
      // </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
});

const navStyle = {
  color: '#fff',
  padding: '1rem 1.6rem',
  background: 'linear-gradient(45deg, #000000, #152331)',
};

const navContainer = {
  marginRight: '0rem',
  marginLeft: '0rem',
};

export default connect(mapStateToProps, {
  setAuthContent,
  setMainContent,
})(AppNavbar);
