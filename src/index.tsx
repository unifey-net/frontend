import React from "react"
import ReactDOM from "react-dom"
import * as serviceWorker from "./serviceWorker"

import { Provider } from "react-redux"
import App from "./App"
import store from "./redux/store"
import { BASE_URL, VERSION } from "./api/ApiHandler"
import { ThemeProvider } from "styled-components"
import theme from "./util/Theme"
import GlobalStyle from "./util/GlobalStyle"
import { Toaster } from "react-hot-toast"
import { IconContext } from "react-icons/lib"

console.log(`Unifey ${VERSION} (env: ${process.env.NODE_ENV}, base url: ${BASE_URL})`)
console.log("DO NOT PASTE ANYTHING IN THE CONSOLE.")

ReactDOM.render(
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
                <App/>
            </IconContext.Provider>
        </ThemeProvider>
    </Provider>,
    document.getElementById("root")
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
