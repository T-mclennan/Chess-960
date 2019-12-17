import { combineReducers } from "redux";
import playerReducer from "./playerReducer";
import gameReducer from "./gameReducer";
import errorReducer from "./errorReducer";
import authReducer from "./authReducer";

export default combineReducers({
  player: playerReducer,
  game: gameReducer,
  error: errorReducer,
  auth: authReducer
});
