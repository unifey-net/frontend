import React from "react";
import "../assets/scss/pages/home.scss";
import "../assets/scss/pages/login.scss";
import { login, signedIn } from "../api/user/User";
import { Redirect } from "react-router-dom";
import { Form, Input, Button, Checkbox, message } from "antd";
import history from "../api/History"
import { Link } from "react-router-dom"

import { useDispatch } from "react-redux";
import { alertInfo } from "../redux/actions/alert.actions";
import FormItem from "antd/lib/form/FormItem";

export default function Login() {
    const dispatch = useDispatch();

    const loginForm = async (values) => {
        let response = await login(values["username"], values["password"]);

        if (response == null || !response) {
            message.error("Invalid username or password!")
        } else {
            history.push("/")
            dispatch(alertInfo("You are now signed in!"))
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

                        <div className="remember-forgot-container">
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
                            <Button type="primary" htmlType="submit">
                                Submit
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
            </div>
        </>
    );
}
