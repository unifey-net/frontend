import { message } from "antd"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import {
    liveSocketAuthenticate,
    liveSocketConnect,
    liveSocketDisconnect,
    liveSocketRecent,
} from "../../redux/actions/live.actions"
import {
    massNotifReceive,
    notifReceive,
    notifSetUnread,
} from "../../redux/actions/notifications.actions"
import store from "../../redux/store"
import { VERSION } from "../ApiHandler"
import Status, { COMPLETE, ERROR, LOADING } from "../util/Status"

const getUrl = (): string => {
    if (process.env.NODE_ENV === "production")
        return "wss://unifeyapi.ajkneisl.dev"
    else return "ws://localhost:8077"
}

export type SocketResponse = {
    response: any
    type: string
}

type LiveSocket = {
    recentAction: any
}

let socket = new WebSocket(`${getUrl()}/live`)

export const useLiveSocket = (): [(action: any) => void] => {
    const dispatch = useDispatch()

    const sendAction = (action: any) => {
        socket.send(JSON.stringify(action))
    }

    useEffect(() => {
        socket.onopen = () => {
            dispatch(liveSocketConnect())

            socket.send(`bearer ${store.getState().auth.token}`)

            // get all notifications and unread notifications (for number)
            sendAction({
                action: "GET_ALL_NOTIFICATION",
            })

            sendAction({
                action: "GET_ALL_UNREAD_NOTIFICATION",
            })
        }

        socket.onclose = message => {
            console.log(`LIVE Socket Disconnected: %o`, message)
            dispatch(liveSocketDisconnect())
        }

        socket.onerror = message => {
            console.log(message)
        }

        socket.onmessage = (message: any) => {
            const { response, type } = JSON.parse(
                message.data
            ) as SocketResponse

            console.log("LIVE Socket: %o", { response, type })

            switch (type.toLowerCase()) {
                case "init": {
                    const { version, frontend } = response

                    console.log(
                        `${version}: Expects frontend ${frontend} (${
                            VERSION === frontend
                                ? "OK"
                                : `NOT OK, FOUND ${VERSION}`
                        })`
                    )
                    break
                }

                case "authenticated": {
                    dispatch(liveSocketAuthenticate())
                    break
                }
            }

            
            
            store.dispatch(liveSocketRecent(type, response))
        }
    }, [dispatch])

    return [sendAction]
}
