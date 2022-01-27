import React from "react"
import ErrorPage from "./ErrorPage"
import { useAppDispatch } from "./Redux"
import { logOut } from "../api/user/redux/auth.redux"

const MultipleInstances = () => {
    const dispatch = useAppDispatch()

    const signOut = () => {
        dispatch(logOut())
        window.location.reload()
    }

    return (
        <ErrorPage
            content={
                <p>
                    We currently don't support more than one Unifey instance at
                    once due to{" "}
                    <a
                        href={
                            "https://github.com/unifey-net/frontend/issues/35"
                        }
                    >
                        this issue
                    </a>
                    .
                    <br />
                    <button onClick={() => signOut()}>Sign out</button>
                </p>
            }
            code={2035}
        />
    )
}

export default MultipleInstances
