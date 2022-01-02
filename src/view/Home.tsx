import React, { useEffect } from "react"
import toast from "react-hot-toast"
import { signedIn } from "../api/user/User"
import DefaultHome from "../components/home/DefaultHome"
import LoggedInHome from "../components/home/LoggedInHome"
import Snake from "../components/snake/Snake"

const Home = () => {
    useEffect(() => {
        const message = new URL(window.location.toString()).searchParams.get(
            "msg"
        )

        switch (message) {
            case "pswd": {
                toast.success("Your password has successfully been changed!")
                break
            }
        }
    }, [])

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
