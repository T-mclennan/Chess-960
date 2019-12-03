import {CREATE_GAME,
        DELETE_GAME,
        UPDATE_GAME,
        START_GAME,
        GET_GAME,
        FIND_GAME} from './gameTypes'

export const getGames = () => {
  return {
    type: GET_GAME
  };
}