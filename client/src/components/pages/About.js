import React, { Component } from 'react';
import { Container } from 'reactstrap';

export class About extends Component {
  render() {
    return (
      <Container style={pageStyle}>
        <h2 style={{ margin: '1.7rem' }}>
          This application is currently being developed!
        </h2>
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

export default About;
