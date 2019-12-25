import axios from "axios";
import { returnErrors } from "./errorActions";
import history from "../history";

import {
  PLAYER_LOADED,
  PLAYER_LOADING,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGOUT_SUCCESS,
  LOGIN_FAIL,
  REGISTER_FAIL,
  REGISTER_SUCCESS,
  SET_CONTENT
} from "./authTypes";
import { UPDATE_PLAYER } from "./playerTypes";

// Check token and load user:
export const loadPlayer = () => (dispatch, getState) => {
  dispatch({ type: PLAYER_LOADING });
  axios
    .get("api/auth/player", tokenConfig(getState))
    .then(res => {
      dispatch({
        type: PLAYER_LOADED,
        payload: res.data
      });
      console.log(res.data);
      dispatch({
        type: UPDATE_PLAYER,
        payload: res.data
      });
    })
    .catch(err => {
      dispatch(returnErrors(err.response.data, err.response.status));
      dispatch({
        type: AUTH_ERROR
      });
    });
};

//Register User:
// export const register = ( {username, email, password} ) => dispatch => {
export const register = newUser => dispatch => {
  //Headers:
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  //Request body:
  const body = JSON.stringify(newUser);

  axios
    .post("/api/players", body, config)
    .then(res => {
      console.log("api/players: post");
      console.log(res.data);
      dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data
        //payload: res.data.player
      });
      dispatch(loadPlayer());
    })
    .catch(err => {
      console.log("ERROR!");
      console.log(err);
      dispatch(
        returnErrors(err.response.data, err.response.status, "REGISTER_FAIL")
      );
      dispatch({
        type: REGISTER_FAIL
      });
    });
};

//Login User:
export const login = ({ username, password }) => dispatch => {
  //Headers:
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  //Request body:
  const body = JSON.stringify({ username, password });
  console.log("PLAYER IS:");
  console.log(body);

  axios
    .post("/api/auth", body, config)
    .then(res =>
      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data
      })
    )
    .catch(err => {
      dispatch(
        returnErrors(err.response.data, err.response.status, "LOGIN_FAIL")
      );
      dispatch({
        type: LOGIN_FAIL
      });
    });
};

//Logout User:
export const logout = () => {
  history.push("/");
  return {
    type: LOGOUT_SUCCESS
  };
};

//Set Content: Sets what content to show in the AuthCard:
export const setContent = content => {
  return {
    type: SET_CONTENT,
    payload: content
  };
};

// Setup config/headers and token:
export const tokenConfig = getState => {
  //Get token from localStorage:
  const token = getState().auth.token;

  //Set Header:
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  //Add token to header:
  if (token) {
    config.headers["x-auth-token"] = token;
  }
  return config;
};
