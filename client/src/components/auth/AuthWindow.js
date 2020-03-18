import React, { Component } from 'react';
import LoginContent from './LoginContent';
import RegisterContent from './RegisterContent';
import { Card } from 'reactstrap';
import { connect } from 'react-redux';

class AuthWindow extends Component {
  render() {
    const { contentType } = this.props;
    return (
      <Card body className='authCard' style={cardStyle}>
        {contentType === 'LOGIN' && <LoginContent />}
        {contentType === 'REGISTER' && <RegisterContent />}
      </Card>
    );
  }
}

const cardStyle = {
  float: 'none',
  marginTop: '2.5rem',
  boxShadow: '0 19px 18px',
  justifyContent: 'center',
  fontSize: '1.3rem',
  maxWidth: '30rem',
  padding: '1rem',
};

const mapStateToProps = state => ({
  contentType: state.auth.authContent,
});

export default connect(mapStateToProps, {})(AuthWindow);
