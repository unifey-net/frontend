import { SocketResponse } from "../../api/live/Live"
import { LIVE__SOCKET_AUTHENTICATE, LIVE__SOCKET_CONNECT, LIVE__SOCKET_DISCONNECT, LIVE__SOCKET_RESPONSE } from "../actions/live.actions"

type LiveState = {
    connected: boolean
    authenticated: boolean
    lastUsed: number
    lastMessage: SocketResponse
}

const defaultLiveState: LiveState = {
    connected: false,
    authenticated: false,
    lastUsed: -1,
    lastMessage: { type: "NONE", response: {} }
}

/**
 * Current live state
 */
const live = (
    state: LiveState = defaultLiveState,
    { type, payload }: any
) => {
    switch (type) {
        case LIVE__SOCKET_AUTHENTICATE: {
            return {
                ...state,
                authenticated: true,
            }
        }

        case LIVE__SOCKET_CONNECT: {
            return {
                ...state,
                connected: true,
            }
        }

        case LIVE__SOCKET_DISCONNECT: {
            return {
                ...state,
                connected: false,
                authenticated: false
            }
        }

        case LIVE__SOCKET_RESPONSE: {
            
            return {
                ...state,
                lastMessage: payload as SocketResponse
            }
        }

        default: {
            return state
        }
    }
}

export default live
