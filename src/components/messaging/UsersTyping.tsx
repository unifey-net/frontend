import React from "react"
import { useSelector } from "react-redux"
import styled, { keyframes } from "styled-components"

const blink = keyframes`
  50% {color: transparent;}
`

export const Dot = styled.span`
    animation: 1s ${blink} infinite;
    &:nth-child(1) {
        animation-delay: 0ms;
    }
    &:nth-child(2) {
        animation-delay: 250ms;
    }
    &:nth-child(3) {
        animation-delay: 500ms;
    }
`

const UsersTyping: React.FC<{ channel: number }> = ({ channel }) => {
    const { typing } = useSelector((state: any) => state.messages)[`${channel}`]


    return (
        <div>
            {typing.map(
                (user: { username: string; id: number }, index: number) => (
                    <>
                        {user.username} is typing
                        <Dot>.</Dot>
                        <Dot>.</Dot>
                        <Dot>.</Dot>
                        {typing.length !== index + 1 && <>, </>}
                    </>
                )
            )}
        </div>
    )
}

export default UsersTyping