import React, { useState } from "react"
import { Alert, message, Tooltip, Button } from "antd"
import { Link } from "react-router-dom"
import { resend } from "../../api/user/Email"

const UnverifiedWarning: React.FC = () => {
    const [loading, setLoading] = useState(false)

    /**
     * Resend the email.
     */
    const resendEmail = async () => {
        setLoading(true)

        const request = await resend(0)

        if (request === 0) {
            message.success("Email has been sent! Check your inbox.", 2.5)
        } else {
            message.error(
                `You must wait til ${new Date(
                    +request
                ).toLocaleString()} before requesting another resend!`
            )
        }

        setLoading(false)
    }

    return (
        <Alert
            style={{
                marginBottom: "32px",
            }}
            message={
                <Link to="/unverified">
                    Your account's email hasn't been verified yet.
                </Link>
            }
            type="error"
            description={
                <p>
                    <Button loading={loading} onClick={resendEmail}>
                        Resend email
                    </Button>
                </p>
            }
            showIcon
        />
    )
}

export default UnverifiedWarning
