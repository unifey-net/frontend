export const LIVE__SOCKET_CONNECT = "LIVE__SOCKET_CONNECT"
export const LIVE__SOCKET_DISCONNECT = "LIVE__SOCKET_DISCONNECT"
export const LIVE__SOCKET_AUTHENTICATE = "LIVE__SOCKET_AUTHENTICATE"
export const LIVE__SOCKET_RESPONSE = "LIVE__SOCKET_RESPONSE"

/**
 * Socket connect.
 */
export const liveSocketConnect = () => ({
    type: LIVE__SOCKET_CONNECT,
    payload: {},
})

/**
 * Socket disconnect.
 */
export const liveSocketDisconnect = (error: number) => ({
    type: LIVE__SOCKET_DISCONNECT,
    payload: { error }
})

/**
 * Socket authenticate.
 */
export const liveSocketAuthenticate = () => ({
    type: LIVE__SOCKET_AUTHENTICATE,
    payload: {},
})

/**
 * 
 * @param type 
 * @param response
 */
export const liveSocketRecent = (type: string, response: any) => ({
    type: LIVE__SOCKET_RESPONSE,
    payload: { type, response }
})
