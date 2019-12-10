import {CREATE_GAME,
        DELETE_GAME,
        UPDATE_GAME,
        START_GAME,
        GET_GAME,
        LOAD_GAME,
        JOIN_GAME,
        INITIALIZE_GAME} from './gameTypes'

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