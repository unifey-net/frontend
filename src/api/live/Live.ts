import { chain } from "lodash"
import { useEffect, useState } from "react"
import toast from "react-hot-toast"
import { useDispatch } from "react-redux"
import Message from "../../components/messaging/objects/Message"
import { getChannels, loadMessageHistory, messagesIncoming, startTyping, stopTyping } from "../../components/messaging/redux/messages.actions"
import { importUser, logOut } from "../../redux/actions/auth.actions"
import { getFriends, setFriendOnline } from "../friends/redux/friends.actions"
import {
    liveSocketAuthenticate,
    liveSocketConnect,
    liveSocketDisconnect,
    liveSocketRecent,
} from "../../redux/actions/live.actions"
import { massNotifReceive, notifReceive, notifSetUnread } from "../../redux/actions/notifications.actions"
import store from "../../redux/store"
import { VERSION } from "../ApiHandler"
import History from "../History"
import { Member, Profile, signedIn, User } from "../user/User"

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
    const pingInterval = 5000
    
    const ping = () => {
        console.debug("LIVE Socket: Ping")
        socket.send("ping")

        setTimeout(() => ping(), pingInterval)
    }

    const dispatch = useDispatch()

    const sendAction = (action: any) => {
        if (Date.now() - lastPong > 1000 * 15) {
            console.error("LIVE Socket: Socket isn't responding.")
            return
        }

        socket.send(JSON.stringify(action))
    }

    useEffect(() => {
        socket.onopen = () => {
            dispatch(liveSocketConnect())

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
            console.debug(`LIVE Socket Disconnected: %o`, message)
            dispatch(liveSocketDisconnect(message.code))
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
                    console.log(response)
                    const { user, member, profile } = response as {
                        user: User
                        member: Member
                        profile: Profile
                    }

                    console.log(`LIVE Socket: Hello ${user.username}`)
                    dispatch(importUser(user, member, profile))

                    break
                }

                case "pong": {
                    console.debug("LIVE Socket: Received pong.")
                    setLastPong(Date.now())
                    break
                }

                case "authenticated": {
                    dispatch(liveSocketAuthenticate())
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
                    break
                }

                case "get_all_notifications": {
                    dispatch(massNotifReceive(response))
                    break
                }

                case "get_all_unread_notification": {
                    dispatch(notifSetUnread(response.count))
                    break
                }

                case "friend_online": {
                    toast(`${response.friend} has come online!`)
                    dispatch(setFriendOnline(response.id, response.friend))
                    break
                }

                case "friend_offline": {
                    toast(`${response.friend} has gone offline!`)
                    dispatch(setFriendOnline(response.id, response.friend))
                    break
                }

                case "incoming_message": {
                    toast("New message!")

                    dispatch(
                        messagesIncoming(
                            response.channel,
                            response.message,
                            response.sentFrom
                        )
                    )
                    break
                }

                case "start_typing": {
                    dispatch(startTyping(response.channel.id, response.user))
                    break
                }

                case "stop_typing": {
                    dispatch(stopTyping(response.channel.id, response.user))

                    break
                }

                case "message_history": {
                    const { channel, page, maxPage, messages } = response

                    dispatch(
                        loadMessageHistory(
                            channel,
                            page,
                            maxPage,
                            messages as Message[]
                        )
                    )

                    break
                }

                case "channels": {
                    dispatch(
                        getChannels(
                            response.map((ch: any) => ({
                                ...ch.channel,
                                pageCount: ch.pageCount,
                                messageCount: ch.messageCount,
                            }))
                        )
                    )
                    break
                }

                case "get_friends": {
                    dispatch(getFriends(response))
                    break
                }

                case "sign_out": {
                    History.push("/?msg=pswd")
                    dispatch(logOut())
                    window.location.reload()
                    break
                }
            }
            
            store.dispatch(liveSocketRecent(type, response))
        }
        //eslint-disable-next-line
    }, [dispatch])

    return [sendAction]
}
