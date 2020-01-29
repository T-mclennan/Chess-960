import React from "react";

export default function PlayerList(props) {
  return (
    <div className={props.style}>
      <div className="ui fluid container">
        <ul
          style={{
            listStyleType: "circle",
            lineHeight: "145%",

            fontSize: "21px"
          }}
        >
          {props.users.map((user, i) => (
            <li key={i}>{user.username}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
