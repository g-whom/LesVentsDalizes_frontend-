import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";
import { BrowserRouter } from "react-router-dom";


ReactDOM.render(<App/>,document.querySelector("#root"));

/*
ReactDOM.render(
    <BrowserRouter basename="/localhost">
        <App />
    </BrowserRouter>,
    document.querySelector("#root")
);
*/