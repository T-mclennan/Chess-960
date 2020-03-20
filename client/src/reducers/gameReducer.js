import {
  GET_GAME,
  GAME_LOADED,
  GAME_LOADING,
  UPDATE_GAME,
  MAKE_MOVE,
  CHANGE_TURN,
  JOIN_GAME,
  SET_MODAL,
  SET_MODAL_MESSAGE,
  LOAD_GAME,
  LOAD_COLOR,
  UPDATE_PLAYERS,
  SET_GAME_AS_STARTED,
  GAME_OVER,
  CLEAR_GAME,
} from '../actions/gameTypes';

const initialState = {
  white: '',
  black: '',
  fen: '',
  started: false,
  history: [],
  turn: 'white',
  color: '',
  gameID: '',
  ended: false,
  style: '',
  time: '',
  scoring: '',
  wTime: null,
  bTime: null,
  modal: false,
  modalMessage: '',
  isLoading: false,
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_GAME:
      return {
        ...state,
      };

    case GAME_LOADING:
      return {
        ...state,
        isLoading: true,
      };

    case GAME_LOADED:
      return {
        ...state,
        isLoading: false,
      };

    case UPDATE_GAME:
      return {
        ...state,
        white: action.payload.white,
        black: action.payload.black,
        fen: action.payload.fen,
        started: action.payload.started,
        history: action.payload.history,
        turn: action.payload.turn,
        gameID: action.payload._id,
      };

    case SET_GAME_AS_STARTED:
      return {
        ...state,
        started: true,
      };

    case SET_MODAL:
      return {
        ...state,
        modal: action.payload,
      };

    case SET_MODAL_MESSAGE:
      return {
        ...state,
        modalMessage: action.payload,
      };

    case MAKE_MOVE:
      return {
        ...state,
        fen: action.payload.fen,
        history: action.payload.history,
        wTime: action.payload.wTime,
        bTime: action.payload.bTime,
      };

    case CHANGE_TURN:
      let current = state.turn;
      if (current === 'white') {
        current = 'black';
      } else {
        current = 'white';
      }
      return {
        ...state,
        turn: current,
      };

    case LOAD_GAME:
    case JOIN_GAME:
      return {
        ...state,
        white: action.payload.white,
        black: action.payload.black,
        fen: action.payload.fen,
        started: action.payload.started,
        history: action.payload.history,
        turn: action.payload.turn,
        color: action.payload.color,
        gameID: action.payload._id,
      };

    case LOAD_COLOR:
      return {
        ...state,
        color: action.payload,
      };

    case UPDATE_PLAYERS:
      return {
        ...state,
        white: action.payload.white,
        black: action.payload.black,
        started: action.payload.started,
      };

    case GAME_OVER: {
      return {
        ...state,
        ended: true,
      };
    }

    case CLEAR_GAME:
      return initialState;

    default:
      return state;
  }
}
