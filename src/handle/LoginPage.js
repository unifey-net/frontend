import React from "react";
import "../assets/scss/pages/home.scss"
import { Spin } from "antd"
import "../assets/scss/pages/login.scss"
import {login, signedIn} from "./AuthenticationManager"
import { withRouter, Redirect } from "react-router-dom"

import { Form, Input, Button, Checkbox, Layout, message } from "antd";

class LoginPage extends React.Component {


    render() {
        if (signedIn())
            return (<Redirect to="/"/>)

        return (
            <div className="login-container">
                <h1 className="title">Login</h1>

                <div className="form-container">
                    <Form
                        name="basic"
                        initialValues={{
                            remember: false
                        }}
                        onFinish={(values) => {
                            this.formLogin(values);
                        }}
                        onFinishFailed={() => {}}
                    >
                        <Form.Item
                            label="Username"
                            name="username"
                            rules={[{
                                required: true,
                                message: 'Please input your username!'
                            }]}
                        >
                            <Input id="username" />
                        </Form.Item>

                        <Form.Item
                            label="Password"
                            name="password"
                            rules={[{
                                required: true,
                                message: 'Please input your password!'
                            }]}
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
    }

    /**
     * TODO use remember me
     * @param values
     */
    formLogin(values) {
        login(values["username"], values["password"], (success, token) => {
            console.log(success)

            if (!success) {
                document.querySelector("#status").textContent = "Invalid username or password!"
            } else {
                window.location.reload(false);
            }
        })
    }
}

export default withRouter(LoginPage)
