import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircle } from "@fortawesome/free-solid-svg-icons";
import "../../css/RightSidebar.css";

export default function PlayerItem(props) {
  return (
    <span className="names">
      <FontAwesomeIcon
        icon={faCircle}
        size="xs"
        style={{
          color: props.color,
          marginRight: "0.6rem",
          fontSize: "0.6rem"
        }}
      />
      {props.player}
    </span>
  );
}
