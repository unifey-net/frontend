import { useDispatch } from "react-redux"
import {
    massNotifReceive,
    notifReceive,
    notifSetUnread,
    notifSocketAuthenticate,
    notifSocketConnect,
    notifSocketDisconnect,
} from "../../redux/actions/notifications.actions"
import store from "../../redux/store"

const getUrl = (): string => {
    if (process.env.NODE_ENV === "production")
        return "wss://unifey.ajkneisl.dev"
    else return "ws://localhost:8077"
}

type NotificationsSocket = {}

type SocketResponse = {
    response: any
    type: string
}

let socket: WebSocket | undefined = undefined

export const useNotificationSocket = (): [(id: number) => void] => {
    const dispatch = useDispatch()

    if (!socket) {
        socket = new WebSocket(`${getUrl()}/notifications/live`)

        socket.onopen = () => {
            dispatch(notifSocketConnect())

            socket!!.send(
                JSON.stringify({
                    action: "AUTHENTICATE",
                    token: store.getState().auth.token,
                })
            )

            // get all notifications and unread notifications (for number)
            socket!!.send(
                JSON.stringify({
                    action: "GET_ALL_NOTIFICATION"
                })
            )

            socket!!.send(
                JSON.stringify({
                    action: "GET_ALL_UNREAD_NOTIFICATION"
                })
            )
        }

        socket.onclose = message => {
            dispatch(notifSocketDisconnect())
        }

        socket.onerror = message => {
            console.log(message)
        }

        socket.onmessage = (message: any) => {
            const { response, type } = JSON.parse(
                message.data
            ) as SocketResponse

            console.log("Notification Socket: %o", { response, type })

            switch (type) {
                case "authenticated": {
                    dispatch(notifSocketAuthenticate(response.expire))
                    break
                }

                case "notification": {
                    dispatch(
                        notifReceive(
                            response.message,
                            response.id,
                            response.date
                        )
                    )
                    break;
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

    return [
        (id) => {
            console.log("Deleting notification: " + id)
            socket!!.send(
                JSON.stringify({
                    action: "CLOSE_NOTIFICATION",
                    notification: id,
                })
            )
        },
    ]
}
