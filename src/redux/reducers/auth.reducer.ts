import { Member, Profile, User } from "../../api/user/User"
import {
    LOG_IN,
    LOG_OUT,
    UPDATE_NAME,
    VERIFY_ACCOUNT,
    JOIN_COMMUNITY,
    LEAVE_COMMUNITY,
    UN_SUBSCRIBE_COMMUNITY,
    SUBSCRIBE_COMMUNITY,
    AUTH__IMPORT_USER,
} from "../actions/auth.actions"

export type AuthState = {
    isLoggedIn: boolean
    token: string
    expire: number
    user: User
    member: Member
    profile: Profile
}

let defaultState = (token: string = "") => {
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

/**
 * Stores the user's name.
 * @param {*} state
 * @param {*} action
 */
const auth = (
    state: AuthState = defaultState(getTokenFromStorage()),
    action: any
) => {
    switch (action.type) {
        case LOG_IN: {
            const { token } = action.payload

            let newState = {
                ...state,
                token: token,
                isLoggedIn: true,
            }

            saveState(token)

            return newState
        }

        case AUTH__IMPORT_USER: {
            const { user, member, profile } = action.payload

            return {
                ...state,
                user,
                member,
                profile
            }
        }

        case LOG_OUT: {
            let newState = defaultState()

            saveState("")

            return newState
        }

        case UPDATE_NAME: {
            const { name } = action.payload

            let newState = {
                ...state,
                user: {
                    ...state.user,
                    username: name,
                },
            }

            return newState
        }

        case VERIFY_ACCOUNT: {
            const { status } = action.payload

            let newState = {
                ...state,
                user: {
                    ...state.user,
                    verified: status,
                },
            }

            return newState
        }

        case JOIN_COMMUNITY: {
            const { id } = action.payload

            let newState = {
                ...state,
                member: {
                    ...state.member,
                    members: [...state.member.member, id],
                },
            }

            return newState
        }

        case LEAVE_COMMUNITY: {
            const { id } = action.payload

            let newMember = state.member.member

            const index = newMember.indexOf(id)
            if (index > -1) {
                newMember.splice(index, 1)
            }

            let newState = {
                ...state,
                member: {
                    ...state.member,
                    members: newMember,
                },
            }

            return newState
        }

        case SUBSCRIBE_COMMUNITY: {
            const { id } = action.payload

            let newState = {
                ...state,
                member: {
                    ...state.member,
                    notifications: [...state.member.notifications, id],
                },
            }

            return newState
        }

        case UN_SUBSCRIBE_COMMUNITY: {
            const { id } = action.payload

            let newNotifs = state.member.notifications

            const index = newNotifs.indexOf(id)
            if (index > -1) {
                newNotifs.splice(index, 1)
            }

            let newState = {
                ...state,
                member: {
                    ...state.member,
                    notifications: newNotifs,
                },
            }

            return newState
        }

        default: {
            return state
        }
    }
}

export default auth
