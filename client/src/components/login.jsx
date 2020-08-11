import React, { useState } from "react";
import { useStoreActions } from "easy-peasy";

export default function Login() {
  const { login, setUsername } = useStoreActions(actions => actions.username);
  const { getVocab } = useStoreActions(actions => actions.vocab);
  const [state, setState] = useState("");

  const handleLogin = () => {
    login(state).then(res => {
      getVocab(res);
    });
  };

  const notLogin = () => {
    setUsername("Someone");
    getVocab("Someone");
  };

  return (
    <div className="modal is-active">
      <div className="modal-background"></div>
      <div className="modal-card">
        <header className="modal-card-head">
          <p className="modal-card-title">What is your name?</p>
          <button
            className="delete"
            aria-label="close"
            onClick={() => notLogin()}
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
          <button className="button" onClick={() => notLogin()}>
            Cancel
          </button>
        </footer>
      </div>
    </div>
  );
}
