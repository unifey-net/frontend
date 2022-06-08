import MessageChannel from "./MessageChannel"

type GroupMessageChannel = MessageChannel & {
    owner: number
    name: string
    description: string
    members: number[]
}

export default GroupMessageChannel
