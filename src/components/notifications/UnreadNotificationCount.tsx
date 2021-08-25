import styled from "styled-components";
import React from "react"

const UnreadNotificationStyle = styled.span`
    padding-left: 4px;
    padding-right: 4px;
    background-color: ${({ theme }) => theme.accessory};
    border-radius: 4px;
    color: white;
`

const UnreadNotificationCount: React.FC<{ count: number, overflow?: number }> = ({ count, overflow }) => {
    return <UnreadNotificationStyle>
        {overflow && count > overflow ? `{overflow}+` : count }
    </UnreadNotificationStyle>
}

export default UnreadNotificationCount