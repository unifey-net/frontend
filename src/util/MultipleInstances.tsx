import React from "react"
import { Link } from "react-router-dom"
import styled from "styled-components"

const Style = styled.div`
    text-align: center;
    margin-top: 2rem;
`

const MultipleInstances = () => {
    return (
        <Style>
            <p>
                We currently don't support more than one Unifey instance at once
                due to{" "}
                <a
                    href={"https://github.com/unifey-net/frontend/issues/35"}
                >this issue</a>
                .
            </p>
        </Style>
    )
}

export default MultipleInstances