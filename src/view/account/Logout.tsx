import React from "react"
import { signedIn, logout } from "../../api/user/User"
import { Redirect } from "react-router-dom"

/**
 * The /logout page.
 */
const Logout = () => {
    if (!signedIn()) return <Redirect to="/login" />

    logout()

    window.location.reload()

    return <Redirect to="/" />
}

export default {
    exact: true,
    path: "/logout",
    component: Logout,
}
