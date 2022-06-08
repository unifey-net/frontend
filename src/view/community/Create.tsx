import React, { useEffect, useState } from "react"
import ReCAPTCHA from "react-google-recaptcha"
import { signedIn } from "../../api/user/User"
import { Form, Input, Button, Checkbox, Alert, Divider } from "antd"
import history from "../../api/History"
import { Link, useNavigate } from "react-router-dom"

import { Store } from "antd/lib/form/interface"
import { useDispatch } from "react-redux"
import DefaultContainer from "../../components/DefaultContainer"
import styled from "styled-components"
import { API } from "../../api/ApiHandler"
import toast from "react-hot-toast"
import { useAppDispatch } from "../../util/Redux"

const CreateForm = styled.div`
    min-width: 300px;
    max-width: 300px;

    .error {
        margin-bottom: 16px;
    }
`

/**
 * The /create page.
 */
const Create = () => {
    const dispatch = useAppDispatch()
    const nav = useNavigate()

    const [ref, setRef] = useState<ReCAPTCHA>()

    let [captcha, setCaptcha] = useState("")
    let [loading, setLoading] = useState(false)
    let [error, setError] = useState("")

    useEffect(() => {
        if (!signedIn()) {
            nav("/")
            toast.error("You must be signed in for this!")
        }
    }, [])

    const loginForm = async (values: Store) => {
        setLoading(true)

        const { name, password, tos, description } = values

        const form = new FormData()

        form.append("password", password)
        form.append("description", description)
        form.append("tos", tos)
        form.append("name", name)
        form.append("captcha", captcha)

        const response = await API.put("/community", form)

        if (response.status === 200) {
            history.push(`/c/${name}`)
            toast.success("Welcome to your new community!")
        } else {
            ref?.reset()
            setError(response.data.payload)
        }

        setLoading(false)
    }
    return (
        <DefaultContainer>
            <h1>Create</h1>
            <ul>
                <li>Your account must be 14 days old to create a community.</li>
                <li>You can also only create one community.</li>
            </ul>

            <CreateForm>
                {error !== "" && (
                    <Alert
                        type="error"
                        showIcon
                        message={error}
                        className="error"
                    />
                )}

                <Divider />

                <Form
                    name="basic"
                    initialValues={{
                        remember: false,
                    }}
                    onFinish={loginForm}
                    onFinishFailed={() => {}}
                >
                    <Form.Item
                        label="Name"
                        name="name"
                        rules={[
                            {
                                required: true,
                                message:
                                    "Please input the name of the community!",
                            },
                        ]}
                    >
                        <Input id="username" />
                    </Form.Item>

                    <Form.Item
                        label="Description"
                        name="description"
                        rules={[
                            {
                                required: true,
                                message:
                                    "Please input the description of the community!",
                            },
                        ]}
                    >
                        <Input id="description" />
                    </Form.Item>

                    <Divider />

                    <Form.Item
                        name="password"
                        label="Password"
                        hasFeedback
                        rules={[
                            {
                                required: true,
                                message: "Please confirm your password!",
                            },
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

                    <Form.Item>
                        <div className="flex flex-row justify-center items-center">
                            <Button
                                type="primary"
                                htmlType="submit"
                                loading={loading}
                            >
                                Create
                            </Button>
                        </div>
                    </Form.Item>
                </Form>
            </CreateForm>
        </DefaultContainer>
    )
}

export default Create
