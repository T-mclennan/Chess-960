import {
  UPDATE_PLAYER,
  UPDATE_GAME_LIST,
  SET_USERNAME,
  RETRIEVE_PLAYER,
  CLEAR_PLAYER,
} from '../actions/playerTypes';

const initialState = {
  username: '',
  _id: '',
  rating: '',
  currentGames: [],
  email: '',
};

export default function(state = initialState, action) {
  switch (action.type) {
    case RETRIEVE_PLAYER:
    case UPDATE_PLAYER:
      return {
        ...state,
        ...action.payload,
      };

    case SET_USERNAME:
      return {
        ...state,
        playerName: action.payload.username,
      };

    case UPDATE_GAME_LIST:
      return {
        ...state,
        currentGames: action.payload,
      };

    case CLEAR_PLAYER:
      return initialState;

    default:
      return state;
  }
}
