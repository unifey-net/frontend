import React from "react"
import ReactDOM from "react-dom"
import * as serviceWorker from "./serviceWorker"

import { Provider } from "react-redux"
import App from "./App"
import store from "./redux/store"
import { VERSION } from "./api/ApiHandler"

console.log(`Unifey ${VERSION}: ${process.env.NODE_ENV}`)

console.log(`%cSTOP!`, "color:red;font-size:64px")
console.log(
    "%cPasting anything here can give users full access to your account.",
    "color:red;font-size:28px;"
)

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById("root")
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
