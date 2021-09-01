import { config } from "dotenv";
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import CoreLayout from "./common/layouts/CoreLayout";
import Routes from "./routes";
import "./styles/_main.scss";
config();

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <CoreLayout>
        <Routes />
      </CoreLayout>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
