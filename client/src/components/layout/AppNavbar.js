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
import { setAuthContent } from "../../actions/authActions";
import Logout from "../auth/Logout";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChessQueen, faSkating } from "@fortawesome/free-solid-svg-icons";
import history from "../../history";

import "./css/Navbar.css";

class AppNavbar extends Component {
  state = {
    isOpen: false
  };

  static propTypes = {
    auth: PropTypes.object.isRequired
  };

  setRegister = async () => {
    await this.props.setAuthContent("REGISTER");
    history.push("/");
  };

  setLogin = async () => {
    await this.props.setAuthContent("LOGIN");
    history.push("/");
  };

  //class of mb-5 is margin bottom 5, moves everything else down 5 below the navbar
  render() {
    const { isAuthenticated, player } = this.props.auth;
    const authLinks = (
      <Fragment>
        <NavItem>
          <NavLink href="/about">About</NavLink>
        </NavItem>
        <NavItem>
          <NavLink href="https://github.com/T-mclennan/Chess-960">
            Github
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink href="/settings">Settings</NavLink>
        </NavItem>
        <NavItem>
          <Logout />
        </NavItem>
      </Fragment>
    );

    const guestLinks = (
      <Fragment>
        <NavItem>
          <NavLink href="/about">About</NavLink>
        </NavItem>
        <NavItem>
          <NavLink href="https://github.com/T-mclennan/Chess-960">
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
      <div>
        <Navbar style={navStyle} dark expand="sm">
          <Container className="navContainer">
            <NavbarBrand
              href={this.props.auth.isAuthenticated ? "/lobby" : "/"}
            >
              <h2>
                <FontAwesomeIcon
                  icon={faChessQueen}
                  style={{
                    color: "white",
                    borderColor: "red",
                    borderWidth: "1px",
                    marginRight: "0.7rem"
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
            <Collapse isOpen={this.state.isOpen} navbar>
              <Nav className="ml-auto" navbar>
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
  padding: "1rem 1.6rem",
  background: "#152331",
  background: "linear-gradient(45deg, #000000, #152331)"
  // border: "1px solid #cccccc"
};

export default connect(mapStateToProps, {
  setAuthContent
})(AppNavbar);
