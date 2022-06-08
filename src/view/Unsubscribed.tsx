import React from "react"
import { Link } from "react-router-dom"
import styled from "styled-components"

const UnsubscribedStyle = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-left: 16rem;
    margin-right: 16rem;
    margin-top: 12rem;

    p {
        max-width: 25rem;
    }
`

/**
 * TODO: Change this to something other than it's own page.\
 *
 * When a user clicks that they don't want to receive Unifey emails anymore.
 */
const Unsubscribed = () => {
    return (
        <UnsubscribedStyle>
            <h2>You have been unsubscribed from Unifey.</h2>
            <p>
                You will no longer be able to receive emails from us, even if
                you create an account with your own email. If this is a mistake,
                please <Link to="/support">contact us</Link>.
            </p>
        </UnsubscribedStyle>
    )
}

export default Unsubscribed