import React, { Component } from 'react';
import { Button, CardBody, Form, FormGroup, Input, Alert } from 'reactstrap';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { register, setAuthContent } from '../../actions/authActions';
import { clearErrors } from '../../actions/errorActions';
import history from '../../history';

class RegisterContent extends Component {
  state = {
    redirect: false,
    username: '',
    email: '',
    password: '',
    msg: null,
  };

  static propTypes = {
    isAuthenticated: PropTypes.bool,
    error: PropTypes.object.isRequired,
    register: PropTypes.func.isRequired,
    clearErrors: PropTypes.func.isRequired,
  };

  componentDidUpdate(prevProps) {
    const { error } = this.props;
    if (error !== prevProps.error) {
      if (error.id === 'REGISTER_FAIL') {
        this.setState({ msg: error.msg.msg });
        this.fadeMessage();
      } else {
        this.setState({ msg: null });
      }
    }
  }

  fadeMessage = () => {
    setTimeout(() => {
      this.props.clearErrors();
    }, 8000);
  };

  toggle = () => {
    this.props.clearErrors();
    this.setState({
      redirect: !this.state.redirect,
    });
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();

    const { username, email, password } = this.state;

    //Create user object:
    const newPlayer = {
      username,
      email,
      password,
    };

    //Attempt to register:
    this.props.register(newPlayer);
  };

  render() {
    //If authenticated, redirect to lobby:
    if (this.props.isAuthenticated) {
      console.log('is authenticated');
      history.push('/lobby');
      this.props.setAuthContent('LOGIN');
    }

    return (
      <div>
        <CardBody>
          <Form onSubmit={this.onSubmit}>
            <FormGroup style={{ marginBottom: '0px' }}>
              {/* <Label for="username">Username</Label> */}
              <Input
                className='border border-info'
                maxLength={8}
                autoFocus={true}
                type='text'
                name='username'
                id='username'
                placeholder='Username'
                className='mb-3'
                onChange={this.onChange}
              />

              {/* <Label for="password">Password</Label> */}
              <Input
                type='password'
                name='password'
                id='password'
                placeholder='Password'
                className='mb-3'
                maxLength={20}
                onChange={this.onChange}
              />

              {/* <Label for="email">Email</Label> */}
              <Input
                type='text'
                name='email'
                id='email'
                placeholder='Email'
                className='mb-3'
                maxLength={20}
                onChange={this.onChange}
              />

              <Button style={buttonStyle} block>
                <h5>Register</h5>
              </Button>
            </FormGroup>
          </Form>
          {this.state.msg ? (
            <Alert
              style={{
                marginTop: '1rem',
                marginBottom: '0px',
                fontSize: '1rem',
                textAlign: 'center',
              }}
              color={'danger'}
            >
              {this.state.msg}
            </Alert>
          ) : null}
        </CardBody>
      </div>
    );
  }
}

const buttonStyle = {
  //metalic:
  background: '#0F2027',
  background: '-webkit-linear-gradient(45deg, #0F2027 , #203A43,#2C5364)',
  background: 'linear-gradient(45deg,  #203A43, #0F2027,#2C5364)',
  padding: '0.5rem',
  marginTop: '1.5rem',
  fontSize: '1.3rem',
  borderWidth: '2px',
  fontWeight: 'bold',
  boxShadow: '0 1px 0.5px',
  // boxShadow: "0 19px 18px"
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  error: state.error,
});

export default connect(mapStateToProps, {
  register,
  clearErrors,
  setAuthContent,
})(RegisterContent);
