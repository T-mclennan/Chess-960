import {UPDATE_PLAYER, SET_USERNAME} from '../actions/playerTypes'

const initialState = {
  playerName: '',
  playerID: '',
  rating: '',
  currentGames: []
}

export default function(state = initialState, action) {
  switch(action.type) {
    case UPDATE_PLAYER:
      return {
        ...state,
        playerName: action.payload.username,
        playerID: action.payload.ID,
        rating: action.payload.rating,
        currentGames: action.payload.games
      };

    case SET_USERNAME:
      return {
        ...state,
        playerName: action.payload.username,
      };

    default:
      return state;
  }
} 