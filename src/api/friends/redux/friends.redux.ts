import { Friend } from "../objects/Friend"
import { FRIENDS__ADD_FRIEND, FRIENDS__GET_FRIENDS, FRIENDS__SET_OFFLINE, FRIENDS__SET_ONLINE } from "./friends.actions"

type FriendsState = {
    online: number[],
    friends: Friend[]
}

const defaultState = {
    online: [],
    friends: []
} as FriendsState

const friends = (state: FriendsState = defaultState, { payload, type }: any) => {
    switch (type) {
        case FRIENDS__SET_ONLINE: {
            const { id } = payload

            const index = state.online.findIndex((friend) => friend === id)

            // if they're already marked as online, don't adjust state.
            if (index !== -1)
                return state

            return {
                online: [...state.online, payload.id as number]
            }
        }

        case FRIENDS__SET_OFFLINE: {
            const { id } = payload

            const index = state.online.findIndex((friend) => friend === id)

            const newOnline = state.online

            newOnline.splice(index, 1)

            return {
                online: newOnline
            }
        }

        case FRIENDS__GET_FRIENDS: {
            return {
                ...state,
                friends: payload.friends
            }
        }

        case FRIENDS__ADD_FRIEND: {
            const friend = payload as Friend

            return {
                ...state,
                friends: [...state.friends, friend]
            }
        }

        default: {
            return state
        }
    }
}

export default friends