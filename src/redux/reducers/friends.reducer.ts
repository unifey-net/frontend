import { FRIENDS__SET_OFFLINE, FRIENDS__SET_ONLINE } from "../actions/friends.actions"

type OnlineFriend = {
    name: string,
    id: number
}

type FriendsState = {
    online: OnlineFriend[]
}

const defaultState = {
    online: []
} as FriendsState

const friends = (state: FriendsState = defaultState, { payload, type }: any) => {
    switch (type) {
        case FRIENDS__SET_ONLINE: {
            const { id } = payload

            const index = state.online.findIndex((friend) => friend.id === id)

            // if they're already marked as online, don't adjust state.
            if (index !== -1)
                return state

            return {
                online: [...state.online, payload as OnlineFriend]
            }
        }

        case FRIENDS__SET_OFFLINE: {
            const { id } = payload

            const index = state.online.findIndex((friend) => friend.id === id)

            const newOnline = state.online

            newOnline.splice(index, 1)

            return {
                online: newOnline
            }
        }

        default: {
            return state
        }
    }
}

export default friends