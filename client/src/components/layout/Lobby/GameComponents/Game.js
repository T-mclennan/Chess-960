import React, { Component } from 'react';
import ChessGame from '../../../ChessGame';
import WhiteDetails from './WhiteDetails';
import BlackDetails from './BlackDetails';
import StatusModal from './StatusModal';
import { connect } from 'react-redux';
import '../../css/lobby.css';

export class Game extends Component {
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     modal: false,
  //     modalMessage: ""
  //   };
  // }

  // componentDidMount() {
  //   const { modal, modalMessage } = this.props.game;
  //   this.setState({ modal: modal, modalMessage: modalMessage });
  //   console.log("Game Component:");
  //   console.log(this.props);
  // }

  render() {
    return (
      <div className='gameWrapper'>
        <div className='gameContainer'>
          <WhiteDetails />
          <div className='gameWindow'>{ChessGame()}</div>
          <BlackDetails />
          <StatusModal
          // modal={this.state.modal}
          // message={this.state.modalMessage}
          />
        </div>
        {/* <div className='gameButtonBar'></div> */}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  game: state.game,
});

export default connect(mapStateToProps, {})(Game);
