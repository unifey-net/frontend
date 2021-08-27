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

type AuthState = {
    isLoggedIn: boolean;
    token: string;
    expire: number;
    user: {
        username: string;
        id: string;
        verified: boolean;
        role: number;
        createdAt: number;
        profile: {
            description: string;
            discord: string;
            location: string;
        };
        member: {
            notifications: any[];
            members: any[]
        };
    };
}

let defaultState = (token: string = "") => {
    return {
        isLoggedIn: token !== "",
        token: token,
        expire: -1,
        user: {
            username: "",
            id: "-1",
            verified: false,
            role: -1,
            createdAt: -1,
            profile: {
                description: "",
                discord: "",
                location: "",
            },
            member: {
                members: [],
                notifications: [],
            },
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
const auth = (state: AuthState = defaultState(getTokenFromStorage()), action: any) => {
    switch (action.type) {
        case LOG_IN: {
            const { token } = action.payload

            let newState = {
                ...state,
                token: token,
                isLoggedIn: true
            }

            saveState(token)

            return newState
        }

        case AUTH__IMPORT_USER: {
            const { user } = action.payload

            return {
                ...state,
                user
            }
        }

        case LOG_OUT: {
            let newState = defaultState

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
                user: {
                    ...state.user,
                    member: {
                        ...state.user.member,
                        members: [...state.user.member.members, id],
                    },
                },
            }

            return newState
        }

        case LEAVE_COMMUNITY: {
            const { id } = action.payload

            let newMember = state.user.member.members

            const index = newMember.indexOf(id)
            if (index > -1) {
                newMember.splice(index, 1)
            }

            let newState = {
                ...state,
                user: {
                    ...state.user,
                    member: {
                        ...state.user.member,
                        members: newMember,
                    },
                },
            }

            return newState
        }

        case SUBSCRIBE_COMMUNITY: {
            const { id } = action.payload

            let newState = {
                ...state,
                user: {
                    ...state.user,
                    member: {
                        ...state.user.member,
                        notifications: [...state.user.member.notifications, id],
                    },
                },
            }

            return newState
        }

        case UN_SUBSCRIBE_COMMUNITY: {
            const { id } = action.payload

            let newNotifs = state.user.member.notifications

            const index = newNotifs.indexOf(id)
            if (index > -1) {
                newNotifs.splice(index, 1)
            }

            let newState = {
                ...state,
                user: {
                    ...state.user,
                    member: {
                        ...state.user.member,
                        notifications: newNotifs,
                    },
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
