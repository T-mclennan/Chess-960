import {GET_GAME,
        UPDATE_GAME,
        ADD_MOVE,
        START_GAME,
        CHANGE_TURN,
        JOIN_GAME,
        INITIALIZE_GAME} from '../actions/gameTypes'

const initialState = {
  game:{
    white: '',
    black: '',
    fen: '',
    started: '',
    history: [],
    turn: 'white',
    gameID: '',
  },
  color: ''
}


export default function(state = initialState, action) {
  switch(action.type) {
    case GET_GAME:
      return {
        ...state,
        items: action.payload,
      };

    case JOIN_GAME:
      return {
        ...state,
        items: [action.payload, ...state.items]
      };

    case UPDATE_GAME:
      return {
        ...state,
        items: [action.payload, ...state.items]
      };

    case START_GAME:
      return {
        ...state,
      };

    case ADD_MOVE:
      return {
        ...state,
      };
    
    case CHANGE_TURN:
      return {
        ...state,
      };

    case INITIALIZE_GAME:
      return {
        ...state,
      };

    default:
      return state;
  }
} 