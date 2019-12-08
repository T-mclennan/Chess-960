import {UPDATE_PLAYER, SET_USERNAME} from './playerTypes'

export const updatePlayer = player => {
  return {
    type: UPDATE_PLAYER,
    payload: player
  };
}

export const setUsername = username => {
  return {
    type: SET_USERNAME,
    payload: username
  };
}