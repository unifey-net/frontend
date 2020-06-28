import React from "react";
import "../assets/scss/pages/home.scss";
import "../assets/scss/pages/login.scss";
import { login, signedIn } from "../api/user/User";
import { Redirect } from "react-router-dom";
import { Form, Input, Button, Checkbox, Layout, message } from "antd";

export default function Login() {
    const loginForm = async (values) => {
        let response = login(values["username"], values["password"]);

        if (response == null) {
            message.error("Invalid username or password!");
        } else {
        }
    };
    
    if (signedIn()) 
        return (<Redirect to="/" />) 
    
    return (
        <>
            <div className="login-container">
                <h1 className="title">Login</h1>

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

                        <Form.Item name="remember" valuePropName="checked">
                            <Checkbox>Remember me</Checkbox>
                        </Form.Item>

                        <Form.Item>
                            <Button type="primary" htmlType="submit">
                                Submit
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
            </div>
            );
        </>
    );
}
