import React from "react";
import { Input, Button, Form, Checkbox, message } from "antd";
import { API } from "../../api/ApiHandler";
import History from "../../api/History";

export default function Beta() {
    const [form] = Form.useForm();

    const signUp = async (values) => {
        const { username, email } = values;

        let data = new FormData();
        data.append("username", username);
        data.append("email", email);

        let req = await API.put("/beta", data);

        if (req.status === 200) {
            form.resetFields();
            message.success(
                "You have successfully signed up for the beta. Make sure to verify your email."
            );
        } else {
            message.error(req.data.payload);
        }
    };

    return (
        <div className="flex flex-col justify-center items-center">
            <h1 className="text-2xl lg:text-6xl">Beta Access</h1>
            <p className="max-w-lg">
                Unifey is currently in it's alpha stages. This means features
                are definitely not in working order, and there are too many bugs
                to count. However, in the near future we will have a 
                beta run. What this means is that we'll allow users who have signed up to
                use Unifey to it's extent to attempt to find bugs.
                <br />
                <br />
                If you'd like to join and help us in beta, please sign up below.
                When you do sign up, you will be notified through email when
                beta begins. This email will include the account created for
                you.
            </p>

            <p className="text-2xl">Beta Signup</p>
            <p className="max-w-lg">
                This is the area to sign-up for beta access. Make sure both your
                email and username have not been used in a previous beta signup.
                Remember: Unless you verify your email, the signup will not be
                available on beta and other users may potentially be able to
                take your name.
            </p>

            <div className="mt-8">
                <Form
                    name="basic"
                    initialValues={{ remember: true }}
                    onFinish={signUp}
                    onFinishFailed={() => {}}
                    form={form}
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
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Email"
                        name="email"
                        rules={[
                            {
                                required: true,
                                message: "Please input your password!",
                            },
                            {
                                type: "email",
                                message: "The input is not valid email!",
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <div>
                        <Form.Item
                            name="accept"
                            valuePropName="checked"
                            rules={[
                                {
                                    validator: (_, value) =>
                                        value
                                            ? Promise.resolve()
                                            : Promise.reject(
                                                  "You must accept our Privacy Policy before signing up."
                                              ),
                                },
                            ]}
                        >
                            <Checkbox>
                                I accept the <a href="/tos">Privacy Policy</a>.
                            </Checkbox>
                        </Form.Item>

                        <Form.Item
                            name="email-policy"
                            valuePropName="checked"
                            rules={[
                                {
                                    validator: (_, value) =>
                                        value
                                            ? Promise.resolve()
                                            : Promise.reject(
                                                  "You must accept the email policy."
                                              ),
                                },
                            ]}
                        >
                            <Checkbox>I understand I will be emailed to verify my beta account.</Checkbox>
                        </Form.Item>

                        <Form.Item
                            name="age"
                            valuePropName="checked"
                            rules={[
                                {
                                    validator: (_, value) =>
                                        value
                                            ? Promise.resolve()
                                            : Promise.reject(
                                                  "You must be at least the age of 13."
                                              ),
                                },
                            ]}
                        >
                            <Checkbox>I am at least the age of 13.</Checkbox>
                        </Form.Item>
                    </div>

                    <Form.Item>
                        <Button type="primary" htmlType="submit">
                            Submit
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </div>
    );
}
