import React from 'react';
import { Container } from 'reactstrap';

export default function Settings() {
  return (
    <Container style={pageStyle}>
      <h2 style={{ margin: '1.7rem' }}>Currently under development!</h2>

      <span>The settings page will be added soon</span>
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
