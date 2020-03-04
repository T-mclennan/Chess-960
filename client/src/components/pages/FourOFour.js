import React, { Component } from 'react';
import { Container } from 'reactstrap';
import chessPicture from '../../assets/images/puzzle_2x.png';
export class FourOhFour extends Component {
  render() {
    return (
      <Container style={pageStyle}>
        <h2 style={{ margin: '1.7rem' }}>Oh snap! That page doesn't exist!</h2>

        <div className='picture'>
          <img
            className='cover'
            src={chessPicture}
            style={{ width: '20rem' }}
            alt='404'
          />
        </div>
      </Container>
    );
  }
}

const pageStyle = {
  dislay: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  alignItems: 'center',
  color: 'white',
};

export default FourOhFour;
