import axios from "axios";
import { returnErrors } from "./errorActions";

import {
  PLAYER_LOADED,
  PLAYER_LOADING,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGOUT_SUCCESS,
  LOGIN_FAIL,
  REGISTER_FAIL,
  REGISTER_SUCCESS
} from "./authTypes";

// Check token and load user:
export const loadPlayer = () => (dispatch, getState) => {
  //User Loading:
  dispatch({ type: PLAYER_LOADING });

  axios
    .get("api/auth/player", tokenConfig(getState))
    .then(res =>
      dispatch({
        type: PLAYER_LOADED,
        payload: res.data
      })
    )
    .catch(err => {
      dispatch(returnErrors(err.response.data, err.response.status));
      dispatch({
        type: AUTH_ERROR
      });
    });
};

//Register User:
export const register = ({ name, email, password }) => dispatch => {
  //Headers:
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  //Request body:
  const body = JSON.stringify({ name, email, password });

  axios
    .post("/api/players", body, config)
    .then(res =>
      dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data
      })
    )
    .catch(err => {
      dispatch(
        returnErrors(err.response.data, err.response.status, "REGISTER_FAIL")
      );
      dispatch({
        type: REGISTER_FAIL
      });
    });
};

//Login User:
export const login = ({ name, password }) => dispatch => {
  //Headers:
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  //Request body:
  const body = JSON.stringify({ name, password });

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

}

//Logout User:
export const logout = () => {
  return {
    type: LOGOUT_SUCCESS
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
