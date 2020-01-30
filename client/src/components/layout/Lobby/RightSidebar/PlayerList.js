import React from "react";
import PlayerItem from "./PlayerItem";
import "../../css/RightSidebar.css";

export default function PlayerList(props) {
  const { onlineUsers, users } = props;
  const players = users.filter(user => !onlineUsers.includes(user.username));
  return (
    <div className="playerList">
      {players.map((player, i) => (
        <PlayerItem key={i} player={player.username} color="gray" />
      ))}
    </div>
  );
}
