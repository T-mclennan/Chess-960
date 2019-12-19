import { combineReducers } from "redux";
import { routerReducer } from "react-router-redux";
import playerReducer from "./playerReducer";
import gameReducer from "./gameReducer";
import errorReducer from "./errorReducer";
import authReducer from "./authReducer";

export default combineReducers({
  player: playerReducer,
  game: gameReducer,
  error: errorReducer,
  auth: authReducer,
  routing: routerReducer
});
