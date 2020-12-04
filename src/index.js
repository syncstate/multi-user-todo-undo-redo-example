import React from "react";
import { createDocStore } from "@syncstate/core";
import history from "@syncstate/history";
import { Provider } from "@syncstate/react";
import ReactDOM from "react-dom";
import App from "./App.js";
import "./index.css";
import io from "socket.io-client";
import reportWebVitals from "./reportWebVitals";
import * as remote from "@syncstate/remote-client";

const store = createDocStore({ todos: [] }, [
  history.createInitializer(),
  remote.createInitializer(),
]);

//enable remote plugin
store.dispatch(remote.enableRemote("/todos"));

//enabel history plugin
store.dispatch(history.enable("/todos"));

//setting up socket connection with the server
let socket = io.connect("http://localhost:8000");

// send request to get patches every time page reloads
socket.emit("fetchDoc", "/todos");

//observe changes on store
store.observe(
  "doc",
  "/todos",
  (todos, change) => {
    if (!change.origin) {
      //send json patch to the server
      socket.emit("change", "/todos", change);
    }
  },
  Infinity
);

//get patches from server and dispatch
socket.on("change", (path, patch) => {
  store.dispatch(remote.applyRemote(path, patch));
});

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
