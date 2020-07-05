import React, { useState } from "react"
import { Link } from "react-router-dom";

export default function ForgotPassword() {
    return (<div className="info-container">
        <h1>Forgot Password</h1>
        <p>Please input the email of the account you're trying to retrieve. If you don't remember this email, but remember your username or other details, please <Link to="/support">contact our support</Link>.</p>

    </div>)
}