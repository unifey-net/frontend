import React from "react"
import { MdSettings } from "react-icons/md";
import { useSelector } from "react-redux";
import styled from "styled-components";
import useMessagingModal from "../MessagingModal";
import DirectMessageChannel from "../objects/DirectMessageChannel";
import GroupMessageChannel from "../objects/GroupMessageChannel";
import GroupChatSettings from "./group/settings/GroupChatSettings";
import useGroupChatSettings from "./group/settings/GroupChatSettings";

const ChannelStyle = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
`

const Channel: React.FC<{ channel: GroupMessageChannel | DirectMessageChannel }> = ({ channel }) => {
    const [modal, visible] = useMessagingModal(
        channel.id,
        "name" in channel ? channel.name : "Direct Message"
    )

    const selfId = useSelector((state: any) => state.auth.user.id)
    
    return (
        <ChannelStyle>
            <button onClick={() => visible()}>
                {"name" in channel
                    ? channel.name
                    : `Direct Message - ${channel.id}`}
            </button>

            { "name" in channel && selfId === channel.owner && <GroupChatSettings channel={channel}/> }

            {modal}
        </ChannelStyle>
    )
}

export default Channel