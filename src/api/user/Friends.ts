import { useState } from "react"
import toast from "react-hot-toast"
import { useDispatch, useSelector } from "react-redux"
import { setFriendOnline, setFriendOffline } from "../../redux/actions/friends.actions"
import store from "../../redux/store"
import { API } from "../ApiHandler"
import { SocketResponse } from "../live/Live"
import { signedIn, User } from "./User"

export type Friend = {
    friend: number
    friendedAt: number
    friendDetails: User
}

export const useFriends = () => {
    const dispatch = useDispatch()

    const [last, setLast] = useState({
        type: "NONE",
        response: {},
    } as SocketResponse)

    const { type, response } = useSelector(
        (state: any) => state.live.lastMessage
    ) as SocketResponse

    if (type !== last.type && response !== last.response) {
        setLast({ type, response })

        switch (type.toLowerCase()) {
            case "friend_online": {
                toast(`${response.friend} has come online!`)
                dispatch(setFriendOnline(response.id, response.friend))
                break
            }

            case "friend_offline": {
                toast(`${response.friend} has gone offline!`)
                dispatch(setFriendOffline(response.id, response.friend))
                break;
            }
        }
    }
}