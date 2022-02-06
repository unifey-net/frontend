import React, { useState } from "react"
import ReCAPTCHA from "react-google-recaptcha"
import { login, signedIn } from "../../api/user/User"
import { Redirect } from "react-router-dom"
import { Form, Input, Button, Checkbox, Alert, Divider } from "antd"
import history from "../../api/History"
import { Link } from "react-router-dom"

import FormItem from "antd/lib/form/FormItem"
import { Store } from "antd/lib/form/interface"
import { useDispatch } from "react-redux"
import { COMPLETE } from "../../api/util/Status"
import DefaultContainer from "../../components/DefaultContainer"
import styled from "styled-components"
import GoogleLogin from "react-google-login"
import { API } from "../../api/ApiHandler"
import { useForm } from "antd/lib/form/Form"
import { logIn } from "../../api/user/redux/auth.redux"

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

    const [form] = useForm()
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

            dispatch(logIn({ token: token.token }))

            history.push("/")
            window.location.reload()
        } else {
            ref?.reset()
            form.setFieldsValue({ password: "" })

            setError(
                status.message === undefined
                    ? "There was an issue logging in."
                    : status.message
            )
        }

        setLoading(false)
    }

    const loginGoogle = async (obj: any) => {
        setLoading(true)
        const formData = new FormData()

        formData.set("token", obj.accessToken)

        const request = await API.post("/authenticate/connections/google", formData)

        if (request.status === 200) {
            dispatch(logIn(request.data.token.token))

            history.push("/")
            window.location.reload()
        } else {
            setError(request.data.payload)
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
                    form={form}
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

                        <p>
                            or <Link to={"/register"}>register</Link>.
                        </p>
                    </div>
                </Form>

                <Divider />
            </LoginForm>

            <div>
                <GoogleLogin
                    clientId="947582734339-etrjdvbs4vvnibji6hp07v36evlitanu.apps.googleusercontent.com"
                    buttonText="Login with Google"
                    onSuccess={loginGoogle}
                    onFailure={() =>
                        setError(
                            "There was an issue trying to login with Google."
                        )
                    }
                    cookiePolicy={"single_host_origin"}
                    theme="dark"
                />
            </div>
        </DefaultContainer>
    )
}

export default {
    exact: true,
    path: "/login",
    component: Login,
}
