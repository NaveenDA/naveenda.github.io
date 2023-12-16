// simple hello world using nextjs
import React from "react";
import ReactDOM from "react-dom";
import Home from "./pages/home";

import "./styles/main.css";
import White from "./pages/white";
import EarthCanvas from "./earth";

ReactDOM.render(
  <React.StrictMode>
   <White />
  </React.StrictMode>,
  document.getElementById("root")
);
