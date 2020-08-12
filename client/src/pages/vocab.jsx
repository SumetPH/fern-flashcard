import React from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getVocab, deleteVocab } from "../redux/actions";
import Card from "../components/card";

export default function Vocab() {
  const dispatch = useDispatch();
  const { loading } = useSelector(state => state.loadingReducer);
  const { username } = useSelector(state => state.usernameReducer);
  const { vocab } = useSelector(state => state.vocabReducer);

  const handleDeleteVocab = id => {
    dispatch(deleteVocab({ username, id }))
      .then(() => {
        dispatch(getVocab(username));
      })
      .catch(() => alert("Something wrong!"));
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
        <Card item={item} handleDeleteVocab={handleDeleteVocab} />
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
