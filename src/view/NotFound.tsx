import React from "react"
import styled from "styled-components"

const NotFoundStyle = styled.div`
    display: flex;

    flex-direction: column;
    align-items: center;

    margin-left: 16rem;
    margin-right: 16rem;
`

const NotFound = (): JSX.Element => {
    return (
        <NotFoundStyle>
            <h1>That page could not be found!</h1>
        </NotFoundStyle>
    )
}

export default NotFound
