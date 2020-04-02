import axios from 'axios';
import { returnErrors } from './errorActions';
// import { tokenConfig } from "./authActions";
import {
  UPDATE_GAME,
  GAME_LOADING,
  GAME_LOADED,
  GET_GAME,
  MAKE_MOVE,
  JOIN_GAME,
  SET_GAME_AS_STARTED,
  LOAD_GAME,
  LOAD_COLOR,
  UPDATE_PLAYERS,
  CHANGE_TURN,
  GAME_OVER,
  SET_MODAL_MESSAGE,
  SET_MODAL,
} from './gameTypes';

// import history from "../../src/history";
import { setMainContent } from '../actions/authActions';
import { addGameToList } from './playerActions';
import Axios from 'axios';

export const getGame = () => {
  return {
    type: GET_GAME,
  };
};

export const updateGame = game => {
  return {
    type: UPDATE_GAME,
    payload: game,
  };
};

export const setModalMessage = message => {
  return {
    type: SET_MODAL_MESSAGE,
    payload: message,
  };
};

export const setModal = modal => {
  return {
    type: SET_MODAL,
    payload: modal,
  };
};

// Input: {white, black, timer, style, scoring, color} coming from NewGame.js form
export const createGame = input => dispatch => {
  dispatch({ type: GAME_LOADING });
  axios
    .post(`api/games`, input.newGame)
    .then(res => {
      dispatch({
        type: GAME_LOADED,
        payload: res.data,
      });
      dispatch({
        type: UPDATE_GAME,
        payload: res.data,
      });
      dispatch({
        type: LOAD_COLOR,
        payload: input.newGame.color.toLowerCase(),
      });
      dispatch(
        addGameToList({ username: input.username, gameID: res.data._id })
      );
    })
    .then(() => {
      // history.push("/game");
      dispatch(setMainContent('GAME'));
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
        payload: res.data,
      });
      dispatch(loadColor(username, res.data.white, res.data.black));
    })
    .then(() => {
      dispatch(setMainContent('GAME'));
    })
    .catch(e => console.log(e));
};

//Fetches and loads an open game:
export const quickPlay = username => dispatch => {
  console.log('inside QuickPlay');
  console.log(username);
  // axios
  //   .get("/api/games/findOpenGames")
  //   .then(res => {
  //     console.log("Found open games:");
  //     console.log(res.data);
  //     const gameList = res.data.filter(game => {
  //       return game.username !== username;
  //     });
  axios
    .get('api/games/')
    .then(gameList => {
      const games = gameList.data.filter(
        game =>
          game.started === false &&
          game.white !== username &&
          game.black !== username
      );
      games.reverse();
      const foundGame = games[0];
      // console.log("Found Game!!");
      // console.log(foundGame);
      if (foundGame) {
        dispatch(joinGame(foundGame._id, username));
      } else {
        const newGame = {
          white: username,
          black: '',
          timer: 'Unlimited',
          style: '960',
          scoring: 'Unrated',
          color: 'white',
        };
        dispatch(createGame({ newGame, username }));
      }
    })
    .catch(e => console.log(e));
};

// Takes in a game -- loads color attribute:
export const loadColor = (username, white, black) => dispatch => {
  let color;
  if (username === white) {
    color = 'white';
  } else if (username === black) {
    color = 'black';
  } else {
    return 'none';
  }
  dispatch({
    type: LOAD_COLOR,
    payload: color,
  });
};

export const gameOver = gameID => dispatch => {
  axios.post(`/api/games/gameOver`, gameID).catch(e => console.log(e));
  dispatch({
    type: GAME_OVER,
  });
};

//Adds player to an existing open game, loads the game:
export const joinGame = (gameID, username) => dispatch => {
  axios
    .post(`api/games/joinGame`, { gameID, username })
    .then(res => {
      dispatch({
        type: JOIN_GAME,
        payload: res.data,
      });

      dispatch(loadColor(username, res.data.white, res.data.black));
      dispatch(addGameToList({ username, gameID }));
    })
    .then(() => {
      dispatch(setMainContent('GAME'));
    })

    .catch(e => console.log(e));
};

export const findColor = (game, username) => {
  const { black, white } = game.data;
  let color = white;
  if (black && black === username) {
    color = 'black';
  }
  return color;
};

export const updatePlayers = playerInfo => {
  return {
    type: UPDATE_PLAYERS,
    payload: playerInfo,
  };
};

export const setGameAsStarted = () => {
  return {
    type: SET_GAME_AS_STARTED,
  };
};

export const makeMove = game => async dispatch => {
  await dispatch(changeTurn());
  Axios.post(`api/games/moveMade`, game)
    .then(() => {
      dispatch({
        type: MAKE_MOVE,
        payload: game,
      });
    })
    .catch(e => console.log(e));
};

// export const gameOver = game => async dispatch => {
//   console.log("GAME OVER");
//   console.log(game);
//   Axios.post(`api/games/gameOver`, game)
//     .then(() => {
//       dispatch({
//         type: GAME_OVER,
//         payload: game
//       });
//     })
//     .catch(e => console.log(e));
// };

export const changeTurn = () => {
  console.log('CHANGED TURN');
  return {
    type: CHANGE_TURN,
  };
};
