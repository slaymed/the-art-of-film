import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import axios from "axios";

import "./index.css";
import "./resets.css";

import * as serviceWorker from "./serviceWorker";

import App from "./App";

import store from "./store";

axios.defaults.withCredentials = true;

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);

root.render(
    <Provider store={store}>
        <React.StrictMode>
            <App />
        </React.StrictMode>
    </Provider>
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
