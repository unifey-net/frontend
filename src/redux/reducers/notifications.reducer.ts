import { NOTIF__DELETE, NOTIF__DELETE_ALL, NOTIF__MASS_RECEIVE, NOTIF__RECEIVE, NOTIF__SET_ALL_READ_STATUS, NOTIF__SET_READ_STATUS, NOTIF__SET_UNREAD, NOTIF__SOCKET_AUTHENTICATE, NOTIF__SOCKET_CONNECT, NOTIF__SOCKET_DISCONNECT } from "../actions/notifications.actions"

type NotificationsAuthenticationState = {
    authenticated: boolean,
    tokenExpires: number
}

type NotificationsState = {
    connected: boolean,
    authenticated: NotificationsAuthenticationState,
    notifications: any[],
    // so redux updates
    notificationCount: number,
    unread: number
}

const defaultNotificationState: NotificationsState = {
    connected: false,
    authenticated: {
        authenticated: false,
        tokenExpires: -1
    },
    notifications: [],
    notificationCount: 0,
    unread: -1
}

/**
 * Current notification state
 */
const notifications = (
    state: NotificationsState = defaultNotificationState,
    action: any
) => {
    switch (action.type) {
        case NOTIF__SOCKET_CONNECT: {
            return {
                ...state,
                connected: true,
            }
        }

        case NOTIF__SOCKET_DISCONNECT: {
            return {
                ...state,
                connected: false,
            }
        }

        case NOTIF__SOCKET_AUTHENTICATE: {
            return {
                ...state,
                authenticated: {
                    authenticated: true,
                    tokenExpires: action.payload.expire,
                },
            }
        }

        case NOTIF__RECEIVE: {
            const { id, message, date } = action.payload

            return {
                ...state,
                notifications: [...state.notifications, { id, message, date }],
                notificationCount: state.notificationCount + 1
            }
        }

        case NOTIF__MASS_RECEIVE: {
            return {
                ...state,
                notifications: [...state.notifications, ...action.payload],
                notificationCount: action.payload.length + state.notificationCount
            }
        }

        case NOTIF__SET_ALL_READ_STATUS: {
            const newNotifs = state.notifications.map((notif) => ({ ...notif, read: true }))
                         
            return {
                ...state,
                notifications: [...newNotifs],
                unread: 0
            }
        }

        case NOTIF__SET_READ_STATUS: {
            const { id, read } = action.payload
            
            let notifIndex = -1
            const notifs = state.notifications as any[]

            notifs.find((notif, i) => {
                console.log(notif.id === id)
                if (notif.id === id) {
                    notifIndex = i
                    return true
                }

                return false
            })

            let newUnread = state.unread
            if (notifIndex !== -1) {
                let current = notifs[notifIndex].read

                notifs[notifIndex].read = read
                
                if (read !== current) {
                    if (read) {
                        newUnread -= 1
                    } else {
                        newUnread += 1
                    }
                }
            }

            return {
                ...state,
                notifications: notifs,
                unread: newUnread
            }
        }

        case NOTIF__DELETE_ALL: {
            return {
                ...state,
                notifications: [],
                notificationCount: 0,
                unread: 0
            }
        }

        case NOTIF__DELETE: {
            const { id } = action.payload

            let deleteIndex = -1
            let notifs = state.notifications
            let count = state.notificationCount

            notifs.filter((obj, index) => {
                if (obj.id === id) {
                    deleteIndex = index
                    return true
                }

                return true
            })

            if (deleteIndex !== -1) {
                notifs.splice(deleteIndex, 1)
                count -= 1
            }

            return {
                ...state,
                notifications: notifs,
                notificationCount: count
            }
        }

        case NOTIF__SET_UNREAD: {
            const { unread } = action.payload

            return {
                ...state,
                unread
            }
        }

        default: {
            return state
        }
    }
}

export default notifications