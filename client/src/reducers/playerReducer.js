import {
  UPDATE_PLAYER,
  SET_USERNAME,
  RETRIEVE_PLAYER
} from "../actions/playerTypes";

const initialState = {
  username: "",
  _id: "",
  rating: "",
  currentGames: [],
  email: ""
};

export default function(state = initialState, action) {
  switch (action.type) {
    case RETRIEVE_PLAYER:
    case UPDATE_PLAYER:
      console.log("INSIDE REDUCER:");
      console.log(action.paylod);
      return {
        ...state,
        // playerName: action.payload.username,
        // playerID: action.payload.id,
        // rating: action.payload.rating,
        // currentGames: action.payload.games
        ...action.payload
      };

    case SET_USERNAME:
      return {
        ...state,
        playerName: action.payload.username
      };

    default:
      return state;
  }
}
