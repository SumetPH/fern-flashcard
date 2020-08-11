import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { AppContext } from "./lib/context";
import { useEffect, useState } from "react";

import Login from "./components/login";
import Navbar from "./components/navbar";

import Home from "./pages/home";

import Vocab from "./pages/vocab/index";
import Add from "./pages/vocab/add";

import Game from "./pages/game/index";

export default function Router() {
  const [username, setUsername] = useState();

  useEffect(() => {
    setUsername(localStorage.getItem("username"));
  }, []);

  return (
    <AppContext.Provider value={{ username, setUsername }}>
      {username === null ? (
        <Login />
      ) : (
        <BrowserRouter>
          <Navbar />
          <Switch>
            <Route exact path="/" component={Home} />

            <Route exact path="/vocab" component={Vocab} />
            <Route path="/vocab/add" component={Add} />

            <Route path="/game" component={Game} />
          </Switch>
        </BrowserRouter>
      )}
    </AppContext.Provider>
  );
}
