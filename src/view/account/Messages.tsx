import React from "react"
import { useSelector } from "react-redux"
import DefaultContainer from "../../components/DefaultContainer"
import Channel from "../../components/messaging/channels/Channel"
import CreateGroupChat from "../../components/messaging/channels/group/CreateGroupChat"

const Messages = () => {
    const channels = useSelector((state: any) => state.messages)
    const keys = Object.keys(channels)

    return (
        <DefaultContainer>
            <h1>Messages</h1>
            <CreateGroupChat/>
            
            {keys.length === 0 ? (
                <p>No messages :(</p>
            ) : (
                keys.map(key => <Channel channel={channels[key]}/>)
            )}
        </DefaultContainer>
    )
}

export default {
    exact: true,
    path: "/messages",
    component: Messages,
}
