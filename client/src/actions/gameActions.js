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
  LOAD_GAME,
  LOAD_COLOR,
  UPDATE_PLAYERS,
  CHANGE_TURN
} from "./gameTypes";

// import history from "../../src/history";
import { setMainContent } from "../actions/authActions";
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

// export const initializeGame = partialGame => {
//   return {
//     type: INITIALIZE_GAME,
//     payload: partialGame
//   };
// };

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
      // history.push("/game");
      dispatch(setMainContent("GAME"));
    })
    .catch(err => {
      dispatch(returnErrors(err.response.data, err.response.status));
    });
};

export const loadGame = (gameID, username) => dispatch => {
  axios
    .get(`/api/games/${gameID}`)
    .then(res => {
      console.log("LOAD GAME:");
      console.log(res.data);
      dispatch({
        type: LOAD_GAME,
        payload: res.data
      });
      console.log("Set Color:");
      console.log(res.data.white);
      console.log(username);

      dispatch(loadColor(username, res.data.white, res.data.black));
    })
    .then(() => {
      dispatch(setMainContent("GAME"));
    })
    .catch(e => console.log(e));
};

//Fetches and loads an open game:
export const quickPlay = username => dispatch => {
  axios
    .get("/api/games/findAnOpenGame")
    .then(res => {
      console.log("Found an open game:");
      console.log(res.data);
      dispatch({
        type: LOAD_GAME,
        payload: res.data
      });
      console.log("Set Color:");
      console.log(res.data.white);
      console.log(username);

      dispatch(loadColor(username, res.data.white, res.data.black));
    })
    .then(() => {
      dispatch(setMainContent("GAME"));
    })
    .catch(e => console.log(e));
};

// Takes in a game -- loads color attribute:
export const loadColor = (username, white, black) => dispatch => {
  let color;
  if (username === white) {
    color = "white";
  } else if (username === black) {
    color = "black";
  } else {
    return "none";
  }
  console.log("LoadColor:");
  console.log(color);
  dispatch({
    type: LOAD_COLOR,
    payload: color
  });
};

export const findColor = (game, username) => {
  const { black, white } = game.data;
  let color = null;
  if (black && black === username) {
    color = "black";
  }
  if (white && white === username) {
    color = "white";
  }
  return color;
};

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
