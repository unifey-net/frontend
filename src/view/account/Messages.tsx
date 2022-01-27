import React, { useEffect } from "react"
import { useSelector } from "react-redux"
import History from "../../api/History"
import DefaultContainer from "../../components/DefaultContainer"
import Channel from "../../components/messaging/channels/Channel"
import CreateGroupChat from "../../components/messaging/channels/group/CreateGroupChat"
import { useMessageSocket } from "../../components/messaging/MessagesSocket"

const Messages = () => {
    const auth = useSelector((state: any) => state.live.authenticated)
    const channels = useSelector((state: any) => state.messages)
    const keys = Object.keys(channels)
    const { openDirectMessage } = useMessageSocket()

    useEffect(() => {
        if (auth === true) {
            let queryOpen = new URL(
                window.location.toString()
            ).searchParams.get("open")

            if (queryOpen) {
                openDirectMessage(+queryOpen)
            }

            History.push("/messages")
        }
    }, [auth])

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
