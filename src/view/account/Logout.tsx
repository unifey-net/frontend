import React from "react"
import { signedIn, logout } from "../../api/user/User"
import { Redirect } from "react-router-dom"
import { message } from "antd";

export default () => {
    if (!signedIn())
        return <Redirect to="/login"/>

    logout();

    window.location.reload()

    return (<Redirect to="/"/>)
}