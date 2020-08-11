import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { useEffect } from "react";
import { useStoreActions, useStoreState } from "easy-peasy";

import Login from "./components/login";
import Navbar from "./components/navbar";
import Home from "./pages/home";
import Vocab from "./pages/vocab";
import Add from "./pages/vocab.add";
import Game from "./pages/game";

export default function App() {
  const { username } = useStoreState(state => state.username);
  const { getUsername } = useStoreActions(actions => actions.username);
  const { getVocab } = useStoreActions(actions => actions.vocab);

  useEffect(() => {
    getUsername().then(res => {
      getVocab(res);
    });
  }, [getUsername, getVocab]);

  return (
    <BrowserRouter>
      <nav>
        <Navbar />
      </nav>
      <section>{username === null ? <Login /> : <Router />}</section>
    </BrowserRouter>
  );
}

function Router() {
  return (
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/vocab" component={Vocab} />
      <Route path="/vocab/add" component={Add} />
      <Route path="/game" component={Game} />
    </Switch>
  );
}
