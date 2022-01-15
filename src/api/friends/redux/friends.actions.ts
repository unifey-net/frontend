import { Friend } from "../objects/Friend"

export const FRIENDS__SET_ONLINE = "FRIENDS__SET_ONLINE"
export const FRIENDS__SET_OFFLINE = "FRIENDS__SET_OFFLINE"

export const FRIENDS__GET_FRIENDS = "FRIENDS__GET_FRIENDS"
export const FRIENDS__ADD_FRIEND = "FRIENDS__ADD_FRIEND"

export const setFriendOnline = (id: number, name: string) => ({
    type: FRIENDS__SET_ONLINE,
    payload: { id, name }
})

export const setFriendOffline = (id: number, name: string) => ({
    type: FRIENDS__SET_OFFLINE,
    payload: { id, name },
})

export const getFriends = (friends: Friend[]) => ({
    type: FRIENDS__GET_FRIENDS,
    payload: { friends }
})