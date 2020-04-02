import React, { Component } from 'react';
import { joinGame } from '../../../../actions/gameActions';
import { connect } from 'react-redux';
import '../../css/Dashboard.css';

class TableEntry extends Component {
  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    const { joinGame, game, username } = this.props;
    joinGame(game._id, username);
  }

  render() {
    const { game, index } = this.props;
    return (
      <tr onClick={this.handleClick}>
        <th scope='row'>{index}</th>
        <td>{game.black ? game.black : 'open'}</td>
        <td>{game.white ? game.white : 'open'}</td>
        <td>{game.style}</td>
        <td>{game.timer}</td>
      </tr>
    );
  }
}

const mapStateToProps = state => ({
  player: state.player,
});

export default connect(mapStateToProps, { joinGame })(TableEntry);
