import { useLiveSocket } from "../live/Live"

type NotificationSocket = {
    deleteNotification: (id: number) => void
    readNotification: (id: number) => void
    unReadNotifiation: (id: number) => void
    deleteAllNotificiation: () => void
    readAllNotification: () => void
}

export const useNotificationActions = (): NotificationSocket => {
    const [sendAction] = useLiveSocket()

    return {
        deleteNotification: id => {
            sendAction({
                action: "CLOSE_NOTIFICATION",
                notification: id,
            })
        },
        readNotification: id => {
            sendAction({
                action: "READ_NOTIFICATION",
                notification: id,
            })
        },
        deleteAllNotificiation: () => {
            sendAction({
                action: "CLOSE_ALL_NOTIFICATION",
            })
        },
        readAllNotification: () => {
            sendAction({
                action: "READ_ALL_NOTIFICATION",
            })
        },
        unReadNotifiation: id => {
            sendAction({
                action: "UN_READ_NOTIFICATION",
                notification: id,
            })
        },
    }
}
