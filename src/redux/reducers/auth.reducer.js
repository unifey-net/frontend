import {
    LOG_IN,
    LOG_OUT,
    UPDATE_NAME,
    VERIFY_ACCOUNT,
    JOIN_COMMUNITY,
    LEAVE_COMMUNITY,
} from "../actions/auth.actions"

let defaultState = {
    isLoggedIn: false,
    token: "",
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
        },
    },
}

/**
 * Save the state.
 */
const saveState = state => {
    let json = JSON.stringify(state)

    localStorage.setItem("selfState", json)
}

/**
 * The inital state for an auth
 */
const getInitialState = () => {
    let local = localStorage.getItem("selfState")

    if (local !== null && local !== "" && local !== undefined)
        return JSON.parse(local)

    return defaultState
}

/**
 * Stores the user's name.
 * @param {*} state
 * @param {*} action
 */
const auth = (state = getInitialState(), action) => {
    switch (action.type) {
        case LOG_IN: {
            const { token, user, expire } = action.payload

            let newState = {
                ...state,
                isLoggedIn: true,
                expire,
                token,
                user,
            }

            saveState(newState)

            return newState
        }

        case LOG_OUT: {
            let newState = defaultState

            saveState(defaultState)

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

            saveState(newState)

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

            saveState(newState)

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

            saveState(newState)

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

            saveState(newState)

            return newState
        }

        default: {
            return state
        }
    }
}

export default auth
