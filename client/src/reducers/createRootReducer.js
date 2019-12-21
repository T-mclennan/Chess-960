// reducers.js
import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";
import playerReducer from "./playerReducer";
import gameReducer from "./gameReducer";
import errorReducer from "./errorReducer";
import authReducer from "./authReducer";

const createRootReducer = history =>
  combineReducers({
    router: connectRouter(history),
    player: playerReducer,
    game: gameReducer,
    error: errorReducer,
    auth: authReducer
  });
export default createRootReducer;
