import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login, notLogin, getVocab } from "../redux/actions";

export default function Login() {
  const dispatch = useDispatch();
  const { loading } = useSelector(state => state.loadingReducer);
  const [state, setState] = useState("");

  const handleLogin = () => {
    dispatch(login(state)).then(username => {
      dispatch(getVocab(username));
    });
  };

  const handleNotLogin = () => {
    dispatch(notLogin()).then(username => {
      dispatch(getVocab(username));
    });
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
            onClick={() => handleNotLogin()}
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
            className={`button is-success ${loading ? "is-loading" : null}`}
            onClick={() => handleLogin()}
            disabled={state === "" ? true : false}
          >
            Submit
          </button>
          <button className="button" onClick={() => handleNotLogin()}>
            Cancel
          </button>
        </footer>
      </div>
    </div>
  );
}
