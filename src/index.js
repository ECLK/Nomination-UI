import React from "react";
import ReactDOM from "react-dom";
import axios from "axios";

import App from "./App";
import { API_BASE_URL, ELECTION_ID } from "./config";
import * as serviceWorker from "./serviceWorker";

// Set axios config.
axios.defaults.baseURL = API_BASE_URL;
axios.defaults.headers.post["Content-Type"] =
  "application/x-www-form-urlencoded";

ReactDOM.render(<App />, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();

// Set session data
sessionStorage.setItem("election_id", ELECTION_ID);
