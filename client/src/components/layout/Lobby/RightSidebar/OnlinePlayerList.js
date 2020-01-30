import React from "react";
import PlayerItem from "./PlayerItem";
import "../../css/RightSidebar.css";

export default function OnlinePlayerList(props) {
  return (
    <div className="onlinePlayerList">
      {props.users.map((player, i) => (
        //   <li key={i}>{player}</li>
        <PlayerItem key={i} player={player} color="green" />
      ))}
    </div>
  );
}
