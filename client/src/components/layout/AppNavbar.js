import React, { Component } from "react";
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
import Logout from "../auth/Logout ";

class AppNavbar extends Component {
  state = {
    isOpen: false
  };

  toggle = () => {
    this.setState({
      isOpen: !this.state.isOpen
    });
  };
  //class of mb-5 is margin bottom 5, moves everything else down 5 below the navbar
  render() {
    return (
      <div>
        <Navbar color="dark" dark expand="sm" className="mb-5">
          <Container>
            <NavbarBrand href="/">Shopping List</NavbarBrand>
            <NavbarToggler onClick={this.toggle} />
            <Collapse isOpen={this.state.isOpen} navbar>
              <Nav className="ml-auto" navbar>
                <NavItem>
                  <NavLink href="https://github.com/T-mclennan">Github</NavLink>
                  <RegisterModal />
                </NavItem>
                <NavItem>
                  <Logout />
                </NavItem>
              </Nav>
            </Collapse>
          </Container>
        </Navbar>
      </div>
    );
  }
}

export default AppNavbar;
