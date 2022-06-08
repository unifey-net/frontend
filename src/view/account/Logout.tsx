import React, { useEffect } from "react"
import { signedIn } from "../../api/user/User"
import { useAppDispatch } from "../../util/Redux"
import { logOut } from "../../api/user/redux/auth.redux"
import { Spin } from "antd"
import styled from "styled-components"
import { useNavigate } from "react-router-dom"

const LogoutPage = styled.div`
    display: flex;
    flex-direction: row;
    gap: 8px;
`

/**
 * The /logout page.
 */
const Logout = () => {
    const nav = useNavigate()
    const dispatch = useAppDispatch()

    useEffect(() => {
        if (signedIn()) {
            dispatch(logOut())

            window.location.reload()
        } else nav("/login")
    }, [])

    return (
        <LogoutPage>
            <Spin />
            <p>You should be redirected shortly...</p>
        </LogoutPage>
    )
}

export default Logout
