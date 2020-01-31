import React from "react";
import { Container } from "reactstrap";
import "../../../css/Welcome.css";

export default function Welcome(props) {
  return (
    <Container className="welcome">
      <h1>Welcome {props.username}!!</h1>
      {/* <hr /> */}
      <p>
        This style of chess integrates an element of randomness into the classic
        game, while still providing balance in the start positions. There are a
        total of 960 unique opening positions possible.
      </p>

      <p>On the left sidebar you'll find:</p>

      <ul>
        <li>
          Quickstart: joins an open game, if none are available it will create
          one.
        </li>
        <li>New Game: creates a new game with the desired game options.</li>
        <li>Find Game: Offers a list of available games for you to join.</li>
        <li>Standings: Shows the current score of all top players.</li>
      </ul>
    </Container>
  );
}
