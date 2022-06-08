import { Modal } from "antd"
import React from "react"
import styled from "styled-components"
import { useMessageSocket } from "../../../MessagesSocket"
import GroupMessageChannel from "../../../objects/GroupMessageChannel"

const Member = styled.div<{ owner: boolean }>`
    p {
        ${({ owner }) => owner && "color: yellow;"}
    }

    display: flex;
    flex-direction: row;

    button {
        background: transparent;
        border: none;

        color: red;
        margin-bottom: 16px;

        &:hover {
            color: pink;
        }
    }
`

const GroupChatMember: React.FC<{
    user: number
    channel: GroupMessageChannel
}> = ({ user, channel }) => {
    const {
        groupChats: { removeGroupChatMember },
    } = useMessageSocket()

    const onKick = () => {
        Modal.warning({
            content: "Are you sure you want to kick " + user + "?",
            onOk: () => {
                removeGroupChatMember(user, channel.id)
            },
        })
    }
    return (
        <Member owner={channel.owner === user}>
            <p>{user}</p>{" "}
            {channel.owner !== user && <button onClick={onKick}>Kick</button>}
        </Member>
    )
}

export default GroupChatMember
