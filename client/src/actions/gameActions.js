import axios from "axios";
import { returnErrors } from "./errorActions";
import { tokenConfig } from "./authActions";
import {
  CREATE_GAME,
  DELETE_GAME,
  UPDATE_GAME,
  GAME_LOADING,
  GAME_LOADED,
  START_GAME,
  GET_GAME,
  LOAD_GAME,
  JOIN_GAME,
  MAKE_MOVE,
  INITIALIZE_GAME,
  UPDATE_PLAYERS,
  CHANGE_TURN
} from "./gameTypes";

export const getGame = () => {
  return {
    type: GET_GAME
  };
};

export const updateGame = game => {
  return {
    type: UPDATE_GAME,
    payload: game
  };
};

export const initializeGame = partialGame => {
  return {
    type: INITIALIZE_GAME,
    payload: partialGame
  };
};

// Input: {white, black, timer, style, scoring} coming from NewGame.js form
export const createGame = input => (dispatch, getState) => {
  dispatch({ type: GAME_LOADING });
  axios
    .post(`api/game/:${input}`, tokenConfig(getState))
    .then(res => {
      dispatch({
        type: GAME_LOADED,
        payload: res.data
      });
      console.log(res.data);
      dispatch({
        type: UPDATE_GAME,
        payload: res.data
      });
    })
    .catch(err => {
      dispatch(returnErrors(err.response.data, err.response.status));
    });
};

// export const loadGame = (game) => dispatch => {
//   axios.get(`/api/games/${ID}`)
//   .then((res) => {
//     dispatch({
//       type: LOAD_GAME,
//       payload: game
//     })
//   console.log(res.data)
//   })
//   .catch(e => console.log(e));
// }

export const updatePlayers = playerInfo => {
  return {
    type: UPDATE_PLAYERS,
    payload: playerInfo
  };
};

export const makeMove = game => {
  return {
    type: MAKE_MOVE,
    payload: game
  };
};

export const changeTurn = () => {
  return {
    type: CHANGE_TURN
  };
};
