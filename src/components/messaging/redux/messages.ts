import Message from "../objects/Message"
import IncomingMessageResponse from "../objects/IncomingMessageResponse"
import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import MessageChannel from "../objects/MessageChannel"
import DirectMessageChannel from "../objects/DirectMessageChannel"
import GroupMessageChannel from "../objects/GroupMessageChannel"

type StoredMessageChannel = {
    messages: IncomingMessageResponse | Message[]
} & MessageChannel

export const messageSlices = createSlice({
    name: "messages",
    initialState: {} as any,
    reducers: {
        /**
         * When channels are uploaded.
         */
        getChannels: (
            state,
            action: PayloadAction<{
                channels: (DirectMessageChannel | GroupMessageChannel)[]
            }>
        ) => {
            const channels = action.payload.channels

            for (let i = 0; channels.length > i; i++) {
                let channel = channels[i]

                state[channel.id] = {
                    ...channel,
                    ...state[channel.id],
                    messages: [],
                    typing: [],
                } as StoredMessageChannel
            }
        },
        /**
         * When a message comes in from the socket.
         */
        incomingMessage: (
            state,
            action: PayloadAction<{
                message: Message
                channel: DirectMessageChannel | GroupMessageChannel
                sentFrom: { first: number; second: string }
            }>
        ) => {
            const { message, channel } = action.payload

            state[channel.id].messages = [
                ...state[message.channel],
                action.payload,
            ]
        },
        /**
         * When a message is sent.
         */
        outgoingMessage: (
            state,
            action: PayloadAction<{
                message: string
                channel: number
                time: number
            }>
        ) => {
            const { channel } = action.payload

            state[channel].messages = [...state[channel], action.payload]
        },
        /**
         * Remove someone from a group chat.
         */
        groupRemoveMember: (
            state,
            action: PayloadAction<{
                channel: DirectMessageChannel | GroupMessageChannel
                user: number
            }>
        ) => {
            const { channel, user } = action.payload

            state[channel.id].members = state[channel.id].members.filter(
                (channelUser: number) => channelUser !== user
            )
        },
        /**
         * Change a group chat's name.
         */
        groupChangeName: (
            state,
            action: PayloadAction<{
                channel: DirectMessageChannel | GroupMessageChannel
                name: string
            }>
        ) => {
            const { channel, name } = action.payload

            state[channel.id].name = name
        },
        /**
         * Change a group chat's description.
         */
        groupChangeDescription: (
            state,
            action: PayloadAction<{
                channel: DirectMessageChannel | GroupMessageChannel
                description: string
            }>
        ) => {
            const { channel, description } = action.payload

            state[channel.id].description = description
        },
        /**
         * Load the history. Loads previous to the current messages.
         * @param state
         * @param action
         */
        loadHistory: (
            state,
            action: PayloadAction<{
                channel: DirectMessageChannel | GroupMessageChannel
                page: number
                maxPage: number
                messages: Message[]
            }>
        ) => {
            const { channel, page, maxPage, messages } = action.payload

            state[channel.id] = {
                ...state[channel.id],
                messages: [...messages, ...state[channel.id].messages],
                maxPage,
                page,
            }
        },
        /**
         * When a user stops typing.
         */
        stopTyping: (
            state,
            action: PayloadAction<{
                channel: DirectMessageChannel | GroupMessageChannel
                user: { username: string; id: number }
            }>
        ) => {
            const {
                user: { id },
                channel,
            } = action.payload

            state[channel.id].typing = state[channel.id].typing.filter(
                (filterUser: { id: number; username: string }) =>
                    filterUser.id !== id
            )
        },
        /**
         * When a user starts typing.
         */
        startTyping: (
            state,
            action: PayloadAction<{
                channel: DirectMessageChannel | GroupMessageChannel
                user: { username: string; id: number }
            }>
        ) => {
            const { user, channel } = action.payload

            if (
                state[channel.id].typing.filter(
                    (filterUser: { id: number }) => user.id === filterUser.id
                ).length > 0
            ) {
                return state
            } else {
                state[channel.id].typing = [...state[channel.id].typing, user]
            }
        },
    },
})

export const {
    startTyping,
    stopTyping,
    outgoingMessage,
    incomingMessage,
    groupChangeDescription,
    groupChangeName,
    groupRemoveMember,
    loadHistory,
    getChannels,
} = messageSlices.actions
