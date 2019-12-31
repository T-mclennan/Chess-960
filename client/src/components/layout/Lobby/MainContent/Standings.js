import React, { Component } from "react";
import { Table } from "reactstrap";
import { connect } from "react-redux";
import "../../css/lobby.css";

export class Standings extends Component {
  render() {
    return (
      <div className="main container">
        <h3>Standings!</h3>
        <hr />
        <Table bordered responsive dark striped hover>
          <thead>
            <tr>
              <th>#</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Username</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">1</th>
              <td>Mark</td>
              <td>Otto</td>
              <td>@mdo</td>
            </tr>
            <tr>
              <th scope="row">2</th>
              <td>Jacob</td>
              <td>Thornton</td>
              <td>@fat</td>
            </tr>
            <tr>
              <th scope="row">3</th>
              <td>Larry</td>
              <td>the Bird</td>
              <td>@twitter</td>
            </tr>
          </tbody>
        </Table>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  player: state.player.username
});

export default connect(mapStateToProps, {})(Standings);
