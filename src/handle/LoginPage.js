import React from "react";
import "../assets/scss/pages/home.scss"
import { Spin } from "antd"
import "../assets/scss/pages/login.scss"
import {login, signedIn} from "./AuthenticationManager"
import { withRouter, Redirect } from "react-router-dom"

class LoginPage extends React.Component {
    render () {
        if (signedIn())
            return (<Redirect to="/"/>)

        return (
            <div className="login-container">
                <h1 className="title">Login</h1>
                <form onSubmit={(e) => this.formLogin(e)}>
                    <div className="login-inputs">
                        <label>Username</label>
                        <br/>
                        <input id="username"/>
                        <br/>

                        <label>Password</label>
                        <br/>
                        <input id="password"/>
                        <br/>

                        <button type="submit">Login</button>
                        <br/>

                        <div id="loading" className="loading">
                            <Spin size="small" />
                            <p id="status"/>
                        </div>
                    </div>
                </form>
            </div>
        );
    }

    formLogin(e) {
        e.preventDefault();

        let user = document.querySelector("#username")
        let pass = document.querySelector("#password")

        login(user.value, pass.value, (success, token) => {
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
