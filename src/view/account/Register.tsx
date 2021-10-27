import React, { useState } from "react"
import ReCAPTCHA from "react-google-recaptcha"
import { login, signedIn } from "../../api/user/User"
import { Redirect } from "react-router-dom"
import { Form, Input, Button, Checkbox, Alert } from "antd"
import history from "../../api/History"
import { Link } from "react-router-dom"

import { Store } from "antd/lib/form/interface"
import { useDispatch } from "react-redux"
import { logIn } from "../../redux/actions/auth.actions"
import { COMPLETE } from "../../api/util/Status"
import DefaultContainer from "../../components/DefaultContainer"
import styled from "styled-components"
import { API } from "../../api/ApiHandler"

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

/**
 * The /register page.
 */
const Register = () => {
    const dispatch = useDispatch()

    const [ref, setRef] = useState<ReCAPTCHA>()

    let [captcha, setCaptcha] = useState("")
    let [loading, setLoading] = useState(false)
    let [error, setError] = useState("")

    const loginForm = async (values: Store) => {
        setLoading(true)

        const { username, password, tos, email } = values

        const form = new FormData()

        form.append("username", username)
        form.append("password", password)
        form.append("tos", tos)
        form.append("email", email)
        form.append("captcha", captcha)

        const response = await API.put("/user/register", form)

        if (response.status === 200) {
            dispatch(logIn(response.data.token))

            history.push("/")
            window.location.reload()
        } else {
            ref?.reset()
            setError(
                response.data.payload
            )
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
                        ]}
                    >
                        <Input id="username" />
                    </Form.Item>

                    <Form.Item
                        name="email"
                        label="Email"
                        rules={[
                            {
                                type: "email",
                            },
                            {
                                required: true,
                                message: "Please input your email!",
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Password"
                        name="password"
                        rules={[
                            {
                                required: true,
                                message: "Please input your password!",
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
                </Form>
            </RegisterForm>
        </DefaultContainer>
    )
}

export default {
    exact: true,
    path: "/register",
    component: Register,
}
