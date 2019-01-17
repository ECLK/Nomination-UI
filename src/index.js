import React from "react";
import ReactDOM from "react-dom";
import axios from "axios";

import * as serviceWorker from "./serviceWorker";
import { API_BASE_URL, ELECTION_ID } from "./config";

import Index from "./pages/index";

axios.defaults.baseURL = API_BASE_URL;
axios.defaults.headers.post["Content-Type"] =
  "application/x-www-form-urlencoded";

ReactDOM.render(<Index />, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();

// Set session data
sessionStorage.setItem("election_id", ELECTION_ID);
