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

export const loadGame = (game) => {
  return {
    type: LOAD_GAME,
    payload: game
  };
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