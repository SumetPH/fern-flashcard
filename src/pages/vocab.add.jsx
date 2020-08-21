import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addVocab, getVocab } from "../redux/actions";
// import { useStoreActions, useStoreState } from "easy-peasy";

export default function Add() {
  const dispatch = useDispatch();
  const { loading } = useSelector(state => state.loadingReducer);
  const { username } = useSelector(state => state.usernameReducer);
  // const { username } = useStoreState(state => state.username);
  // const { loading } = useStoreState(state => state.vocab);
  // const { addVocab } = useStoreActions(actions => actions.vocab);
  const history = useHistory();
  const [word, setWord] = useState("");
  const [hint, setHint] = useState("");
  const [trans, setTrans] = useState("");

  const handleAddVocab = () => {
    dispatch(
      addVocab({
        username,
        word,
        hint,
        trans
      })
    ).then(res => {
      if (res) {
        dispatch(getVocab(username));
        history.goBack();
      } else {
        alert("Something wrong!");
      }
    });
  };

  return (
    <div className="section has-background-primary mh-100vh d-f jc-c ai-c">
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
            onChange={e => setWord(e.target.value)}
          />
        </div>
        <div className="column">
          <input
            className="input is-primary"
            type="text"
            placeholder="Trans"
            onChange={e => setTrans(e.target.value)}
          />
        </div>
        <div className="column">
          <textarea
            className="textarea is-primary"
            type="text"
            placeholder="Hint"
            onChange={e => setHint(e.target.value)}
          />
        </div>
        <div className="column has-text-centered">
          <button
            className={`button is-primary hvr-sweep-to-right ${
              loading ? "is-loading" : ""
            }`}
            style={{ margin: 5 }}
            onClick={() => handleAddVocab()}
            disabled={word !== "" && trans !== "" && hint !== "" ? false : true}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
