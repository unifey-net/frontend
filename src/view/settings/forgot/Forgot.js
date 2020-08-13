import React from "react"
import { Link } from "react-router-dom";
import { Input, Button, message } from "antd";
import { useDispatch } from "react-redux";
import history from "../../../api/History"

export default function ForgotPassword() {
    let dispatch = useDispatch()

    const resetPassword = () => {
        let value = document.getElementById("email").value
        
        if (value === "") {
            message.error("Please insert an email")
            return
        }

        history.push("/")

        message.info(`An email has been sent.`)
    }

    return (
        <div className="flex flex-col items-center justify-center">
            <h1 className="text-6xl">Forgot Password</h1>
            <p>
                Please input the email of the account you're trying to retrieve. <br/>
                If you don't remember this email, but remember your username or
                other details, please{" "}
                <Link to="/support">contact our support</Link>.
            </p>

            <Input
                placeholder="Email of the account."
                style={{ width: "15%" }}
                id="email"
            />

            <br style={{ marginTop: "1rem" }} />

            <Button onClick={resetPassword}>Reset password</Button>
        </div>
    );
}