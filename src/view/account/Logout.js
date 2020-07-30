import React from "react"
import { signedIn, logout } from "../../api/user/User"
import { Redirect } from "react-router-dom"
import { useDispatch } from "react-redux"
import { alertInfo } from "../../redux/actions/alert.actions"

export default function Logout() {
    let dispatch = useDispatch();

    if (!signedIn())
        return <Redirect to="/login"/>

    logout();

    dispatch(alertInfo("You have been signed out!"));
    
    return (<Redirect to="/"/>)
}