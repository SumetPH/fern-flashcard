import React from "react";
import ReactDOM from "react-dom";
import Router from "./router";

import "./css/global.css";
import "./css/bulma.min.css";
import "./css/hover.min.css";

ReactDOM.render(
  <React.StrictMode>
    <Router />
  </React.StrictMode>,
  document.getElementById("root")
);
