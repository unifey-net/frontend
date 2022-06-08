import { Tooltip } from "antd"
import Avatar from "antd/lib/avatar/avatar"
import Title from "antd/lib/skeleton/Title"
import React from "react"
import styled from "styled-components"
import { getImageUrl } from "../../api/user/User"

const MessageStyle = styled.div`
    display: flex;
    flex-direction: row;
    gap: 8px;

    .ant-avatar {
        margin-top: 4px;
    }

    p {
        font-family: "Poppins", sans-serif;
        font-size: 14px;
    }
`

const Message: React.FC<{ message: string; user: string; time: Date }> = ({
    message,
    user,
    time,
}) => {
    return (
        <MessageStyle>
            <Avatar size={16} src={getImageUrl(user)} />
            <p>
                {time.toLocaleTimeString()}:{user} - {message}
            </p>
        </MessageStyle>
    )
}

export default Message
