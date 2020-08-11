import React from "react";
import { Link, useHistory } from "react-router-dom";
import { useStoreState, useStoreActions } from "easy-peasy";

export default function Navbar() {
  const { username } = useStoreState(state => state.username);
  const { logout } = useStoreActions(actions => actions.username);
  const history = useHistory();

  const Logout = () => {
    logout();
    history.go(0);
  };

  return (
    <div
      style={{
        position: "absolute",
        top: "3%",
        right: "5%",
        left: "5%",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center"
      }}
    >
      <ul>
        <li>
          <Link to="/">
            <h1 className="title has-text-light">Flashcard</h1>
            <h3 className="subtitle is-6 has-text-light">SumetPH</h3>
          </Link>
        </li>
      </ul>
      <ul>
        <li>
          <span
            className="has-text-white"
            style={{ cursor: "pointer" }}
            onClick={Logout}
          >
            {username}
          </span>
        </li>
      </ul>
    </div>
  );
}
