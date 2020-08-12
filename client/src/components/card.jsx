import React, { useState } from "react";
import { tts } from "../lib/tts";
export default function Card({ item, handleDeleteVocab }) {
  const [transEvent, setTransEvent] = useState(false);
  return (
    <div className="card" style={{ borderRadius: 18, width: 350 }}>
      <div className="card-content">
        <div className="content has-text-centered">
          <p className="title is-1" style={{ fontSize: "26px" }}>
            {item.word}
          </p>
          <p>{item.hint}</p>
          {transEvent ? <p>Trans : {item.trans}</p> : null}
        </div>
      </div>
      <footer className="card-footer">
        <a
          href="/"
          className="card-footer-item has-text-black"
          onClick={e => {
            e.preventDefault();
            tts(item.word);
          }}
        >
          Play
        </a>
        <a
          href="/"
          className="card-footer-item has-text-black"
          onClick={e => {
            e.preventDefault();
            setTransEvent(true);
          }}
        >
          Trans
        </a>
        <a
          href="/"
          className="card-footer-item has-text-black"
          onClick={e => {
            e.preventDefault();
            handleDeleteVocab(item.id);
          }}
        >
          Delete
        </a>
      </footer>
    </div>
  );
}
