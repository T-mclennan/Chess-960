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
  SET_GAME_AS_STARTED,
  LOAD_GAME,
  LOAD_COLOR,
  UPDATE_PLAYERS,
  CHANGE_TURN
} from "./gameTypes";

// import history from "../../src/history";
import { setMainContent } from "../actions/authActions";
import { addGameToList } from "./playerActions";
import Axios from "axios";

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

// Input: {white, black, timer, style, scoring, color} coming from NewGame.js form
export const createGame = input => dispatch => {
  dispatch({ type: GAME_LOADING });
  axios
    .post(`api/games`, input.newGame)
    .then(res => {
      dispatch({
        type: GAME_LOADED,
        payload: res.data
      });
      dispatch({
        type: UPDATE_GAME,
        payload: res.data
      });
      dispatch({
        type: LOAD_COLOR,
        payload: input.newGame.color
      });
      dispatch(
        addGameToList({ username: input.username, gameID: res.data._id })
      );
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
      dispatch({
        type: LOAD_GAME,
        payload: res.data
      });

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
  dispatch({
    type: LOAD_COLOR,
    payload: color
  });
};

//Adds player to an existing open game, loads the game:
export const joinGame = (gameID, username) => dispatch => {
  axios
    .post(`api/games/joinGame`, { gameID, username })
    .then(res => {
      dispatch({
        type: JOIN_GAME,
        payload: res.data
      });

      dispatch(loadColor(username, res.data.white, res.data.black));
      dispatch(addGameToList({ username, gameID }));
    })
    .then(() => {
      dispatch(setMainContent("GAME"));
    })

    .catch(e => console.log(e));
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

export const setGameAsStarted = () => {
  return {
    type: SET_GAME_AS_STARTED
  };
};

export const makeMove = game => async dispatch => {
  await dispatch(changeTurn());
  // console.log('changed turn')
  Axios.post(`api/games/updateGame`, game)
    .then(() => {
      dispatch({
        type: MAKE_MOVE,
        payload: game
      });
    })
    .catch(e => console.log(e));
};

export const changeTurn = () => {
  console.log("CHANGED TURN");
  return {
    type: CHANGE_TURN
  };
};
