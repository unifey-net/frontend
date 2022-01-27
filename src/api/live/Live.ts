import { useEffect, useState } from "react"
import toast from "react-hot-toast"
import Message from "../../components/messaging/objects/Message"
import store from "../../redux/store"
import { VERSION } from "../ApiHandler"
import History from "../History"
import { Member, Profile, signedIn, User } from "../user/User"
import { useAppDispatch, useAppSelector } from "../../util/Redux"
import { authenticateSocket, connectSocket, disconnectSocket, socketResponse } from "./live.redux"
import { importUser, logOut } from "../user/redux/auth.redux"
import { massReceiveNotif, receiveNotif, setUnread } from "../notification/Notifications"
import { getFriends, setOffline, setOnline } from "../friends/redux/friends.redux"
import {
    getChannels,
    incomingMessage,
    loadHistory,
    startTyping,
    stopTyping,
} from "../../components/messaging/redux/messages"
import { DefaultRootState, useSelector } from "react-redux"

const getUrl = (): string => {
    if (process.env.NODE_ENV === "production")
        return "wss://unifeyapi.ajkneisl.dev"
    else return "ws://localhost:8077"
}

export type SocketResponse = {
    response: any
    type: string
}

let socket = new WebSocket(`${getUrl()}/live`)

export const useLiveSocket = (): [(action: any) => void] => {
    const [lastPong, setLastPong] = useState(Date.now())
    const isAuthenticated = useAppSelector((state) => state.live.authenticated)
    const pingInterval = 15000

    const ping = () => {
        if (isAuthenticated) {
            console.trace("LIVE Socket: Ping")
            socket.send("ping")

            setTimeout(() => ping(), pingInterval)
        } else {
            console.trace("LIVE Socket: Ping delayed, waiting for authorization.")
            setTimeout(() => ping(), pingInterval)
        }
    }

    const dispatch = useAppDispatch()

    const sendAction = (action: any) => {
        if (Date.now() - lastPong > 1000 * 15) {
            console.error("LIVE Socket: Socket isn't responding.")
            return
        }

        socket.send(JSON.stringify(action))
    }

    useEffect(() => {
        socket.onopen = () => {
            dispatch(connectSocket())

            ping()

            if (signedIn()) {
                socket.send(`bearer ${store.getState().auth.token}`)

                sendAction({
                    action: "GET_USER"
                })

                // get all notifications and unread notifications (for number)
                sendAction({
                    action: "GET_ALL_NOTIFICATIONS",
                })

                sendAction({
                    action: "GET_ALL_UNREAD_NOTIFICATION",
                })

                sendAction({
                    action: "GET_CHANNELS"
                })

                sendAction({
                    action: "GET_FRIENDS"
                })
            }
        }

        socket.onclose = message => {
            console.error(`LIVE Socket Disconnected: %o`, message)
            dispatch(disconnectSocket({ error: message.code }))
        }

        socket.onerror = message => {
        }

        socket.onmessage = (message: any) => {
            const { response, type } = JSON.parse(
                message.data
            ) as SocketResponse

            console.debug("LIVE Socket: %o", { response, type })

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

                case "get_user": {
                    const { user, member, profile } = response as {
                        user: User
                        member: Member
                        profile: Profile
                    }

                    console.log(`LIVE Socket: Hello ${user.username}`)
                    dispatch(importUser( { user, member, profile }))

                    break
                }

                case "pong": {
                    console.debug("LIVE Socket: Received pong.")
                    setLastPong(Date.now())
                    break
                }

                case "authenticated": {
                    dispatch(authenticateSocket())
                    break
                }

                case "notification": {
                    dispatch(
                        receiveNotif({
                            message: response.message,
                            id: response.id,
                            date: response.date,
                        })
                    )
                    break
                }

                case "get_all_notifications": {
                    dispatch(massReceiveNotif({ notifications: response }))
                    break
                }

                case "get_all_unread_notification": {
                    dispatch(setUnread({ unread: response.count }))
                    break
                }

                case "friend_online": {
                    toast(`${response.friend} has come online!`)
                    dispatch(setOnline({ id: response.id }))
                    break
                }

                case "friend_offline": {
                    toast(`${response.friend} has gone offline!`)
                    dispatch(setOffline({ id: response.id }))
                    break
                }

                case "incoming_message": {
                    toast("New message!")

                    dispatch(
                        incomingMessage(
                            {
                                channel: response.channel,
                                message: response.message,
                                sentFrom: response.sentFrom,
                            },
                        )
                    )
                    break
                }

                case "start_typing": {
                    dispatch(startTyping({ channel: response.channel, user: response.user }))
                    break
                }

                case "stop_typing": {
                    dispatch(stopTyping({ channel: response.channel, user: response.user }))

                    break
                }

                case "message_history": {
                    const { channel, page, maxPage, messages } = response

                    dispatch(
                        loadHistory(
                            {
                                channel,
                                page,
                                maxPage,
                                messages,
                            },
                        )
                    )

                    break
                }

                case "channels": {
                    dispatch(
                        getChannels(
                            { channels: response.map((ch: any) => ({
                                    ...ch.channel,
                                    pageCount: ch.pageCount,
                                    messageCount: ch.messageCount,
                                }))}
                        )
                    )
                    break
                }

                case "get_friends": {
                    dispatch(getFriends({ friends: response }))
                    break
                }

                case "sign_out": {
                    History.push("/?msg=pswd")
                    dispatch(logOut())
                    window.location.reload()
                    break
                }
            }

            dispatch(socketResponse({ response }))
        }
        //eslint-disable-next-line
    }, [dispatch])

    return [sendAction]
}
