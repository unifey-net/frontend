import React from "react"
import { Link } from "react-router-dom"
import styled from "styled-components"

const UnverifiedStyle = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;

    p {
        max-width: 25rem;
    }
`

/**
 * TODO: Change this to something other than it's own page.
 *
 * Gives details about what it means to be unverified.
 */
const Unverified = () => {
    return (
        <UnverifiedStyle>
            <h2>What it means when your account is "unverified".</h2>
            <p>
                An unverified account is an account that has not verified their
                email. This means they cannon post in feeds or add friends.
                <br />
                <br />
                You can verify your account using the link you were sent when
                you made your account. If you did not receive this, you can
                <Link to="/settings"> go to your settings</Link> and click
                <code> resend</code>. If you are still having issues verifying
                your account, please <Link to="/support">contact us</Link>.
            </p>
        </UnverifiedStyle>
    )
}

export default {
    exact: true,
    path: "/unverified",
    component: Unverified,
}
