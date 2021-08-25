import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import {
    massNotifReceive,
    notifReceive,
    notifSetUnread
} from "../../redux/actions/notifications.actions"
import { SocketResponse, useLiveSocket } from "../live/Live"

type NotificationSocket = {
    deleteNotification: (id: number) => void
    readNotification: (id: number) => void
    unReadNotifiation: (id: number) => void
    deleteAllNotificiation: () => void
    readAllNotification: () => void
}

export const useNotifications = () => {
    const [last, setLast] = useState({ type: "NONE", response: { } } as SocketResponse)
    const dispatch = useDispatch()
    const { type, response } = useSelector((state: any) => state.live.lastMessage) as SocketResponse

    if (type !== last.type && response !== last.response) {
        setLast({ type, response })

        switch (type.toLowerCase()) {
            case "notification": {
                dispatch(
                    notifReceive(response.message, response.id, response.date)
                )
                break
            }

            case "success_receive_all_notification": {
                dispatch(massNotifReceive(response))
                break
            }

            case "success_receive_unread": {
                dispatch(notifSetUnread(response.count))
                break
            }
        }
    }
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
