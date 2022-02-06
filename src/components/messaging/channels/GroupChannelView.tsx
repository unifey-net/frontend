import React from "react"
import { useSelector } from "react-redux"
import GroupMessageChannel from "../objects/GroupMessageChannel"
import { ChannelStyle } from "./Channel"
import GroupChatSettings from "./group/settings/GroupChatSettings"

export const GroupChannelView: React.FC<{
    visible: () => void
    channel: GroupMessageChannel
    modal: JSX.Element
}> = ({ visible, channel, modal }) => {
    const selfId = useSelector((state: any) => state.auth.user.id)

    return (
        <ChannelStyle>
            <button onClick={() => visible()}>
                {channel.name}
            </button>

            {selfId === channel.owner && (
                <GroupChatSettings channel={channel} />
            )}

            {modal}
        </ChannelStyle>
    )
}
