import React from "react"
import { Route, Router, Switch } from "react-router-dom"

import "antd/dist/antd.dark.css"

import history from "./api/History"
import Header from "./components/Header"
import Footer from "./components/Footer"

import { useDispatch } from "react-redux"
import { isExpired } from "./api/user/User"
import { logOut } from "./redux/actions/auth.actions"
import { Toaster } from "react-hot-toast"
import { ThemeProvider } from "styled-components"
import GlobalStyle from "./util/GlobalStyle"
import theme from "./util/Theme"
import useNotificationPopUp from "./components/notifications/NotificationPopUp"
import Pages from "./util/Pages"
import { IconContext } from "react-icons/lib"
import { useLiveSocket } from "./api/live/Live"

export default function App() {
    useLiveSocket()
    useNotificationPopUp()

    const dispatch = useDispatch()

    if (isExpired()) dispatch(logOut())

    return (
        <ThemeProvider theme={theme}>
            <GlobalStyle />

            <IconContext.Provider
                value={{ style: { verticalAlign: "middle" } }}
            >
                <Router history={history}>
                    <div className="page-container">
                        <Header />

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

                        <div className="content-container">
                            <Switch>
                                {Pages.map(({ path, component, exact }, index) => (
                                    <Route
                                        key={index}
                                        path={path}
                                        component={component}
                                        exact={exact}
                                    />
                                ))}
                            </Switch>
                        </div>

                        <Footer />
                    </div>
                </Router>
            </IconContext.Provider>
        </ThemeProvider>
    )
}
