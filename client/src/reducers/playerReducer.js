import { UPDATE_PLAYER, SET_USERNAME } from "../actions/playerTypes";

const initialState = {
  userame: "",
  id: "",
  rating: "",
  currentGames: [],
  email: ""
};

export default function(state = initialState, action) {
  switch (action.type) {
    case UPDATE_PLAYER:
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
