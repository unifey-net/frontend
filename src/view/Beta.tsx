import { Button, Form, Input, Radio } from "antd"
import { useForm } from "antd/lib/form/Form"
import { Store } from "antd/lib/form/interface"
import React, { createRef, useEffect, useState } from "react"
import toast from "react-hot-toast"
import { useSelector } from "react-redux"
import { API } from "../api/ApiHandler"
import History from "../api/History"
import DefaultContainer from "../components/DefaultContainer"

const Beta = () => {
    const { isSignedIn, user: { username } } = useSelector((state: any) => state.auth)

    const input = createRef<Input>()
    const [disabled, setDisabled] = useState(false)
    const [form] = useForm()

    useEffect(() => {
        if (username && username !== "") {
            input.current?.setValue(username)
            setDisabled(true)
        }
    }, [username, input])

    const onFinish = async (results: Store) => {
        const formData = new FormData()

        if (!isSignedIn)
            formData.set("name", results.username)
        
        formData.set("type", results.type)
        formData.set("message", results.message)

        const req = await API.put("/beta/request", formData)

        if (req.status !== 200) {
            toast.error(req.data.payload)
        } else {
            toast.success("Your message has been received!")
            form.resetFields()
        }
    }
    
    return (
        <DefaultContainer>
            <h1>Unifey Beta</h1>
            <p>
                Unifey is currently in Beta. That means that there's gonna be
                some issues. Currently, we have quite a few. If you find one,
                please report it below. <br /> You can also suggest features
                below if you have any. If you're currently signed in, in the
                future you may get <b>cool rewards</b> for your findings and
                suggestions.
            </p>

            <Form
                form={form}
                name="basic"
                initialValues={{ remember: true }}
                onFinish={onFinish}
                onFinishFailed={() => {}}
                autoComplete="off"
            >
                <Form.Item
                    label="Username"
                    name="username"
                    rules={
                        disabled
                            ? []
                            : [
                                  {
                                      required: true,
                                      message: "Please input your username!",
                                  },
                              ]
                    }
                >
                    <Input ref={input} disabled={disabled} />
                </Form.Item>

                <Form.Item
                    label="Message"
                    name="message"
                    rules={[
                        {
                            required: true,
                            message: "Please input a message!",
                        },
                    ]}
                >
                    <Input.TextArea />
                </Form.Item>

                <Form.Item
                    name="type"
                    label="Type"
                    initialValue={"BUG"}
                    rules={[
                        { required: true, message: "Please pick an item!" },
                    ]}
                >
                    <Radio.Group>
                        <Radio.Button value="FEATURE_REQUEST">
                            Feature Request
                        </Radio.Button>
                        <Radio.Button value="BUG">Bug</Radio.Button>
                    </Radio.Group>
                </Form.Item>

                <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        </DefaultContainer>
    )
}

export default {
    exact: true,
    path: "/beta",
    component: Beta,
}
