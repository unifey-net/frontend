import { MESSAGES__GET_CHANNELS, MESSAGES__GROUP__CHANGE_DESCRIPTION, MESSAGES__GROUP__CHANGE_NAME, MESSAGES__GROUP__REMOVE_MEMBER, MESSAGES__INCOMING, MESSAGES__LOAD_HISTORY, MESSAGES__OUTGOING } from "./messages.actions"
import GroupMessageChannel from "../objects/GroupMessageChannel" 
import Message from "../objects/Message"
import IncomingMessageResponse from "../objects/IncomingMessageResponse"

type StoredMessageChannel = {
    messages: IncomingMessageResponse | Message[]
} & MessageChannel

/**
 * Add a message onto a channel in the state.
 * 
 * @param channel The channel to add the message onto.
 * @param message The message object to add onto the state.
 * @param state The current messages state.
 * @returns The new messages state.
 */
const addMessage = (message: Message, channel: number, state: any): any => {
    let channelObject = state[channel]

    if (channelObject) { // already initialized
        return {
            ...state,
            [channel]: {
                ...channelObject,
                messages: [
                    ...channelObject.messages,
                    message
                ]
            }
        }
    } else return { // shouldn't happen, but if does add.
        ...state,
        [channel]: {
            messages: [message]
        }
    }
}

/**
 * ex. state:
 * 1245: {
 *   incoming: [],
 *   outgoing: []
 * }
 */
const messages = (state: any = {}, action: any) => {
    switch (action.type) {
        case MESSAGES__GET_CHANNELS: {
            let { channels } = action.payload

            const newState = {
                ...state
            }

            for (let i = 0; channels.length > i; i++) {
                let channel = channels[i]

                newState[channel.id] = {
                    ...channel,
                    ...state[channel.id],
                    messages: []
                } as StoredMessageChannel
            }

            return newState
        }

        case MESSAGES__INCOMING: {
            return addMessage(action.payload, action.payload.channel.id, state)
        }

        case MESSAGES__OUTGOING: {
            return addMessage(action.payload, action.payload.channel, state)
        }

        case MESSAGES__GROUP__REMOVE_MEMBER: {
            const { channel, user } = action.payload

            return {
                ...state,
                [channel.id]: {
                    ...state[channel.id],
                    members: {
                        ...state[channel].filter(
                            (channelUser: number) => channelUser !== user
                        ),
                    },
                },
            }
        }

        case MESSAGES__GROUP__CHANGE_NAME: {
            const { channel, name } = action.payload 

            return {
                ...state,
                [channel.id]: {
                    ...state[channel.id],
                    name,
                },
            }
        }

        case MESSAGES__GROUP__CHANGE_DESCRIPTION: {
            const { channel, description } = action.payload

            return {
                ...state,
                [channel.id]: {
                    ...state[channel.id],
                    description,
                },
            }
        }

        // load history; loads to previous incoming messages :)
        case MESSAGES__LOAD_HISTORY: {
            const { channel, page, maxPage, messages } = action.payload

            return {
                ...state,
                [channel]: {
                    ...state[channel],
                    messages: [...messages, ...state[channel].messages],
                    page,
                    maxPage
                }
            }
        }

        default: {
            return state
        }
    }
}

export default messages
