import {CREATE_GAME,
        DELETE_GAME,
        UPDATE_GAME,
        START_GAME,
        GET_GAME,
        FIND_GAME,
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

export const initializeGame = ({color, ID}) => {
  return {
    type: INITIALIZE_GAME,
    payload: {
      color: color,
      ID: ID,
    }
  };
}