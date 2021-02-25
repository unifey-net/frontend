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
import SettingsProperty from "../../components/settings/SettingsProperty"
import UnverifiedWarning from "../../components/settings/UnverifiedWarning"

export default function Settings() {
    let dispatch = useDispatch()
    let self = useSelector((state: any) => state.auth.user)

    let [attempts, setAttempts] = useState(1)
    let [email, setEmail] = useState("")

    /**
     * Update the username.
     */
    const updateUsername = async () => {
        let username = (document.getElementById("username") as HTMLInputElement).value

        let form = new FormData()

        form.append("username", username)

        let request = await API.put("/user/name", form)

        if (request.status === 200) {
            message.success("Your username has been updated.")

            dispatch(updateName(username))
        } else {
            message.error("There was an issue with that username.")
        }
    }

    /**
     * Update the password.
     */
    const updatePassword = async () => {
        let password = (document.getElementById("password") as HTMLInputElement).value

        let form = new FormData()

        form.append("password", password)

        let request = await API.put("/user/password", form)

        if (request.status === 200) {
            message.success("Your password has been updated.")
        } else {
            message.error("There was an issue with that password.")
        }
    }

    /**
     * Update the email.
     */
    const updateEmail = async () => {
        let email = (document.getElementById("email") as HTMLInputElement).value

        let form = new FormData()

        form.append("email", email)

        let request = await API.put("/user/email", form)

        if (request.status === 200) {
            message.success(
                "Your email has been updated. A verification request has been sent."
            )
            dispatch(verifyAccount(false))
            setEmail(email)
        } else {
            message.error("There was an issue with that email.")
        }
    }

    useEffect(() => {
        const loadAttempts = async () => {
            let request = await getEmailVerificationStatus()

            if (request !== null && request.status === 200) {
                setAttempts(request.data.payload)
            }
        }

        const loadEmail = async () => {
            let request = await getEmail()

            if (request !== null && request.status === 200) {
                setEmail(request.data.payload)
            }
        }

        loadEmail()

        if (!self.verified) {
            loadAttempts()
        }
    }, [self.verified])

    if (!signedIn()) {
        history.push("/")
        message.error("You aren't signed in!")
        return
    }

    return (
        <div className="flex flex-col items-center justify-center">
            {!self.verified && (
                <UnverifiedWarning
                    addAttempt={() => setAttempts(prev => prev + 1)}
                    attempts={attempts}
                />
            )}

            <div>
                <h1 className="text-2xl">Account Settings</h1>
                <p>Modify your Unifey account settings.</p>

                <br />

                <div className="flex flex-col gap-4">
                    {email !== "" && (
                        <SettingsProperty
                            name={"Email"}
                            input={
                                <Input
                                    addonAfter={
                                        self.verified ? (
                                            <Tooltip
                                                title={
                                                    "This email is verified."
                                                }
                                            >
                                                <CheckCircleOutlined />
                                            </Tooltip>
                                        ) : (
                                            <Tooltip
                                                title={
                                                    "This email is not verified."
                                                }
                                            >
                                                <WarningOutlined />
                                            </Tooltip>
                                        )
                                    }
                                    defaultValue={email}
                                    id="email"
                                    disabled={!self.verified}
                                />
                            }
                            update={updateEmail}
                        />
                    )}

                    {email === "" && <Spin indicator={<LoadingOutlined />} />}
                </div>

                <Divider />

                <SettingsProperty
                    name={"Password"}
                    input={
                        <Input
                            id="password"
                            type="password"
                            disabled={!self.verified}
                        />
                    }
                    update={updatePassword}
                />

                <Divider />

                <SettingsProperty
                    name={"Username"}
                    input={
                        <Input
                            id="username"
                            disabled={!self.verified}
                            defaultValue={self.username}
                        />
                    }
                    update={updateUsername}
                />
            </div>
        </div>
    )
}
