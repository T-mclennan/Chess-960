import React from "react";
import PlayerItem from "./PlayerItem";
import "../../css/RightSidebar.css";

export default function PlayerList(props) {
  return (
    <div className="playerList">
      {props.users.map((player, i) => (
        //   <li key={i}>{player}</li>
        <PlayerItem key={i} player={player.username} color="pink" />
      ))}
    </div>
  );
}
