import { Member, Profile, User } from "../User"
import { createSlice, PayloadAction } from "@reduxjs/toolkit"

export type AuthState = {
    isLoggedIn: boolean
    token: string
    expire: number
    user: User
    member: Member
    profile: Profile
}

let defaultState = (token: string = ""): AuthState => {
    return {
        isLoggedIn: token !== "",
        token: token,
        expire: -1,
        user: {
            id: -1,
            username: "",
            role: -1,
            verified: false,
            createdAt: 0,
        },
        member: {
            id: -1,
            member: [],
            notifications: [],
        },
        profile: {
            id: 0,
            description: "",
            discord: "",
            location: "",
            cosmetics: [],
        },
    }
}

/**
 * Save the state.
 */
const saveState = (token: string) => {
    let json = JSON.stringify({ token })

    localStorage.setItem("token", json)
}

/**
 * Get the token
 */
const getTokenFromStorage = () => {
    let local = localStorage.getItem("token")

    if (local !== null && local !== "" && local !== undefined)
        return JSON.parse(local).token

    return ""
}

export const authSlice = createSlice({
    name: "auth",
    initialState: defaultState(getTokenFromStorage()),
    reducers: {
        /**
         * When a user log's in. Saves the token to the browser storage.
         */
        logIn: (state, action: PayloadAction<{ token: string }>) => {
            state.token = action.payload.token
            saveState(action.payload.token)
        },
        /**
         * When the user logs out.
         */
        logOut: state => {
            Object.assign(state, defaultState())
            saveState("")
        },
        /**
         * When a user object is grabbed from the websocket.
         */
        importUser: (
            state,
            action: PayloadAction<{
                user: User
                member: Member
                profile: Profile
            }>
        ) => {
            const { member, user, profile } = action.payload

            state.member = member
            state.user = user
            state.profile = profile
        },
        /**
         * When the user updates their name in the settings.
         */
        updateName: (state, action: PayloadAction<{ name: string }>) => {
            state.user.username = action.payload.name
        },
        /**
         * When the user verifies their account. (Through email link, or unverifies through changing their email)
         */
        verifyAccount: (state, action: PayloadAction<{ status: boolean }>) => {
            state.user.verified = action.payload.status
        },
        /**
         * When a user joins a community.
         */
        joinCommunity: (state, action: PayloadAction<{ id: number }>) => {
            state.member.member = [...state.member.member, action.payload.id]
        },
        /**
         * When a user leaves a community.
         */
        leaveCommunity: (state, action: PayloadAction<{ id: number }>) => {
            const index = state.member.member.indexOf(action.payload.id)

            if (index > -1) {
                state.member.member.splice(index, 1)
            }
        },
        /**
         * When a user subscribes to a communities notifications.
         */
        subscribeCommunity: (state, action: PayloadAction<{ id: number }>) => {
            state.member.notifications = [
                ...state.member.notifications,
                action.payload.id,
            ]
        },
        /**
         * When a user unsubscribes from a communities notifications.
         */
        unSubscribeCommunity: (
            state,
            action: PayloadAction<{ id: number }>
        ) => {
            const index = state.member.notifications.indexOf(action.payload.id)

            if (index > -1) {
                state.member.notifications = state.member.notifications.splice(
                    index,
                    1
                )
            }
        },
    },
})

export const {
    unSubscribeCommunity,
    subscribeCommunity,
    leaveCommunity,
    joinCommunity,
    verifyAccount,
    updateName,
    importUser,
    logOut,
    logIn,
} = authSlice.actions
