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

export const updateGame = () => {
  return {
    type: UPDATE_GAME
  };
}

export const initializeGame = (game) => {
  return {
    type: INITIALIZE_GAME,
    payload: game
  };
}

export const loadGame = (ID) => dispatch => {
  axios.get(`/api/games/${ID}`)
  .then((res) => {
    dispatch({
      type: LOAD_GAME,
      payload: res.data
    })
  console.log(res.data)
  })
  .catch(e => console.log(e));
}



export const updatePlayers = (game) => {
  return {
    type: UPDATE_PLAYERS,
    payload: game
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