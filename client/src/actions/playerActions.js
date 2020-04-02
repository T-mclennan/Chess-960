import { UPDATE_PLAYER, SET_USERNAME, UPDATE_GAME_LIST } from "./playerTypes";

import axios from "axios";
// import { tokenConfig } from "./authActions";

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

//Adds a new game to the player's list of currentGames:
export const addGameToList = ({ username, gameID }) => dispatch => {
  //Headers:
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  //Request body:
  const body = JSON.stringify({ username, gameID });
  console.log(`Adding game ${gameID} to user ${username}.`);
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

//Removes a game from the player's list of currentGames:
export const removeGameFromList = ({ username, gameID }) => dispatch => {
  //Headers:
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  //Request body:
  const body = JSON.stringify({ username, gameID });
  console.log(`Removing game ${gameID} from user ${username}.`);
  console.log(body);

  axios
    .post("api/players/removeGameFromList", body, config)
    .then(res => {
      console.log("inside api/player/removeGameFromList:");
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
