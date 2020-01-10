import { UPDATE_PLAYER, SET_USERNAME, UPDATE_GAME_LIST } from "./playerTypes";

import axios from "axios";
import { tokenConfig } from "./authActions";

export const updatePlayer = player => {
  return {
    type: UPDATE_PLAYER,
    payload: player
  };
};

export const updateGameList = list => {
  return {
    type: UPDATE_GAME_LIST,
    payload: list
  };
};

export const setUsername = username => {
  return {
    type: SET_USERNAME,
    payload: username
  };
};

//Login User:
export const addGameToList = ({ userID, gameID }) => dispatch => {
  //Headers:
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  //Request body:
  const body = JSON.stringify({ userID, gameID });
  console.log(`Adding game ${gameID} to user ${userID}.`);
  console.log(body);

  axios
    .post("api/players/addGameToList", body, config)
    .then(res => {
      console.log("inside api/player/addGameToList:");
      console.log(res);
      dispatch({
        type: UPDATE_GAME_LIST,
        payload: res.data
      });
    })
    .catch(err => {
      console.log(err);
    });
};

// export const removeGameFromList = gameID => {
//   return {
//     type: REMOVE_GAME_FROM_LIST,
//     payload: gameID
//   };
// };

// export const retrievePlayer = () => (dispatch, getState) => {
//   axios.get(
//     "api/auth/player",
//     tokenConfig(getState)
//       .then(res => {
//         console.log("LOADED PLAYER:");
//         console.log(res.data);
//         dispatch({
//           type: RETRIEVE_PLAYER,
//           payload: res.data
//         });
//       })
//       .catch(e => console.log(e))
//   );
// };
