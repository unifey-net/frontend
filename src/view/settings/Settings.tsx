import React, { useState, useEffect } from "react"
import { signedIn } from "../../api/user/User"
import { useDispatch, useSelector } from "react-redux"
import history from "../../api/History"
import { Input, Divider, Tooltip, message, Spin } from "antd"
import {
    CheckCircleOutlined,
    LoadingOutlined,
    WarningOutlined,
} from "@ant-design/icons"
import { getEmailVerificationStatus, getEmail } from "../../api/user/Email"
import { API } from "../../api/ApiHandler"
import { updateName, verifyAccount } from "../../redux/actions/auth.actions"
import SettingsProperty from "../../components/settings/properties/PasswordProperty"
import UnverifiedWarning from "../../components/settings/UnverifiedWarning"
import styled from "styled-components"
import toast from "react-hot-toast"
import UsernameProperty from "../../components/settings/properties/UsernameProperty"
import PasswordProperty from "../../components/settings/properties/PasswordProperty"
import EmailProperty from "../../components/settings/properties/EmailProperty"

const SettingsStyle = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
`

const Settings = () => {
    let dispatch = useDispatch()
    let self = useSelector((state: any) => state.auth.user)
    /**
     * Update the username.
     */
    const updateUsername = async () => {
        let username = (document.getElementById("username") as HTMLInputElement)
            .value

        let form = new FormData()

        form.append("username", username)

        let request = await API.put("/user/name", form)

        switch (request.status) {
            case 200: {
                return
            }

            case 429: {
                return
            }


        }

        if (request.status === 200) {
            message.success("Your username has been updated.")

            dispatch(updateName(username))
            return ""
        } else {
            return request.data.payload
        }
    }

    /**
     * Update the password.
     */
    const updatePassword = async () => {
        let password = (document.getElementById("password") as HTMLInputElement)
            .value

        let form = new FormData()

        form.append("password", password)

        let request = await API.put("/user/password", form)

        if (request.status === 200) {
            message.success("Your password has been updated.")
            return ""
        } else {
            return request.data.payload
        }
    }

    if (!signedIn()) {
        history.push("/")
        message.error("You aren't signed in!")
        return
    }


    return (
        <SettingsStyle>
            {!self.verified && (
                <UnverifiedWarning />
            )}

            <div>
                <h1>Account Settings</h1>
                <p>Modify your Unifey account settings.</p>

                <br />

                <EmailProperty/>
                <Divider />
                <PasswordProperty/>
                <Divider />
                <UsernameProperty/>
            </div>
        </SettingsStyle>
    )
}

export default {
    exact: true,
    path: "/settings",
    component: Settings,
}