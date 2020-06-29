import { LOG_IN, LOG_OUT } from "../actionType"

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
            location: ""
        },
        member: {
            members: []
        }
    },
};

/**
 * Save the state.
 */
const saveState = (state) => {
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
                user
            }

            saveState(newState)

            return newState
        }

        case LOG_OUT: {
            let newState = defaultState

            saveState(defaultState)

            return newState
        }

        default: {
            return state;
        }
    }
};

export default auth;
