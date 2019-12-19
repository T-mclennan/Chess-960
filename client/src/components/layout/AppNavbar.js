import React, { Component, Fragment } from "react";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavLink,
  NavItem,
  Container
} from "reactstrap";
import RegisterModal from "../auth/RegisterModal";
import LoginModal from "../auth/LoginModal";
import Logout from "../auth/Logout";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCoffee, faChessQueen } from "@fortawesome/free-solid-svg-icons";
import "./css/Navbar.css";

class AppNavbar extends Component {
  state = {
    isOpen: false
  };

  static propTypes = {
    auth: PropTypes.object.isRequired
  };

  toggle = () => {
    this.setState({
      isOpen: !this.state.isOpen
    });
  };
  //class of mb-5 is margin bottom 5, moves everything else down 5 below the navbar
  render() {
    const { isAuthenticated, player } = this.props.auth;
    const authLinks = (
      <Fragment>
        <NavItem>
          <span className="navbar-text mr-3">
            <strong>{player ? `Welcome ${player.username}!` : ""}</strong>
          </span>
        </NavItem>
        <NavItem>
          <Logout />
        </NavItem>
      </Fragment>
    );

    const guestLinks = (
      <Fragment>
        <NavItem>
          <NavLink onClick={this.toggle}>Register</NavLink>
        </NavItem>
        <NavItem>
          <LoginModal />
        </NavItem>
      </Fragment>
    );

    return (
      <div>
        <Navbar style={navStyle} dark expand="sm" className="mb-5">
          <Container>
            <NavbarBrand href="/">
              <h2>
                <FontAwesomeIcon
                  icon={faChessQueen}
                  style={{
                    color: "white",
                    borderColor: "red",
                    borderWidth: "1px",
                    marginRight: "0.5rem"
                  }}
                />
                Chess 960
              </h2>
            </NavbarBrand>
            <NavbarToggler onClick={this.toggle} />
            <Collapse isOpen={this.state.isOpen} navbar>
              <Nav className="ml-auto" navbar>
                <NavItem>
                  <NavLink href="https://github.com/T-mclennan/Chess-960">
                    Github
                  </NavLink>
                </NavItem>
                {isAuthenticated ? authLinks : guestLinks}
              </Nav>
            </Collapse>
          </Container>
        </Navbar>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});

const navStyle = {
  color: "#fff",
  // textAlign: "center",
  padding: "10px",
  background: "#152331",
  background: "linear-gradient(45deg, #000000, #152331)"
};

export default connect(mapStateToProps, {
  // setContent,
})(AppNavbar);
