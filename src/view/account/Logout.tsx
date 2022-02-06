import React from "react"
import { signedIn } from "../../api/user/User"
import { Redirect } from "react-router-dom"
import { useAppDispatch } from "../../util/Redux"
import { logOut } from "../../api/user/redux/auth.redux"

/**
 * The /logout page.
 */
const Logout = () => {
    const dispatch = useAppDispatch()

    if (!signedIn()) return <Redirect to="/login" />

    dispatch(logOut())

    window.location.reload()

    return <Redirect to="/" />
}

export default {
    exact: true,
    path: "/logout",
    component: Logout,
}
