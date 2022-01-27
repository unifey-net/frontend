import { useLiveSocket } from "../../api/live/Live"

/**
 * All of the available actions through the messaging modal.
 */
type MessagesSocket = {
    createGroupChat: (users: number[]) => void,
    loadMessageHistory: (channel: number, page: number) => void
    openDirectMessage: (user: number) => void
    groupChats: GroupChats
    messages: Messages
    typing: Typing
}

/**
 * Manage group chats.
 */
type GroupChats = {
    removeGroupChatMember: (user: number, channel: number) => void,
    changeName: (channel: number, name: string) => void,
    changeDescription: (channel: number, description: string) => void
}

/**
 * Manage messages.
 */
type Messages = {
    deleteMessage: (id: number) => void,
    sendMessage: (message: string, channel: number) => void
}

/**
 * Manage typing.
 */
type Typing = {
    startTyping: (channel: number) => void,
    stopTyping: (channel: number) => void
}

/**
 * Interact with the message socket.
 */
export const useMessageSocket = (): MessagesSocket => {
    const [sendAction] = useLiveSocket()

    return {
        openDirectMessage: (user) => {
            sendAction({
                action: "OPEN_DIRECT_MESSAGE",
                receiver: user
            })
        },
        loadMessageHistory: (channel, page) => {
            sendAction({
                action: "GET_MESSAGES",
                channel,
                page,
            })
        },
        createGroupChat: users => {
            sendAction({
                action: "CREATE_GROUP_CHAT",
                users: users,
            })
        },
        messages: {
            deleteMessage: (id) => {
                sendAction({
                    action: "DELETE_MESSAGE",
                    id
                })
            },
            sendMessage: (message, channel) => {
                sendAction({
                    action: "SEND_MESSAGE",
                    message,
                    channel
                })
            }
        },
        typing: {
            startTyping: (channel: number) => {
                sendAction({
                    action: "START_TYPING",
                    channel
                })
            },
            stopTyping: (channel: number) => {
                sendAction({
                    action: "STOP_TYPING",
                    channel
                })
            }
        },
        groupChats: {
            removeGroupChatMember: (user, channel) => {
                sendAction({
                    action: "MODIFY_GROUP_CHAT",
                    type: "REMOVE_MEMBER",
                    user,
                    channel
                })
            },
            changeName: (channel, name) => {
                sendAction({
                    action: "MODIFY_GROUP_CHAT",
                    type: "CHANGE_NAME",
                    channel,
                    name
                })
            },
            changeDescription: (channel, description) => {
                sendAction({
                    action: "MODIFY_GROUP_CHAT",
                    type: "CHANGE_DESCRIPTION",
                    channel,
                    description
                })
            }
        }
    }
}
