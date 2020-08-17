import React from "react"
import { signedIn, logout } from "../../api/user/User"
import { Redirect } from "react-router-dom"
import { message } from "antd";

export default function Logout() {
    if (!signedIn())
        return <Redirect to="/login"/>

    logout();

    message.info("You have been signed out!");

    return (<Redirect to="/"/>)
}