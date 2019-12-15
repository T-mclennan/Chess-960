import React, { useState } from "react";
// import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap';

function Header() {
  return (
    <header style={headerStyle}>
      <h1>Chess 960</h1>
    </header>

    //   <div>
    //   <Navbar color="faded" dark>
    //     <NavbarBrand className="mx-auto" href="/" >Chess 960</NavbarBrand>
    //     <NavbarToggler className="ml-auto" />
    //       <Nav navbar>
    //       </Nav>
    //   </Navbar>
    // </div>
  );
}

// const headerStyle = {
//   background: '#333',
//   color: '#fff',
//   textAlign: 'center',
//   padding: '10px',
// }

// const linkStyle = {
//   color: "white",
//   textDecoration: 'none',
// }

const headerStyle = {
  color: "#fff",
  textAlign: "center",
  padding: "10px",
  background: "#152331",
  /* fallback for old browsers */
  background: "-webkit-linear-gradient(45deg, #000000, #152331)",
  /* Chrome 10-25, Safari 5.1-6 */
  background: "linear-gradient(45deg, #000000, #152331)"
  /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
};
export default Header;
