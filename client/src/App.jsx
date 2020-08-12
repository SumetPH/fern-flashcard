import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUsername, getVocab } from "./redux/actions";

import Login from "./components/login";
import Navbar from "./components/navbar";
import Home from "./pages/home";
import Vocab from "./pages/vocab";
import Add from "./pages/vocab.add";
import Game from "./pages/game";

export default function App() {
  const { username } = useSelector(state => state.usernameReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUsername()).then(username => {
      dispatch(getVocab(username));
    });
  }, [dispatch]);

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
