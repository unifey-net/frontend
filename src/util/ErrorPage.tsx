import React from "react"
import { useDispatch } from "react-redux"
import styled from "styled-components"

const Style = styled.div`
    text-align: center;
    margin-top: 2rem;

    button {
        color: white;
        cursor: pointer;
        background-color: transparent;
    }

    .error {
        text-transform: uppercase;
        color: gray;
        font-size: 12px;        
        margin-right: 6px;
    }
`

const ErrorPage: React.FC<{ content: JSX.Element, code: number }> = ({ content, code }) => {
    return (
        <Style>
            {content}

            <div>
                <span className="error">UNFY:{code}</span>
                <a href={`https://ajkneisl.dev/help?code=UNFY:${code}`}>HELP</a>
            </div>
        </Style>
    )
}

export default ErrorPage
