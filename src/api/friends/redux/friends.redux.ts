import { Friend } from "../objects/Friend"
import { createSlice, PayloadAction } from "@reduxjs/toolkit"

type FriendsState = {
    online: number[],
    friends: Friend[]
}

const defaultState = {
    online: [],
    friends: []
} as FriendsState

export const friendsSlice = createSlice({
    name: "friends",
    initialState: defaultState,
    reducers: {
        /**
         * Set a friend to be online.
         */
        setOnline: (state, action: PayloadAction<{ id: number }>) => {
            const { id } = action.payload

            const index = state.online.findIndex((friend) => friend === id)

            if (index !== -1)
                return state

            state.online = [...state.online, id]
        },
        /**
         * Set a friend to be offline.
         */
        setOffline: (state, action: PayloadAction<{ id: number }>) => {
            const { id } = action.payload

            const index = state.online.findIndex((friend) => friend === id)

            if (index !== -1)
                state.online = state.online.splice(index, 1)
        },
        /**
         * Upload friends.
         */
        getFriends: (state, action: PayloadAction<{ friends: Friend[] }>) => {
            state.friends = action.payload.friends
        },
        /**
         * Add friend
         */
        addFriend: (state, action: PayloadAction<{ friend: Friend }>) => {
            state.friends = [...state.friends, action.payload.friend]
        }
    }
})

export const { addFriend, setOffline, setOnline, getFriends } = friendsSlice.actions
