import React from "react"
import { useSelector } from "react-redux"
import { useFriend } from "../../../api/friends/Friends"
import DirectMessageChannel, {
    getOtherUser,
} from "../objects/DirectMessageChannel"
import { ChannelStyle } from "./Channel"

export const DirectMessageChannelView: React.FC<{
    visible: () => void
    channel: DirectMessageChannel
    modal: JSX.Element
}> = ({ visible, channel, modal }) => {
    console.error(channel)

    const selfId = useSelector((state: any) => state.auth.user.id)
    const friend = useFriend(getOtherUser(selfId, channel))

    return (
        <ChannelStyle>
            <button onClick={() => visible()}>
                Direct Message - {friend?.friendDetails?.username}
            </button>

            {modal}
        </ChannelStyle>
    )
}
