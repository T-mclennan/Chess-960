import { UPDATE_PLAYER, SET_USERNAME, RETRIEVE_PLAYER } from "./playerTypes";

import axios from "axios";
import { tokenConfig } from "./authActions";

export const updatePlayer = player => {
  console.log("Inside updatePlayer action");
  return {
    type: UPDATE_PLAYER,
    payload: player
  };
};

export const setUsername = username => {
  return {
    type: SET_USERNAME,
    payload: username
  };
};

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
