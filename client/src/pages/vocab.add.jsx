import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useStoreActions, useStoreState } from "easy-peasy";

export default function Add() {
  const { username } = useStoreState(state => state.username);
  const { loading } = useStoreState(state => state.vocab);
  const { addVocab } = useStoreActions(actions => actions.vocab);
  const history = useHistory();
  const [word, setword] = useState("");
  const [hint, sethint] = useState("");
  const [trans, settrans] = useState("");

  const addVocabClick = () => {
    addVocab({
      username,
      word,
      hint,
      trans
    }).then(res => {
      if (res) {
        history.goBack();
      } else {
        alert("Something wrong!");
      }
    });
  };

  return (
    <div
      className="has-background-primary"
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh"
      }}
    >
      <div
        className="column is-6 has-background-white"
        style={{ borderRadius: 18, paddingTop: 20 }}
      >
        <div className="column">
          <h1 className="title is-1">Add Vocab</h1>
        </div>
        <div className="column">
          <input
            className="input is-primary"
            type="text"
            placeholder="Word"
            onChange={e => setword(e.target.value)}
          />
        </div>
        <div className="column">
          <input
            className="input is-primary"
            type="text"
            placeholder="Trans"
            onChange={e => settrans(e.target.value)}
          />
        </div>
        <div className="column">
          <textarea
            className="textarea is-primary"
            type="text"
            placeholder="Hint"
            onChange={e => sethint(e.target.value)}
          />
        </div>
        <div className="column has-text-centered">
          <button
            className={`button is-primary hvr-sweep-to-right ${
              loading ? "is-loading" : ""
            }`}
            style={{ margin: 5 }}
            onClick={() => addVocabClick()}
            disabled={word !== "" && trans !== "" && hint !== "" ? false : true}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
