import React from "react"
import { Link } from "react-router-dom";
import { Input, Button } from "antd";
import { useDispatch } from "react-redux";
import { alertInfo } from "../../redux/actions/alert.actions";
import history from "../../api/History"

export default function ForgotPassword() {
    let dispatch = useDispatch()

    const resetPassword = () => {
        let value = document.getElementById("email").value

        history.push("/")

        dispatch(alertInfo(`An email has been sent.`))
    }

    return (<div className="info-container">
        <h1>Forgot Password</h1>
        <p>Please input the email of the account you're trying to retrieve. If you don't remember this email, but remember your username or other details, please <Link to="/support">contact our support</Link>.</p>

        <Input placeholder="Email of the account." style={{width: "15%"}} id="email"/>

        <br style={{marginTop: "1rem"}} />

        <Button onClick={resetPassword}>Reset password</Button>
    </div>)
}