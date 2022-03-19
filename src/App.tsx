import React from "react"
import { Route, Router, Switch } from "react-router-dom"

import "antd/dist/antd.dark.min.css"

import history from "./api/History"
import Header from "./components/Header"
import Footer from "./components/Footer"

import { useDispatch, useSelector } from "react-redux"
import { isExpired } from "./api/user/User"
import toast, { Toaster } from "react-hot-toast"
import useNotificationPopUp from "./components/notifications/NotificationPopUp"
import Pages from "./util/Pages"
import { useLiveSocket } from "./api/live/Live"
import MultipleInstances from "./util/MultipleInstances"
import NoConnection from "./util/NoConnection"
import { useAppDispatch } from "./util/Redux"
import { logOut } from "./api/user/redux/auth.redux"

export default function App() {
    useLiveSocket()
    useNotificationPopUp()

    const dispatch = useAppDispatch()

    if (isExpired()) dispatch(logOut())

    const socketError = useSelector((store: any) => store.live.error)

    switch (socketError) {
        case 1008: {
            return <MultipleInstances />
        }

        case 1006: {
            return <NoConnection />
        }

        // token has expired
        case 4011: {
            dispatch(logOut())

            toast.error("Your token has expired!")

            window.location.reload()

            history.push("")
            break;
        }
    }

    return (
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
    )
}
