import React, { useState, useEffect } from "react"
import { signedIn } from "../../api/user/User"
import { useDispatch, useSelector } from "react-redux"
import { Input, Divider, Tooltip, message, Spin } from "antd"
import UnverifiedWarning from "../../components/settings/UnverifiedWarning"
import styled from "styled-components"
import UsernameProperty from "../../components/settings/properties/UsernameProperty"
import PasswordProperty from "../../components/settings/properties/PasswordProperty"
import EmailProperty from "../../components/settings/properties/EmailProperty"
import { useNavigate } from "react-router-dom"

const SettingsStyle = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
`

const Settings = () => {
    const nav = useNavigate()
    let self = useSelector((state: any) => state.auth.user)

    if (!signedIn()) {
        nav("/")
        message.error("You aren't signed in!")
    }

    return (
        <SettingsStyle>
            {!self.verified && <UnverifiedWarning />}

            <div>
                <h1>Account Settings</h1>
                <p>Modify your Unifey account settings.</p>

                <br />

                <EmailProperty />
                <Divider />
                <PasswordProperty />
                <Divider />
                <UsernameProperty />
            </div>
        </SettingsStyle>
    )
}

export default Settings
