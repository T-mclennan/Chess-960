import React, { Component } from 'react';
import { Card } from 'reactstrap';
import Chessboard from 'chessboardjsx';
import { connect } from 'react-redux';
import { setMainContent } from '../../../../../actions/authActions';
import { loadGame, loadColor } from '../../../../../actions/gameActions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faCircle } from "@fortawesome/free-regular-svg-icons";
import { faCircle } from '@fortawesome/free-solid-svg-icons';
import '../../../css/Dashboard.css';

class GameCard extends Component {
  constructor() {
    super();
    this.state = {
      gameID: '',
    };

    this.handleClick = this.handleClick.bind(this);
  }

  async handleClick() {
    // console.log(this.state.gameID);
    await this.props.loadGame(this.props.gameID, this.props.username);
    console.log('Game Loaded');
  }

  render() {
    return (
      <a className='cardWrapper' onClick={this.handleClick}>
        <Card
          body
          // outline
          color='secondary'
          className='gameCard'
          // onClick={() => this.props.setMainContent("GAME")}
        >
          <div className='cardBody'>
            <Chessboard
              className='miniatureBoard'
              position={this.props.fen}
              width={200}
              draggable={false}
              orientation={this.props.color}
            />
            <div className='playerTitle'>
              <span>
                <FontAwesomeIcon
                  icon={faCircle}
                  size='xs'
                  style={{ marginRight: '0.3rem' }}
                />
                {this.props.white ? (
                  this.props.white
                ) : (
                  <span className='openStyling'>Open</span>
                )}
              </span>
              <span>
                <FontAwesomeIcon
                  icon={faCircle}
                  size='xs'
                  style={{
                    marginRight: '0.3rem',
                    color: 'black',
                  }}
                />
                {this.props.black ? (
                  this.props.black
                ) : (
                  <span className='openStyling'>Open</span>
                )}
              </span>
            </div>
          </div>
        </Card>
      </a>
    );
  }
}

const mapStateToProps = state => ({});

export default connect(mapStateToProps, {
  setMainContent,
  loadGame,
  loadColor,
})(GameCard);
