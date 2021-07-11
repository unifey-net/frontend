export const LOG_IN = "LOG_IN"
export const LOG_OUT = "LOG_OUT"

export const UPDATE_NAME = "UPDATE_NAME"
export const VERIFY_ACCOUNT = "VERIFY_ACCOUNT"

export const JOIN_COMMUNITY = "JOIN_COMMUNITY"
export const LEAVE_COMMUNITY = "LEAVE_COMMUNITY"

export const SUBSCRIBE_COMMUNITY = "SUBSCRIBE_COMMUNITY"
export const UN_SUBSCRIBE_COMMUNITY = "UN_SUBSCRIBE_COMMUNITY"

/**
 * Login
 * @param {*} token
 * @param {*} name
 * @param {*} id
 */
export const logIn = (token, user, expire) => ({
    type: LOG_IN,
    payload: {
        token,
        user,
        expire,
    },
})

/**
 * Log out.
 */
export const logOut = () => ({
    type: LOG_OUT,
    payload: {},
})

/**
 * Update self name.
 * @param {string} name
 */
export const updateName = name => ({
    type: UPDATE_NAME,
    payload: { name },
})

/**
 * Verify account
 */
export const verifyAccount = status => ({
    type: VERIFY_ACCOUNT,
    payload: { status },
})

/**
 * Leave a community
 * @param {*} id
 */
export const leaveComm = id => ({
    type: LEAVE_COMMUNITY,
    payload: { id },
})

/**
 * Join a community
 * @param {*} id
 */
export const joinComm = id => ({
    type: JOIN_COMMUNITY,
    payload: { id },
})

export const subscribeComm = id => ({
    type: SUBSCRIBE_COMMUNITY,
    payload: { id }
})

export const unSubscribeComm = id => ({
    type: UN_SUBSCRIBE_COMMUNITY,
    payload: { id }
})