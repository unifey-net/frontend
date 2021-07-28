import React from "react"
import { signedIn } from "../api/user/User"
import DefaultHome from "../components/home/DefaultHome"
import LoggedInHome from "../components/home/LoggedInHome"
import Snake from "../components/snake/Snake"

const Home = () => {
    return (
        <>
            { signedIn() ? <LoggedInHome/> : <DefaultHome/> }
            <Snake/>
        </>
    )
}

export default {
    exact: true,
    path: "/",
    component: Home,
}
