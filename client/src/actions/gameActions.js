import axios from "axios";
import { returnErrors } from "./errorActions";
import { tokenConfig } from "./authActions";
import {
  UPDATE_GAME,
  GAME_LOADING,
  GAME_LOADED,
  GET_GAME,
  MAKE_MOVE,
  JOIN_GAME,
  INITIALIZE_GAME,
  UPDATE_PLAYERS,
  CHANGE_TURN
} from "./gameTypes";

import history from "../../src/history";
import { addGameToList } from "./playerActions";

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
export const createGame = input => dispatch => {
  dispatch({ type: GAME_LOADING });
  console.log("Inside CreateGAME");
  console.log(input);
  axios
    .post(`api/games`, input.newGame)
    .then(res => {
      console.log("api/games response:");
      console.log(res.data);
      dispatch({
        type: GAME_LOADED,
        payload: res.data
      });
      dispatch({
        type: UPDATE_GAME,
        payload: res.data
      });
      console.log("addGame payload:");
      console.log({ userID: input.userID, gameID: res.data._id });
      dispatch(addGameToList({ userID: input.userID, gameID: res.data._id }));
    })
    .then(() => {
      history.push("/game");
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
