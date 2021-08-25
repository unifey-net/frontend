export const FRIENDS__SET_ONLINE = "FRIENDS__SET_ONLINE"
export const FRIENDS__SET_OFFLINE = "FRIENDS__SET_OFFLINE"

export const setFriendOnline = (id: number, name: string) => ({
    type: FRIENDS__SET_ONLINE,
    payload: { id, name }
})

export const setFriendOffline = (id: number, name: string) => ({
    type: FRIENDS__SET_OFFLINE,
    payload: { id, name },
})