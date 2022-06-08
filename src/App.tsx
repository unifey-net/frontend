import React from "react"
import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom"

import "antd/dist/antd.dark.css"

import Header from "./components/Header"
import Footer from "./components/Footer"

import { useSelector } from "react-redux"
import { isExpired } from "./api/user/User"
import toast, { Toaster } from "react-hot-toast"
import useNotificationPopUp from "./components/notifications/NotificationPopUp"
import { useLiveSocket } from "./api/live/Live"
import MultipleInstances from "./util/MultipleInstances"
import NoConnection from "./util/NoConnection"
import { useAppDispatch } from "./util/Redux"
import { logOut } from "./api/user/redux/auth.redux"
import Home from "./view/Home"
import Community from "./view/community/community/Community"
import Communities from "./view/community/communities/Communities"
import User from "./view/user/User"
import Tos from "./view/Tos"
import Beta from "./view/Beta"
import Messages from "./view/account/Messages"
import Unsubscribed from "./view/Unsubscribed"
import Settings from "./view/settings/Settings"
import Forgot from "./view/settings/Forgot"
import Verify from "./view/settings/Verify"
import Notifications from "./view/account/Notifications"
import Login from "./view/account/Login"
import Logout from "./view/account/Logout"
import Privacy from "./view/Privacy"
import Friends from "./view/account/Friends"
import Register from "./view/account/Register"
import NotFound from "./view/NotFound"
import Create from "./view/community/Create"
import ModerateCommunityPage from "./view/community/community/ModerateCommunityPage"
import About from "./view/about/About"

export default function App() {
    const nav = useNavigate()

    useLiveSocket()
    useNotificationPopUp()

    const dispatch = useAppDispatch()

    console.log(useSelector((store: any) => store.auth.expire))

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

            window.location.reload()
            nav("/login")
            toast.error("Your token has expired!")

            break
        }
    }

    return (
        <BrowserRouter>
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
                    <Routes>
                        <Route path="/">
                            <Route index element={<Home />} />
                            <Route path="c">
                                <Route index element={<Communities />} />
                                <Route path="/create" element={<Create />} />
                                <Route path=":name" element={<Community />} />
                                <Route
                                    path=":name/moderate"
                                    element={<ModerateCommunityPage />}
                                />
                            </Route>
                            <Route path="u">
                                <Route
                                    index
                                    element={<>user list... coming soon :)</>}
                                />
                                <Route path=":name" element={<User />} />
                            </Route>
                            <Route path="/tos" element={<Tos />} />
                            <Route path="/beta" element={<Beta />} />
                            <Route path="/messages" element={<Messages />} />
                            <Route
                                path="/unsubscribe"
                                element={<Unsubscribed />}
                            />
                            <Route path="/settings" element={<Settings />} />
                            <Route path="/forgot" element={<Forgot />} />
                            <Route path="/verify" element={<Verify />} />
                            <Route
                                path="/notifications"
                                element={<Notifications />}
                            />
                            <Route path="/login" element={<Login />} />
                            <Route path="/logout" element={<Logout />} />
                            <Route path="/privacy" element={<Privacy />} />
                            <Route path="/friends" element={<Friends />} />
                            <Route path="/register" element={<Register />} />
                            <Route path="/about" element={<About />} />
                            <Route path="*" element={<NotFound />} />
                        </Route>
                    </Routes>
                </div>

                <Footer />
            </div>
        </BrowserRouter>
    )
}
