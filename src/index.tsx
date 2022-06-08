import React from "react"
import ReactDOM from "react-dom"
import * as serviceWorker from "./serviceWorker"

import { Provider } from "react-redux"
import App from "./App"
import store from "./redux/store"
import { VERSION } from "./api/ApiHandler"
import { ThemeProvider } from "styled-components"
import theme from "./util/Theme"
import GlobalStyle from "./util/GlobalStyle"
import { Toaster } from "react-hot-toast"
import { IconContext } from "react-icons/lib"
import { createRoot } from "react-dom/client"
import { BrowserRouter } from "react-router-dom"

console.log(`Unifey ${VERSION} (env: ${process.env.NODE_ENV})`)

console.log(`%cSTOP!`, "color:red;font-size:64px")
console.log(
    "%cPasting anything here can give users full access to your account.",
    "color:red;font-size:28px;"
)

const container = document.getElementById("root")
const root = createRoot(container!)
root.render(
    <Provider store={store}>
        <ThemeProvider theme={theme}>
            <GlobalStyle />
            <Toaster
                position="top-right"
                toastOptions={{
                    style: {
                        borderRadius: "10px",
                        background: "#333",
                        color: "#fff",
                    },
                }}
            />

            <IconContext.Provider
                value={{ style: { verticalAlign: "middle" } }}
            >
                <BrowserRouter>
                    <App />
                </BrowserRouter>
            </IconContext.Provider>
        </ThemeProvider>
    </Provider>
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
