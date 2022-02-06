import { SocketResponse } from "../../api/live/Live"
import { createSlice, PayloadAction } from "@reduxjs/toolkit"

type LiveState = {
    connected: boolean
    authenticated: boolean
    lastUsed: number
    lastMessage: SocketResponse
    error: number
}

export const liveSlice = createSlice({
    name: "live",
    initialState: {
        connected: false,
        authenticated: false,
        lastUsed: -1,
        lastMessage: { type: "NONE", response: {} },
        error: -1
    } as LiveState,
    reducers: {
        /**
         * When the sockets authenticated. Starts at the beginning of connection (usually)
         */
        authenticateSocket: (state) => {
            state.authenticated = true
        },
        /**
         * When the socket initially connects
         */
        connectSocket: (state) => {
            state.connected = true
        },
        /**
         * When the socket disconnects.
         * Becomes unauthenticated and disconnected
         */
        disconnectSocket: (state, action: PayloadAction<{ error?: number }>) => {
            state.connected = false
            state.authenticated = false

            if (action.payload.error)
                state.error = action.payload.error
        },
        /**
         * When a new message comes into the socket.
         */
        socketResponse: (state, action: PayloadAction<{ response: SocketResponse }>) => {
            state.lastMessage = action.payload.response
        }
    }
})

export const { disconnectSocket, authenticateSocket, socketResponse, connectSocket } = liveSlice.actions
