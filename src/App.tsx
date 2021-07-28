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
import { useNotificationSocket } from "./api/notification/NotificationsSocket"
import useNotificationPopUp from "./components/notifications/NotificationPopUp"
import ToastTheme from "./api/ToastTheme"
import Pages from "./util/Pages"

export default function App() {
    useNotificationSocket() // initialize notification socket
    useNotificationPopUp()

    const dispatch = useDispatch()

    if (isExpired()) dispatch(logOut())

    return (
        <ThemeProvider theme={theme}>
            <GlobalStyle />
            <Router history={history}>
                <div className="page-container">
                    <Header />

                    <Toaster position="top-right" toastOptions={ToastTheme} />

                    <div className="content-container">
                        <Switch>
                            {Pages.map(({ path, component, exact }) => (
                                <Route
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
        </ThemeProvider>
    )
}
