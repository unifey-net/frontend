export const NOTIF__RECEIVE = "NOTIF__RECEIVE"
export const NOTIF__MASS_RECEIVE = "NOTIF__MASS_RECEIVE"
export const NOTIF__SET_UNREAD = "NOTIF__SET_UNREAD"
export const NOTIF__SOCKET_CONNECT = "NOTIF__SOCKET_CONNECT"
export const NOTIF__SOCKET_DISCONNECT = "NOTIF__SOCKET_DISCONNECT"
export const NOTIF__SOCKET_AUTHENTICATE = "NOTIF__SOCKET_AUTHENTICATE"

const notifSocketConnect = () => ({
    type: NOTIF__SOCKET_CONNECT,
    payload: { }
})

const notifSetUnread = (unread: number) => ({
    type: NOTIF__SET_UNREAD,
    payload: { unread }
})

const notifReceive = (message: string, id: number, date: number) => ({
    type: NOTIF__RECEIVE,
    payload: { 
        message,
        id,
        date
    }
})

const massNotifReceive = (notifs: any[]) => ({
    type: NOTIF__MASS_RECEIVE,
    payload: notifs,
})

const notifSocketAuthenticate = (expire: number) => ({
    type: NOTIF__SOCKET_AUTHENTICATE,
    payload: {
        expire
    }
})

const notifSocketDisconnect = () => ({
    type: NOTIF__SOCKET_DISCONNECT,
    payload: { }
})

export { notifSocketConnect, notifSocketDisconnect, notifSocketAuthenticate, notifReceive, massNotifReceive, notifSetUnread }
