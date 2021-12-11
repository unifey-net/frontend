import DirectMessageChannel from "../objects/DirectMessageChannel"
import GroupMessageChannel from "../objects/GroupMessageChannel"
import Message from "../objects/Message"

export const MESSAGES__INCOMING = "MESSAGES__INCOMING"
export const MESSAGES__NEW_CHANNEL = "MESSAGES__NEW_CHANNEL"
export const MESSAGES__GET_CHANNELS = "MESSAGES__GET_CHANNELS"
export const MESSAGES__OUTGOING = "MESSAGES__OUTGOING"
export const MESSAGES__LOAD_HISTORY = "MESSAGES__LOAD_HISTORY"

export const MESSAGES__GROUP__CHANGE_NAME = "MESSAGES__GROUP__CHANGE_NAME"
export const MESSAGES__GROUP__CHANGE_DESCRIPTION = "MESSAGES__GROUP__CHANGE_DESCRIPTION"
export const MESSAGES__GROUP__REMOVE_MEMBER = "MESSAGES__GROUP__REMOVE_MEMBER"

export const messagesIncoming = (
    channel: DirectMessageChannel | GroupMessageChannel,
    message: Message,
    sentFrom: { first: number, second: string }
) => ({
    type: MESSAGES__INCOMING,
    payload: { channel, message, sentFrom },
})

export const loadMessageHistory = (channel: number, page: number, maxPage: number, messages: Message[]) => ({
    type: MESSAGES__LOAD_HISTORY,
    payload: { channel, page, maxPage, messages }
})

export const messagesOutgoing = (message: string, channel: number, time: number) => ({
    type: MESSAGES__OUTGOING,
    payload: { message, channel, time },
})

export const getChannels = (channels: (DirectMessageChannel | GroupMessageChannel)[]) => ({
    type: MESSAGES__GET_CHANNELS,
    payload: { channels }
})

export const removeGroupChatMember = (channel: GroupMessageChannel, user: number) => ({
    type: MESSAGES__GROUP__REMOVE_MEMBER,
    payload: { channel, user }
})

export const changeGroupChatName = (channel: GroupMessageChannel, name: string) => ({
    type: MESSAGES__GROUP__CHANGE_NAME,
    payload: { channel, name }
})

export const changeGroupChatDescription = (channel: GroupMessageChannel, description: string) => ({
    type: MESSAGES__GROUP__CHANGE_DESCRIPTION,
    payload: { channel, description }
})
