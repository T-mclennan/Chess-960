import axios from 'axios';
import { returnErrors } from './errorActions';
import history from '../history';

import {
  PLAYER_LOADED,
  PLAYER_LOADING,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGOUT_SUCCESS,
  LOGIN_FAIL,
  REGISTER_FAIL,
  REGISTER_SUCCESS,
  SET_AUTH_CONTENT,
  SET_MAIN_CONTENT,
  UPDATE_USERLIST,
  CLEAR_AUTH,
} from './authTypes';
import { UPDATE_PLAYER, CLEAR_PLAYER } from './playerTypes';
import { CLEAR_GAME } from './gameTypes';

// Check token and load user:
export const loadPlayer = () => (dispatch, getState) => {
  dispatch({ type: PLAYER_LOADING });
  axios
    .get('api/auth/player', tokenConfig(getState))
    .then(res => {
      dispatch({
        type: PLAYER_LOADED,
        payload: res.data,
      });
      dispatch({
        type: UPDATE_PLAYER,
        payload: res.data,
      });
    })
    .catch(err => {
      dispatch(returnErrors(err.response.data, err.response.status));
      dispatch({
        type: AUTH_ERROR,
      });
    });
};

//Register User:
// export const register = ( {username, email, password} ) => dispatch => {
export const register = newUser => dispatch => {
  //Headers:
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  //Request body:
  const body = JSON.stringify(newUser);

  axios
    .post('/api/players', body, config)
    .then(res => {
      dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data,
        //payload: res.data.player
      });
      dispatch(loadPlayer());
    })
    .catch(err => {
      console.log('ERROR!');
      console.log(err);
      dispatch(
        returnErrors(err.response.data, err.response.status, 'REGISTER_FAIL')
      );
      dispatch({
        type: REGISTER_FAIL,
      });
    });
};

export const clearState = () => dispatch => {
  dispatch({
    type: CLEAR_AUTH,
  });
  dispatch({
    type: CLEAR_PLAYER,
  });
  dispatch({
    type: CLEAR_GAME,
  });
};

//Login User:
export const login = ({ username, password }) => dispatch => {
  //Headers:
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  //Request body:
  const body = JSON.stringify({ username, password });

  axios
    .post('/api/auth', body, config)
    .then(res => {
      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data,
      });
      dispatch(loadPlayer());
      dispatch(setMainContent('DASHBOARD'));
    })
    .catch(err => {
      dispatch(
        returnErrors(err.response.data, err.response.status, 'LOGIN_FAIL')
      );
      dispatch({
        type: LOGIN_FAIL,
      });
    });
};

//Logout User:

export const logout = () => {
  history.push('/');
  return {
    type: LOGOUT_SUCCESS,
  };
};

//Set Auth Content: Sets what content to show in the AuthCard:
export const setAuthContent = content => {
  return {
    type: SET_AUTH_CONTENT,
    payload: content,
  };
};

//Set Main Content: Sets what content to show in Lobby viewport:
export const setMainContent = content => {
  return {
    type: SET_MAIN_CONTENT,
    payload: content,
  };
};

//Updates the current list of connected users in lobby:
export const updateUserlist = users => {
  return {
    type: UPDATE_USERLIST,
    payload: users,
  };
};

// Setup config/headers and token:
export const tokenConfig = getState => {
  //Get token from localStorage:
  const token = getState().auth.token;

  //Set Header:
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  //Add token to header:
  if (token) {
    config.headers['x-auth-token'] = token;
  }
  return config;
};
