import React from "react";
import { Link } from "react-router-dom";
import { useStoreActions, useStoreState } from "easy-peasy";
import Card from "../components/card";

export default function Vocab() {
  const { username } = useStoreState(state => state.username);
  const { vocab, loading } = useStoreState(state => state.vocab);
  const { deleteVocab } = useStoreActions(actions => actions.vocab);

  const deleteCard = id => {
    deleteVocab({ username, id });
  };

  const list = vocab.map((item, index) => {
    return (
      <div
        className="column is-12"
        style={{
          display: "flex",
          justifyContent: "center"
        }}
        key={index}
      >
        <Card item={item} deleteCard={deleteCard} />
      </div>
    );
  });
  return (
    <div className="has-background-primary" style={{ minHeight: "100vh" }}>
      <div className="column" style={{ paddingTop: 80 }}>
        {list}
      </div>
      <div className="column has-text-centered" style={{ paddingTop: 30 }}>
        <Link
          to="/vocab/add"
          className={`hvr-pop button is-warning ${loading ? "is-loading" : ""}`}
        >
          Add Vocab
        </Link>
      </div>
    </div>
  );
}
