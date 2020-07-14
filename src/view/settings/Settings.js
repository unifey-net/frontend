import React, { useState, useEffect } from "react";
import { signedIn, getSelf } from "../../api/user/User";
import { useDispatch } from "react-redux";
import { alertError, alertInfo } from "../../redux/actions/alert.actions";
import history from "../../api/History";
import { Input, Alert, Button, Divider, Tooltip, message, Spin } from "antd";
import { CheckCircleOutlined, LoadingOutlined, WarningOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { getEmailVerificationStatus, resend, getEmail } from "../../api/user/Email";
import { API } from "../../api/ApiHandler";
import { updateName, verifyAccount } from "../../redux/actions/auth.actions";

export default function Settings() {
    let dispatch = useDispatch();

    let [self, setSelf] = useState({})
    let [attempts, setAttempts] = useState(1)
    let [email, setEmail] = useState("")
    let [loading, setLoading] = useState({
        email: false,
        username: false,
        password: false,
        resend: false
    })

    /**
     * Resend the email.
     */
    const resendEmail = async () => {
        if (attempts >= 10) {
            message.error("You have reached the limit for resends. Please contact our support.")
            return
        }

        setLoading(prev => { 
            return {
                ...prev,
                resend: true
            }
        })

        message.success("Email has been sent! Check your inbox.", 2.5);
        setAttempts((prev) => prev + 1)

        setLoading((prev) => {
            return {
                ...prev,
                resend: false,
            };
        });
    }

    /**
     * Update the username.
     */
    const updateUsername = async () => {
        setLoading((prev) => {
            return {
                ...prev,
                username: true,
            };
        });

        let username = document.getElementById("username").value

        let form = new FormData()

        form.append("username", username)

        let request = await API.put("/user/name", form)

        if (request.status === 200) {
            message.success("Your username has been updated.");

            dispatch(updateName(username))
        } else {
            message.error("There was an issue with that username.")
        }

        setLoading((prev) => {
            return {
                ...prev,
                username: false,
            };
        });
    }

    /**
     * Update the password.
     */
    const updatePassword = async () => {
        setLoading((prev) => {
            return {
                ...prev,
                password: true,
            };
        });

        let password = document.getElementById("password").value;

        let form = new FormData()

        form.append("password", password);

        let request = await API.put("/user/password", form);

        if (request.status === 200) {
            message.success("Your password has been updated.");
        } else {
            message.error("There was an issue with that password.")
        }

        setLoading((prev) => {
            return {
                ...prev,
                password: false,
            };
        });
    }

    /**
     * Update the email.
     */
    const updateEmail = async () => {
        setLoading((prev) => {
            return {
                ...prev,
                email: true,
            };
        });

        let email = document.getElementById("email").value;

        let form = new FormData()

        form.append("email", email);

        let request = await API.put("/user/email", form);

        if (request.status === 200) {
            message.success("Your email has been updated. A verification request has been sent.");
            dispatch(verifyAccount(false));
            setEmail(email)
        } else {
            message.error("There was an issue with that email.")
        }

        setLoading((prev) => {
            return {
                ...prev,
                email: false,
            };
        });
    }

    useEffect(() => {
        const loadSelf = async () => {
            setSelf(await getSelf())
        }

        const loadAttempts = async () => {
            let request = await getEmailVerificationStatus()

            if (request.status === 200) {
                setAttempts(request.data.payload)
            }
        }

        const loadEmail = async () => {
            let request = await getEmail()

            if (request.status === 200) {
                setEmail(request.data.payload)
            }
        }

        loadSelf()
        loadEmail()

        if (!self.verified) {
            loadAttempts()
        }
    }, [])

    if (!signedIn()) {
        history.push("/");
        dispatch(alertError("You aren't signed in!"));
        return;
    }
  
    return (
        <div className="flex flex-col items-center justify-center">
            {!self.verified && (
                <Alert
                    style={{
                        marginBottom: "32px",
                    }}
                    message="Your email is not verified."
                    type="error"
                    description={
                        <p>
                            This limits your account is various ways. <br />{" "}
                            Including being able to change your: username,
                            password and email. <br /> To learn more, visit{" "}
                            <Link to="/unverified">here</Link>.

                            <br/>

                            Didn't receive the email?

                            <Tooltip
                                title={`You have ${
                                    10 - attempts
                                } remaining attempts.`}
                            >
                                <Button
                                    type="link"
                                    loading={loading.resend}
                                    onClick={resendEmail}
                                >
                                    Resend {attempts}/10
                                </Button>
                            </Tooltip>
                        </p>
                    }
                />
            )}

            <div>
                <h1 className="text-2xl">Account Settings</h1>
                <p>Modify your Unifey account settings.</p>

                <br />

                <div className="flex flex-col gap-4">
                    <h3 className="text-lg">Email</h3>

                    {email !== "" && (
                        <>
                            <Input
                                addonAfter={
                                    self.verified ? (
                                        <Tooltip
                                            title={"This email is verified."}
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
                            />

                            <Button
                                ghost
                                loading={loading.email}
                                disabled={!self.verified}
                                onClick={updateEmail}
                            >
                                Update email
                            </Button>
                        </>
                    )}

                    {email === "" && <Spin indicator={<LoadingOutlined />} />}
                </div>

                <Divider />

                <div className="flex flex-col gap-4">
                    <h3 className="text-lg">Password</h3>

                    <Input type="password" id="password" />

                    <Button
                        ghost
                        loading={loading.password}
                        disabled={!self.verified}
                        onClick={updatePassword}
                    >
                        Update password
                    </Button>
                </div>

                <Divider />

                <div className="flex flex-col gap-4">
                    <h3 className="text-lg">Username</h3>

                    <Input id="username" />

                    <Button
                        ghost
                        loading={loading.username}
                        onClick={updateUsername}
                        disabled={!self.verified}
                    >
                        Update username
                    </Button>
                </div>
            </div>
        </div>
    );
}
