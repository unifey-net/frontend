import React, { useEffect } from "react"
import toast from "react-hot-toast"
import { useNavigate } from "react-router-dom"
import { signedIn } from "../api/user/User"
import LoggedInHome from "../components/home/LoggedInHome"
import Snake from "../components/snake/Snake"

const Home = () => {
    const nav = useNavigate()

    useEffect(() => {
        if (!signedIn()) nav("/login")

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
            <LoggedInHome />
            <Snake />
        </>
    )
}

export default Home
