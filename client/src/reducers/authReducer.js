import {
  PLAYER_LOADED,
  PLAYER_LOADING,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGOUT_SUCCESS,
  LOGIN_FAIL,
  REGISTER_FAIL,
  REGISTER_SUCCESS,
  SET_AUTH_CONTENT,
  SET_MAIN_CONTENT,
  UPDATE_USERLIST,
  CLEAR_AUTH,
} from '../actions/authTypes';

const initialState = {
  token: localStorage.getItem('token'),
  isAuthenticated: null,
  isLoading: false,
  player: null,
  userList: [],
  authContent: 'LOGIN',
  mainContent: 'DASHBOARD',
};

export default function(state = initialState, action) {
  switch (action.type) {
    case PLAYER_LOADING:
      return {
        ...state,
        isLoading: true,
      };
    case SET_AUTH_CONTENT:
      return {
        ...state,
        authContent: action.payload,
      };
    case SET_MAIN_CONTENT:
      return {
        ...state,
        mainContent: action.payload,
      };
    case PLAYER_LOADED:
      return {
        ...state,
        isAuthenticated: true,
        isLoading: false,
        player: action.payload,
      };
    case LOGIN_SUCCESS:
    case REGISTER_SUCCESS:
      localStorage.setItem('token', action.payload.token);
      return {
        ...state,
        ...action.payload,
        isAuthenticated: true,
        isLoading: false,
      };
    case UPDATE_USERLIST:
      return {
        ...state,
        userList: action.payload,
      };

    case AUTH_ERROR:
    case LOGIN_FAIL:
    case LOGOUT_SUCCESS:
    case REGISTER_FAIL:
      localStorage.removeItem('token');
      return {
        ...state,
        token: null,
        player: null,
        isAuthenticated: false,
        isLoading: false,
      };
    case CLEAR_AUTH:
      return initialState;
    default:
      return state;
  }
}
