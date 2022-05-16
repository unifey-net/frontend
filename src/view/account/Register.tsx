import React, { useState } from "react"
import ReCAPTCHA from "react-google-recaptcha"
import { login, signedIn } from "../../api/user/User"
import { Redirect } from "react-router-dom"
import { Form, Input, Button, Checkbox, Alert, Divider } from "antd"
import history from "../../api/History"
import { Link } from "react-router-dom"

import { Store } from "antd/lib/form/interface"
import { connect, useDispatch } from "react-redux"
import { COMPLETE } from "../../api/util/Status"
import DefaultContainer from "../../components/DefaultContainer"
import styled from "styled-components"
import { API } from "../../api/ApiHandler"
import GoogleLogin from "react-google-login"
import { useAppDispatch } from "../../util/Redux"
import { logIn } from "../../api/user/redux/auth.redux"

const RegisterForm = styled.div`
    min-width: 300px;
    max-width: 300px;
    .error {
        margin-bottom: 16px;
    }

    .remember-container {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
    }
`

type ConnectionState = {
    connected: boolean
    authToken: string
    type: "GOOGLE" | ""
    email: string
}

/**
 * The /register page.
 */
const Register = () => {
    const dispatch = useAppDispatch()

    const [ref, setRef] = useState<ReCAPTCHA>()

    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")

    const [
        { connected, authToken, type, email: connectionEmail },
        setConnection,
    ] = useState({
        connected: false,
        authToken: "",
        type: "",
        email: "",
    } as ConnectionState)

    let [captcha, setCaptcha] = useState("")
    let [loading, setLoading] = useState(false)
    let [error, setError] = useState("")

    const handleGoogle = (obj: any) => {
        setLoading(true)
        const email = obj.profileObj.email

        setConnection({
            connected: true,
            authToken: obj.accessToken,
            type: "GOOGLE",
            email,
        })

        const name = obj.profileObj.name.replace(" ", "")

        setUsername(name)
        setEmail(email)

        setLoading(false)
    }

    const loginForm = async (values: Store) => {
        setLoading(true)

        const { username, password, tos, email } = values

        const form = new FormData()

        form.append("username", username)
        form.append("password", password)
        form.append("tos", tos)
        form.append("captcha", captcha)

        if (connected) {
            form.append("autoConToken", authToken)
            form.append("autoConType", type)
            form.append("email", connectionEmail)
        } else {
            form.append("email", email)
        }

        const response = await API.put("/user/register", form)

        if (response.status === 200) {
            dispatch(logIn({ token: response.data.token }))

            history.push("/")
            window.location.reload()
        } else {
            ref?.reset()
            setError(response.data.payload)
        }

        setLoading(false)
    }

    if (signedIn()) return <Redirect to="/" />

    return (
        <DefaultContainer>
            <h1>Register</h1>

            <RegisterForm>
                {error !== "" && (
                    <Alert
                        type="error"
                        showIcon
                        message={error}
                        className="error"
                    />
                )}

                <Form
                    name="basic"
                    initialValues={{
                        remember: false,
                    }}
                    onFinish={loginForm}
                    onFinishFailed={() => {}}
                >
                    <Form.Item
                        label="Username"
                        name="username"
                        rules={[
                            {
                                required: true,
                                message: "Please input your username!",
                            },
                            {
                                pattern: /^[A-Za-z0-9-_]{2,16}\w+$/,
                                message:
                                    "A username can only have alphanumerics, dashes and underscores!",
                            },
                            {
                                min: 3,
                                max: 16,
                                message:
                                    "A name must be between 3 and 16 characters!",
                            },
                        ]}
                    >
                        <Input
                            value={username}
                            onChange={val => setUsername(val.target.value)}
                            id="username"
                        />
                    </Form.Item>

                    <Form.Item
                        name="email"
                        label="Email"
                        rules={[
                            {
                                type: "email",
                            },
                            {
                                required: !connected,
                                message: "Please input your email!",
                            },
                        ]}
                    >
                        <Input
                            value={email}
                            onChange={val => setEmail(val.target.value)}
                            disabled={connected}
                        />
                    </Form.Item>

                    <Form.Item
                        label="Password"
                        name="password"
                        rules={[
                            {
                                required: true,
                                message: "Please input your password!",
                            },
                            {
                                min: 8,
                                max: 128,
                                message:
                                    "Your password must be over 8 characters!",
                            },
                            {
                                pattern:
                                    /^(?=.*[a-z])(?=.*[A-Z])(?=.*[$&+,:;=?@#|'<>.^*()%!-])[A-Za-z\d$&+,:;=?@#|'<>.^*()%!-]{8,128}$/,
                                message:
                                    "Your password must have a lowercase, an uppercase, and a special character!",
                            },
                        ]}
                    >
                        <Input.Password id="password" />
                    </Form.Item>

                    <Form.Item
                        name="confirm"
                        label="Confirm Password"
                        dependencies={["password"]}
                        hasFeedback
                        rules={[
                            {
                                required: true,
                                message: "Please confirm your password!",
                            },
                            ({ getFieldValue }) => ({
                                validator(_, value) {
                                    if (
                                        !value ||
                                        getFieldValue("password") === value
                                    ) {
                                        return Promise.resolve()
                                    }
                                    return Promise.reject(
                                        new Error(
                                            "The two passwords that you entered do not match!"
                                        )
                                    )
                                },
                            }),
                        ]}
                    >
                        <Input.Password />
                    </Form.Item>

                    <Form.Item
                        name="tos"
                        valuePropName="checked"
                        rules={[
                            {
                                validator: (_, value) =>
                                    value
                                        ? Promise.resolve()
                                        : Promise.reject(
                                              new Error(
                                                  "You must accept the TOS and Privacy Policy!"
                                              )
                                          ),
                            },
                        ]}
                    >
                        <Checkbox>
                            I accept the <Link to={"/tos"}>TOS</Link> and{" "}
                            <Link to={"/privacy"}>Privacy Policy</Link>.
                        </Checkbox>
                    </Form.Item>

                    {process.env.NODE_ENV === "production" && (
                        <Form.Item>
                            <ReCAPTCHA
                                ref={(ref: ReCAPTCHA) => setRef(ref)}
                                sitekey="6Le268IZAAAAAHyH4NpDlBDkOHwbj-HAAf5QWRkH"
                                theme="dark"
                                onChange={token =>
                                    setCaptcha(token === null ? "" : token)
                                }
                            />
                        </Form.Item>
                    )}

                    <div className="remember-container">
                        <Form.Item>
                            <div className="flex flex-row justify-center items-center">
                                <Button
                                    type="primary"
                                    htmlType="submit"
                                    loading={loading}
                                >
                                    Register
                                </Button>
                            </div>
                        </Form.Item>

                        <p>
                            or <Link to={"/login"}>login</Link>.
                        </p>
                    </div>
                    <Divider />
                </Form>
            </RegisterForm>

            <div>
                <GoogleLogin
                    clientId="947582734339-etrjdvbs4vvnibji6hp07v36evlitanu.apps.googleusercontent.com"
                    buttonText="Login with Google"
                    onSuccess={handleGoogle}
                    onFailure={() =>
                        setError(
                            "There was an issue trying to login with Google."
                        )
                    }
                    cookiePolicy={"single_host_origin"}
                    theme="dark"
                    disabled={connected}
                />
            </div>
        </DefaultContainer>
    )
}

export default {
    exact: true,
    path: "/register",
    component: Register,
}
