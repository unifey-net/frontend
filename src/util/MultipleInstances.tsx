import React from "react"
import { useDispatch } from "react-redux"
import { logOut } from "../redux/actions/auth.actions"
import ErrorPage from "./ErrorPage"

const MultipleInstances = () => {
    const dispatch = useDispatch()

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
