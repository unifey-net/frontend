import React, { useState } from "react";
import { Alert, message, Tooltip, Button } from "antd";
import { Link } from "react-router-dom";

type Props = {
    attempts: number;
    addAttempt: () => void
};

export default ({ attempts, addAttempt }: Props) => {
    const [loading, setLoading] = useState(false)
    /**
     * Resend the email.
     */
    const resendEmail = async () => {
        if (attempts >= 10) {
            message.error(
                "You have reached the limit for resends. Please contact our support."
            );
            return;
        }

        setLoading(true);

        message.success("Email has been sent! Check your inbox.", 2.5);

        addAttempt();
        setLoading(false);
    };

    return (
        <Alert
            style={{
                marginBottom: "32px",
            }}
            message="Your email is not verified."
            type="error"
            description={
                <p>
                    This limits your account is various ways. <br /> Including
                    being able to change your: username, password and email.{" "}
                    <br /> To learn more, visit{" "}
                    <Link to="/unverified">here</Link>
                    .
                    <br />
                    Didn't receive the email?
                    <Tooltip
                        title={`You have ${10 - attempts} remaining attempts.`}
                    >
                        <Button
                            type="link"
                            loading={loading}
                            onClick={resendEmail}
                        >
                            Resend {attempts}
                            /10
                        </Button>
                    </Tooltip>
                </p>
            }
            showIcon
        />
    );
};
