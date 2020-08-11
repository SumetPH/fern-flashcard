import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";

export default function Add() {
  const history = useHistory();
  const [word, setword] = useState("");
  const [hint, sethint] = useState("");
  const [trans, settrans] = useState("");

  const addVocab = () => {
    setword("");
    settrans("");
    sethint("");
    axios
      .post(`/api/card/${localStorage.getItem("username")}`, {
        word: word,
        trans: trans,
        hint: hint
      })
      .then(res => {
        console.log(res);
        if (res.status === 200) {
          history.goBack();
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
            className="button is-primary hvr-sweep-to-right"
            style={{ margin: 5 }}
            onClick={addVocab}
            disabled={word !== "" && trans !== "" && hint !== "" ? false : true}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
