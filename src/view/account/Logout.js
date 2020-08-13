import React from "react"
import { signedIn, logout } from "../../api/user/User"
import { Redirect } from "react-router-dom"
import { useDispatch } from "react-redux"
import { message } from "antd";

export default function Logout() {
    let dispatch = useDispatch();

    if (!signedIn())
        return <Redirect to="/login"/>

    logout();

    message.info("You have been signed out!");

    return (<Redirect to="/"/>)
}