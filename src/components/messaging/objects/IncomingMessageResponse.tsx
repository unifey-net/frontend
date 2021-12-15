import DirectMessageChannel from "./DirectMessageChannel";
import GroupMessageChannel from "./GroupMessageChannel";
import Message from "./Message";

type IncomingMessageResponse = {
    channel: DirectMessageChannel | GroupMessageChannel,
    message: Message,
    sentFrom: { first: number, second: string }
}

export default IncomingMessageResponse