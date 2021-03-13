import React from "react"
import { Link } from "react-router-dom"

const Unsubscribed = () => {
    return (
        <div className="flex flex-col items-center mx-64">
            <h1 className="text-2xl">
                You have been unsubscribed from Unifey.
            </h1>
            <p>
                You will no longer be able to receive emails from us, even if
                you create an account with your own email. If this is a mistake,
                please <Link to="/support">contact us</Link>.
            </p>
        </div>
    )
}

export default Unsubscribed
