import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Card from "../../components/card";

export default function Vocab() {
  const [vocabs, setVocabs] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    axios.get(`/api/card/${localStorage.getItem("username")}`).then(res => {
      setVocabs(res.data);
    });
  };

  const deleteCard = id => {
    axios
      .delete(`/api/card/${localStorage.getItem("username")}/${id}`)
      .then(res => {
        fetchData();
      })
      .catch(err => {
        console.log(err);
      });
  };

  const list = vocabs.map((item, index) => {
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
        <Link to="/vocab/add" className="button is-warning hvr-pop">
          Add Vocab
        </Link>
      </div>
    </div>
  );
}
