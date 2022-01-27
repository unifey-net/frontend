import React from "react"
import { MdSettings } from "react-icons/md";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { useFriend } from "../../../api/friends/Friends";
import useMessagingModal from "../MessagingModal";
import ChannelType from "../objects/ChannelType";
import DirectMessageChannel from "../objects/DirectMessageChannel";
import GroupMessageChannel from "../objects/GroupMessageChannel";
import { DirectMessageChannelView } from "./DirectMessageChannelView";
import GroupChatSettings from "./group/settings/GroupChatSettings";
import useGroupChatSettings from "./group/settings/GroupChatSettings";
import { GroupChannelView } from "./GroupChannelView";

export const ChannelStyle = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
`

const Channel: React.FC<{ channel: GroupMessageChannel | DirectMessageChannel }> = ({ channel }) => {
    const [modal, visible] = useMessagingModal(
        channel.id,
        "name" in channel ? channel.name : "Direct Message"
    )

    if (channel.channelType.toString() === "GROUP") {
        return <GroupChannelView
            visible={visible}
            channel={channel as GroupMessageChannel}
            modal={modal}
        />
    } else {
        return (
            <DirectMessageChannelView
                visible={visible}
                channel={channel as DirectMessageChannel}
                modal={modal}
            />
        )
    }
}

export default Channel