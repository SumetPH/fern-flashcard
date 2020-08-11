import React, { useContext, useState } from "react";
import { AppContext } from "../lib/context";
import Axios from "axios";

export default function Login() {
  const { setUsername } = useContext(AppContext);
  const [state, setState] = useState("");

  const notLogin = () => {
    localStorage.setItem("username", "Someone");
    setUsername("Someone");
  };

  const handleLogin = () => {
    console.log(state);
    Axios.post("/api/login", {
      username: state
    })
      .then(res => {
        console.log(res.data);
        localStorage.setItem("username", res.data);
        setUsername(res.data);
      })
      .catch(err => console.log(err));
  };

  return (
    <div className="modal is-active">
      <div className="modal-background"></div>
      <div className="modal-card">
        <header className="modal-card-head">
          <p className="modal-card-title">Do you want login.</p>
          <button
            className="delete"
            aria-label="close"
            onClick={notLogin}
          ></button>
        </header>
        <section className="modal-card-body">
          <div className="field">
            <label className="label">Username</label>
            <div className="control">
              <input
                className="input is-success"
                type="text"
                name="username"
                onChange={e => setState(e.target.value)}
              />
            </div>
          </div>
        </section>
        <footer className="modal-card-foot">
          <button
            className="button is-success"
            onClick={handleLogin}
            disabled={state === "" ? true : false}
          >
            Submit
          </button>
          <button className="button" onClick={notLogin}>
            Cancel
          </button>
        </footer>
      </div>
    </div>
  );
}
