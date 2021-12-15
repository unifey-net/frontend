import React, { useState } from "react"
import ReCAPTCHA from "react-google-recaptcha"
import { login, signedIn } from "../../api/user/User"
import { Redirect } from "react-router-dom"
import { Form, Input, Button, Checkbox, Alert } from "antd"
import history from "../../api/History"
import { Link } from "react-router-dom"

import FormItem from "antd/lib/form/FormItem"
import { Store } from "antd/lib/form/interface"
import { useDispatch } from "react-redux"
import { logIn } from "../../redux/actions/auth.actions"
import { COMPLETE } from "../../api/util/Status"
import DefaultContainer from "../../components/DefaultContainer"
import styled from "styled-components"

const LoginForm = styled.div`
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
 * The /login page.
 */
const Login = () => {
    const dispatch = useDispatch()

    const [ref, setRef] = useState<ReCAPTCHA>()

    let [captcha, setCaptcha] = useState("")
    let [loading, setLoading] = useState(false)
    let [error, setError] = useState("")

    const loginForm = async (values: Store) => {
        setLoading(true)

        const { username, password, remember } = values

        const [status, data] = await login(
            username,
            password,
            remember,
            captcha
        )

        if (status.status === COMPLETE) {
            const { token } = data

            dispatch(logIn(token.token))

            history.push("/")
            window.location.reload()
        } else {
            ref?.reset()
            setError(
                status.message === undefined
                    ? "There was an issue logging in."
                    : status.message
            )
        }

        setLoading(false)
    }

    if (signedIn()) return <Redirect to="/" />

    return (
        <DefaultContainer>
            <h1>Login</h1>

            <LoginForm>
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

                    <div className="remember-container">
                        <Form.Item name="remember" valuePropName="checked">
                            <Checkbox>Remember me</Checkbox>
                        </Form.Item>

                        <FormItem>
                            <Link to="/settings/forgot">Forgot Password</Link>
                        </FormItem>
                    </div>

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
                                    Submit
                                </Button>
                            </div>
                        </Form.Item>

                        <p>or <Link to={"/register"}>register</Link>.</p>
                    </div>
                </Form>
            </LoginForm>
        </DefaultContainer>
    )
}

export default {
    exact: true,
    path: "/login",
    component: Login,
}