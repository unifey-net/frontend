export const NOTIF__RECEIVE = "NOTIF__RECEIVE"
export const NOTIF__MASS_RECEIVE = "NOTIF__MASS_RECEIVE"
export const NOTIF__SET_UNREAD = "NOTIF__SET_UNREAD"
export const NOTIF__SET_READ_STATUS = "NOTIF__SET_READ_STATUS"
export const NOTIF__SET_ALL_READ_STATUS = "NOTIF__SET_ALL_READ_STATUS"
export const NOTIF__SOCKET_CONNECT = "NOTIF__SOCKET_CONNECT"
export const NOTIF__SOCKET_DISCONNECT = "NOTIF__SOCKET_DISCONNECT"
export const NOTIF__SOCKET_AUTHENTICATE = "NOTIF__SOCKET_AUTHENTICATE"

/**
 * When the notification socket connects.
 */
export const notifSocketConnect = () => ({
    type: NOTIF__SOCKET_CONNECT,
    payload: { }
})

/**
 * Update the amount of notifications that are unread. 
 * 
 * @param unread The amount of unread notifications.
 */
export const notifSetUnread = (unread: number) => ({
    type: NOTIF__SET_UNREAD,
    payload: { unread }
})

/**
 * Set the read status for a notification.
 * 
 * @param id The ID of the notification to change.
 * @param read If it's either read or unread.
 */
export const notifSetReadStatus = (id: number, read: boolean) => ({
    type: NOTIF__SET_READ_STATUS,
    payload: { id, read }
})

/**
 * Mark all notifications as read.
 */
export const notifSetAllReadStatus = () => ({
    type: NOTIF__SET_ALL_READ_STATUS,
    payload: { }
})

/**
 * Receive a notification.
 * 
 * @param message The notification contents. 
 * @param id The ID of the notification.
 * @param date The date the notification was sent.
 */
export const notifReceive = (message: string, id: number, date: number) => ({
    type: NOTIF__RECEIVE,
    payload: { 
        message,
        id,
        date
    }
})

/**
 * The initial mass receive of notifications from the socket.
 * 
 * @param notifs The array of notifications.
 */
export const massNotifReceive = (notifs: any[]) => ({
    type: NOTIF__MASS_RECEIVE,
    payload: notifs,
})

/**
 * If the socket is authenticated.
 * 
 * @param expire When the token expires.
 */
export const notifSocketAuthenticate = (expire: number) => ({
    type: NOTIF__SOCKET_AUTHENTICATE,
    payload: {
        expire
    }
})

/**
 * When the socket is disconnected.
 */
export const notifSocketDisconnect = () => ({
    type: NOTIF__SOCKET_DISCONNECT,
    payload: { }
})
