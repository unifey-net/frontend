import { NOTIF__MASS_RECEIVE, NOTIF__RECEIVE, NOTIF__SET_UNREAD, NOTIF__SOCKET_AUTHENTICATE, NOTIF__SOCKET_CONNECT, NOTIF__SOCKET_DISCONNECT } from "../actions/notifications.actions"

type NotificationsAuthenticationState = {
    authenticated: boolean,
    tokenExpires: number
}

type NotificationsState = {
    connected: boolean,
    authenticated: NotificationsAuthenticationState,
    notifications: number[],
    unread: number
}

const defaultNotificationState: NotificationsState = {
    connected: false,
    authenticated: {
        authenticated: false,
        tokenExpires: -1
    },
    notifications: [],
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
            }
        }

        case NOTIF__MASS_RECEIVE: {
            return {
                ...state,
                notifications: [...state.notifications, ...action.payload],
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