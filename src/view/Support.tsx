import React from "react"
import { Link } from "react-router-dom"
import styled from "styled-components"

const SupportStyle = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-left: 16rem;
    margin-right: 16rem;
`

/**
 * Where to receive Unifey support.
 */
const Support = () => {
    return (
        <SupportStyle>
            <h1>Unifey Support</h1>
            <p>
                At the moment, you can contact us through our
                <Link to="/discord"> Discord</Link>.
            </p>
        </SupportStyle>
    )
}

export default {
    exact: true,
    path: "/support",
    component: Support,
}
