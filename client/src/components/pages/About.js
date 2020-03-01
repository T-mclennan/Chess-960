import React from 'react';
import { Container } from 'reactstrap';

export default function About() {
  return (
    <Container style={pageStyle}>
      <h2 style={{ margin: '1.7rem' }}>Currently under development!</h2>

      <span>
        This app was created using the tools
        <a href='https://github.com/jhlywa/chess.js/'>Chess.js</a> and{' '}
        <a href='https://github.com/willb335/chessboardjsx'>Chessboard.jsx</a>.
      </span>
    </Container>
  );
}

const pageStyle = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-start',
  alignItems: 'center',
  color: 'white',
};
