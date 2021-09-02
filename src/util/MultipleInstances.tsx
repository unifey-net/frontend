import React from "react"
import { useDispatch } from "react-redux"
import styled from "styled-components"
import { logOut } from "../redux/actions/auth.actions"

const Style = styled.div`
    text-align: center;
    margin-top: 2rem;

    button {
        color: white;
        cursor: pointer;
        background-color: transparent;
    }
`

const MultipleInstances = () => {
    const dispatch = useDispatch()

    const signOut = () => {
        dispatch(logOut())
        window.location.reload()
    }

    return (
        <Style>
            <p>
                We currently don't support more than one Unifey instance at once
                due to{" "}
                <a
                    href={"https://github.com/unifey-net/frontend/issues/35"}
                >this issue</a>
                .
                <br/>
                <button onClick={() => signOut()}>Sign out</button>
            </p>
        </Style>
    )
}

export default MultipleInstances