import MessageChannel from "./MessageChannel";

type DirectMessageChannel = MessageChannel & {
    users: number[]
}

export default DirectMessageChannel