import React from "react";
import "../assets/scss/pages/notfound.scss";
import { Link } from "react-router-dom"

export default function Unsubscribed() {
    return (
        <div className="not-found-container">
            <h1>You have been unsubscribed from Unifey.</h1>
            <p>
                You will no longer be able to receive emails from us, even if
                you create an account with your own email. If this is a mistake, please <Link to="/support">contact us</Link>.
            </p>
        </div>
    );
}
