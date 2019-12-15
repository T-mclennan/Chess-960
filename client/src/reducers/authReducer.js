import {
  PLAYER_LOADED,
  PLAYER_LOADING,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGOUT_SUCCESS,
  LOGIN_FAIL,
  REGISTER_FAIL,
  REGISTER_SUCCESS
} from "../actions/authTypes";

const initialState = {
  token: localStorage.getItem("token"),
  isAuthenticated: null,
  isLoading: false,
  player: null
};

export default function(state = initialState, action) {
  switch (action.type) {
    case PLAYER_LOADING:
      return {
        ...state,
        isLoading: true
      };
    case PLAYER_LOADED:
      return {
        ...state,
        isAuthenticated: true,
        isLoading: false,
        player: action.payload
      };
    case LOGIN_SUCCESS:
    case REGISTER_SUCCESS:
      localStorage.setItem("token", action.payload.token);
      return {
        ...state,
        ...action.payload,
        isAuthenticated: true,
        isLoading: false
      };
    case AUTH_ERROR:
    case LOGIN_FAIL:
    case LOGOUT_SUCCESS:
    case REGISTER_FAIL:
      localStorage.removeItem("token");
      return {
        ...state,
        token: null,
        player: null,
        isAuthenticated: false,
        isLoading: false
      };
    default:
      return state;
  }
}
