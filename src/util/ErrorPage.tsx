import React from "react"
import { useDispatch } from "react-redux"
import styled from "styled-components"
import { media } from "../api/util/Media"

const Style = styled.div`
    text-align: center;
    padding-top: 15vw;

    display: flex;
    flex-direction: column;
    align-items: center;

    button {
        color: white;
        cursor: pointer;
        background-color: ${({ theme }) => theme.primary};
        border-radius: 4px;
        border: 1px solid black;
    }

    .error {
        text-transform: uppercase;
        color: gray;
        font-size: 12px;
        margin-right: 6px;
    }

    .controls {
        display: flex;
        flex-direction: column;
        button {
            max-width: 200px;
        }

        ${media(
            "",
            `
            flex-direction: row;
            button {
                margin-right: 4px;
            }
        `,
            `flex-direction: row;
             
            button {
                margin-right: 4px;
            }`
        )}
    }
`

const ErrorPage: React.FC<{ content: JSX.Element; code: number }> = ({
    content,
    code,
}) => {
    return (
        <Style>
            <div>
                {content}

                <div>
                    <span className="error">UNFY:{code}</span>
                    <a href={`https://status.unifey.app/help?code=UNFY:${code}`}>
                        HELP
                    </a>
                </div>
            </div>
        </Style>
    )
}

export default ErrorPage
