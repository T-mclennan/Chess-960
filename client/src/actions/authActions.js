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

  axios
    .get("api/auth/player", config)
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
