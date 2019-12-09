import {GET_GAME,
        UPDATE_GAME,
        ADD_MOVE,
        START_GAME,
        CHANGE_TURN,
        JOIN_GAME,
        INITIALIZE_GAME} from '../actions/gameTypes'

const initialState = {
    white: '',
    black: '',
    fen: '',
    started: false,
    history: [],
    turn: 'white',
    color: '',
    gameID: '5',

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
        color: action.payload.color,
        gameID: action.payload.ID,
        fen: action.payload.fen,
      };

    default:
      return state;
  }
} 