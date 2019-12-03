import {UPDATE_PLAYER} from '../actions/types'

const initialState = {
  playerName: '',
  playerID: ''
}

export default function(state = initialState, action) {
  switch(action.type) {
    case UPDATE_PLAYER:
      return {
        ...state,
        playerName: action.payload.username,
        playerID: action.payload.ID,
      };

    default:
      return state;
  }
} 