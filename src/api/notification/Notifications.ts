import { createSlice, PayloadAction } from "@reduxjs/toolkit"

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

export const notificationsSlice = createSlice({
    name: "notifications",
    initialState: {
        connected: false,
        authenticated: {
            authenticated: false,
            tokenExpires: -1
        },
        notifications: [],
        notificationCount: 0,
        unread: -1
    } as NotificationsState,
    reducers: {
        receiveNotif: (state, action: PayloadAction<{ id: number, message: string, date: number }>) => {
            const { id, message, date } = action.payload

            state.notifications = [...state.notifications, { id, message, date }]
            state.notificationCount++
        },
        massReceiveNotif: (state, action: PayloadAction<{ notifications: any[] }>) => {
            state.notifications = [...state.notifications, ...action.payload.notifications]
            state.notificationCount += action.payload.notifications.length
        },
        setAllReadStatus: (state) => {
            state.notifications = state.notifications.map((notif) => notif.read = true)
        },
        setReadStatus: (state, action: PayloadAction<{ id: number, read: boolean}>) => {
            const { id, read } = action.payload

            let notifIndex = -1

            state.notifications.find((notif, i) => {
                if (notif.id === id) {
                    notifIndex = i
                    return true
                }

                return false
            })

            if (notifIndex !== -1) {
                let current = state.notifications[notifIndex].read
                state.notifications[notifIndex].read = read

                if (read !== current) {
                    if (read) {
                        state.unread--
                    } else {
                        state.unread++
                    }
                }
            }
        },
        deleteAllNotifications: (state) => {
            state.notifications = []
            state.notificationCount = 0
            state.unread = 0
        },
        deleteNotification: (state, action: PayloadAction<{ id: number }>) => {
            let { id } = action.payload

            let deleteIndex = -1

            state.notifications.filter((obj: any, index: number) => {
                if (obj.id === id) {
                    deleteIndex = index
                    return true
                }

                return false
            })

            if (deleteIndex !== -1) {
                state.notifications = state.notifications.splice(deleteIndex, 1)
                state.notificationCount -= 1
            }
        },
        setUnread: (state, action: PayloadAction<{ unread: number }>) => {
            state.unread = action.payload.unread
        }
    }
})

export const { setUnread, deleteNotification, deleteAllNotifications, massReceiveNotif, receiveNotif, setAllReadStatus, setReadStatus } = notificationsSlice.actions
