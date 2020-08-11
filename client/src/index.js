import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

import "./css/global.css";
import "./css/bulma.min.css";
import "./css/hover.min.css";

import { createStore, thunk, action, StoreProvider } from "easy-peasy";
import axios from "axios";

const username = {
  username: "",
  setUsername: action((state, username) => {
    state.username = username;
  }),
  getUsername: thunk(async actions => {
    const username = await localStorage.getItem("username");
    actions.setUsername(username);
    return username;
  }),
  login: thunk(async (actions, username) => {
    const res = await axios.post("/api/login", { username: username });
    localStorage.setItem("username", res.data);
    actions.setUsername(res.data);
    return res.data;
  }),
  logout: action(state => {
    localStorage.removeItem("username");
    state.username = "";
  })
};

const vocab = {
  vocab: [],
  loading: false,
  setVocab: action((state, vocab) => {
    state.vocab = vocab;
  }),
  getVocab: thunk(async (actions, username) => {
    actions.setLoading(true);
    const res = await axios.get(`/api/card/${username}`);
    actions.setVocab(res.data);
    actions.setLoading(false);
  }),
  addVocab: thunk(async (actions, payload) => {
    try {
      actions.setLoading(true);
      await axios.post(`/api/card/${payload.username}`, {
        word: payload.word,
        hint: payload.hint,
        trans: payload.trans
      });
      actions.setLoading(false);
      actions.getVocab(payload.username);
      return true;
    } catch (err) {
      console.log(err);
      return false;
    }
  }),
  deleteVocab: thunk(async (actions, payload) => {
    try {
      actions.setLoading(true);
      await axios.delete(`/api/card/${payload.username}/${payload.id}`);
      actions.setLoading(false);
      actions.getVocab(payload.username);
      return true;
    } catch (err) {
      console.log(err);
      return false;
    }
  }),
  setLoading: action((state, payload) => {
    state.loading = payload;
  })
};

const store = createStore({
  username,
  vocab
});

ReactDOM.render(
  <React.StrictMode>
    <StoreProvider store={store}>
      <App />
    </StoreProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
