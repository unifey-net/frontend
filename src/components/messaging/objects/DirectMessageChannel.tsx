import MessageChannel from "./MessageChannel";

type DirectMessageChannel = MessageChannel & {
    users: number[]
}

/**
 * Get the other user of the DirectMessageChannel.
 */
export const getOtherUser = (id: number, channel: DirectMessageChannel): number => {
    console.log(channel)
    return channel.users.filter((user) => user !== id)[0]
}

export default DirectMessageChannel