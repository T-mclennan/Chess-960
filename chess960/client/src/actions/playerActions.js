import {UPDATE_PLAYER} from './playerTypes'

export const updatePlayer = player => {
  return {
    type: UPDATE_PLAYER,
    payload: player
  };
}