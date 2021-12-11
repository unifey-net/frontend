import { useLiveSocket } from "../../api/live/Live"

type MessagesSocket = {
    createGroupChat: (users: number[]) => void,
    loadMessageHistory: (channel: number, page: number) => void
    groupChatSettings: GroupChatSettings
}

type GroupChatSettings = {
    removeGroupChatMember: (user: number, channel: number) => void,
    changeName: (channel: number, name: string) => void,
    changeDescription: (channel: number, description: string) => void
}

export const useMessageSocket = (): MessagesSocket => {
    const [sendAction] = useLiveSocket()

    return {
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
        groupChatSettings: {
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
