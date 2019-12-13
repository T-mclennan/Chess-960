import axios from 'axios'
import {CREATE_GAME,
        DELETE_GAME,
        UPDATE_GAME,
        START_GAME,
        GET_GAME,
        LOAD_GAME,
        JOIN_GAME,
        MAKE_MOVE,
        INITIALIZE_GAME,
        UPDATE_PLAYERS,
        CHANGE_TURN} from './gameTypes'

export const getGame = () => {
  return {
    type: GET_GAME
  };
}

export const updateGame = (game) => {
  return {
    type: UPDATE_GAME,
    payload: game
  };
}

export const initializeGame = (partialGame) => {
  return {
    type: INITIALIZE_GAME,
    payload: partialGame
  };
}

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



export const updatePlayers = (playerInfo) => {
  return {
    type: UPDATE_PLAYERS,
    payload: playerInfo
  };
}

export const makeMove = (game) => {
  return {
    type: MAKE_MOVE,
    payload: game
  };
}

export const changeTurn = () => {
  return {
    type: CHANGE_TURN,
  };
}