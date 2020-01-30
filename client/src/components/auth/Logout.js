import React, { Component, Fragment } from "react";
import { NavLink } from "reactstrap";
import { connect } from "react-redux";
import { logout } from "../../actions/authActions";
import PropTypes from "prop-types";

export class Logout extends Component {
  static propTypes = {
    logout: PropTypes.func.isRequired
  };

  handleClick = () => {
    this.props.socket.emit("logout");
    this.props.logout();
  };

  render() {
    return (
      <Fragment>
        <NavLink onClick={this.handleClick} href="#">
          Log Out
        </NavLink>
      </Fragment>
    );
  }
}

export default connect(null, { logout })(Logout);
