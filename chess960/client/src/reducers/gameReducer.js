import {GET_GAME,
        UPDATE_GAME,
        ADD_MOVE,
        START_GAME,
        DELETE_GAME} from '../actions/gameTypes'

const initialState = {
  white: '',
  black: '',
  fen: '',
  needsPlayer: 'true',
  history: [],
  turn: 'white'
}


export default function(state = initialState, action) {
  switch(action.type) {
    case GET_GAME:
      return {
        ...state,
        items: action.payload,
        loading: false
      };

    case DELETE_GAME:
      return {
        ...state,
        items: state.items.filter(item => item._id !== action.payload)
      };

    case UPDATE_GAME:
      return {
        ...state,
        items: [action.payload, ...state.items]
      }

    case START_GAME:
      return {
        ...state,
        loading: true
      }

    default:
      return state;
  }
} 