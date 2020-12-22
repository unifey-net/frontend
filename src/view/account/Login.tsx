import React, { useState } from "react"
import ReCAPTCHA from "react-google-recaptcha"
import { signedIn } from "../../api/user/User"
import { Redirect } from "react-router-dom"
import { Form, Input, Button, Checkbox, Alert } from "antd"
import history from "../../api/History"
import { Link } from "react-router-dom"

import FormItem from "antd/lib/form/FormItem"
import { Store } from "antd/lib/form/interface"
import { API } from "../../api/ApiHandler"
import { useDispatch } from "react-redux"
import { logIn } from "../../redux/actions/auth.actions"

/**
 * The /login page.
 */
export default () => {
    const dispatch = useDispatch()

    const [ref, setRef] = useState<ReCAPTCHA>()

    let [captcha, setCaptcha] = useState("")
    let [loading, setLoading] = useState(false)
    let [error, setError] = useState("")

    const loginForm = async (values: Store) => {
        setLoading(true)

        if (captcha === "") {
            setError("Please fill out the reCAPTCHA")

            setLoading(false)
            return
        }

        let data = new FormData()

        data.append("username", values.username)
        data.append("password", values.password)
        data.append("remember", `${values.remember}`)
        data.append("captcha", captcha)

        let request = await API.post(`/authenticate`, data)

        if (request.status === 200) {
            const { user, token } = request.data

            dispatch(logIn(token.token, user, token.expires))

            history.push("/")
            window.location.reload()
        } else {
            ref?.reset()
            setError(request.data.payload)
        }

        setLoading(false)
    }

    if (signedIn()) return <Redirect to="/" />

    return (
        <>
            <div className="flex flex-col items-center justify-center">
                <h1 className="text-6xl">Login</h1>

                {error !== "" && (
                    <>
                        <div className="-mt-8"></div>
                        <Alert type="error" showIcon message={error} />

                        <div className="my-2"></div>
                    </>
                )}

                <div className="form-container">
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

                        <div className="flex flex-row justify-between">
                            <Form.Item name="remember" valuePropName="checked">
                                <Checkbox>Remember me</Checkbox>
                            </Form.Item>

                            <FormItem>
                                <Link to="/settings/forgot">
                                    Forgot Password
                                </Link>
                            </FormItem>
                        </div>

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
                    </Form>
                </div>
            </div>
        </>
    )
}
