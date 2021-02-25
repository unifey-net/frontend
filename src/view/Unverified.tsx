import React from "react"
import { Link } from "react-router-dom"

const Unverified = () => {
    return (
        <div className="flex flex-col items-center">
            <h1 className="text-2xl">
                What it means when your account is "unverified".
            </h1>
            <p className="max-w-md">
                An unverified account is an account that has not verified their
                email. This means they cannon post in feeds or add friends.
                <br />
                You can verify your account using the link you were sent when
                you made your account. If you did not receive this, you can
                <Link to="/settings"> go to your settings</Link> and click
                <code> resend</code>. If you are still having issues verifying
                your account, please <Link to="/support">contact us</Link>.
            </p>
        </div>
    )
}

export default Unverified
