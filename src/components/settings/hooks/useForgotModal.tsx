import React from "react"
import { useState } from "react"
import { Modal, Form, Alert, Input, message } from "antd"
import { Store } from "antd/lib/form/interface"
import { API } from "../../../api/ApiHandler"

/**
 * When a ?verify string is included with the request, this will appear on the /settings/forgot page.
 */
const useForgotModal = (): [JSX.Element, (verify: string) => void] => {
    const [form] = Form.useForm()

    const [loading, setLoading] = useState(false)
    const [visible, setVisible] = useState(false)
    const [error, setError] = useState("")

    const [verify, setVerify] = useState("")

    /**
     * When the user submits their new password.
     */
    const onOk = async (values: Store) => {
        setLoading(true)

        let password = values.password

        let form = new FormData()

        form.append("verify", verify)
        form.append("password", password)

        let request = await API.post("/email/forgot", form)

        if (request.status === 200) {
            setVisible(false)
            message.success("Password has successfully been changed.")
        } else {
            setError(request.data.payload)
        }

        setLoading(false)
    }

    /**
     * The actual modal.
     */
    const modal = (
        <Modal
            confirmLoading={loading}
            onCancel={() => {
                setVisible(false)
                form.resetFields()
            }}
            onOk={() => {
                form.validateFields().then(values => {
                    onOk(values)
                    form.resetFields()
                })
            }}
            visible={visible}
            title="Create a new rule"
        >
            {error !== "" && (
                <Alert
                    message="Uh oh."
                    description={error}
                    showIcon
                    type="error"
                    className="mb-4"
                />
            )}

            <Form form={form}>
                <Form.Item
                    name="password"
                    label="New Password"
                    extra="The password must be over 8 characters and contain: A number, a lowercase and uppercase letter and a special character (@#$%^&-_+=()!)."
                    hasFeedback
                    rules={[
                        {
                            required: true,
                            message: "Please input a new password!",
                        },
                        {
                            pattern: RegExp(
                                /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,128}$/
                            ),
                            message:
                                "This password does not meet the requirements.",
                        },
                    ]}
                >
                    <Input.Password />
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
                            validator(rule, value) {
                                if (
                                    !value ||
                                    getFieldValue("password") === value
                                ) {
                                    return Promise.resolve()
                                }
                                return Promise.reject(
                                    "The two passwords that you entered do not match!"
                                )
                            },
                        }),
                    ]}
                >
                    <Input.Password />
                </Form.Item>
            </Form>
        </Modal>
    )

    return [
        modal,
        (verify?: string) => {
            setVisible(prev => !prev)

            if (verify !== undefined) setVerify(verify)
        },
    ]
}

export default useForgotModal
