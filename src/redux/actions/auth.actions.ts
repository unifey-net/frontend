import { Member, Profile, User } from "../../api/user/User"

export const LOG_IN = "LOG_IN"
export const LOG_OUT = "LOG_OUT"

export const UPDATE_NAME = "UPDATE_NAME"
export const VERIFY_ACCOUNT = "VERIFY_ACCOUNT"

export const JOIN_COMMUNITY = "JOIN_COMMUNITY"
export const LEAVE_COMMUNITY = "LEAVE_COMMUNITY"

export const SUBSCRIBE_COMMUNITY = "SUBSCRIBE_COMMUNITY"
export const UN_SUBSCRIBE_COMMUNITY = "UN_SUBSCRIBE_COMMUNITY"

export const AUTH__IMPORT_USER = "AUTH__IMPORT_USER"

/**
 * Login
 * @param {*} token
 * @param {*} name
 * @param {*} id
 */
export const logIn = (token: string) => ({
    type: LOG_IN,
    payload: {
        token
    },
})

export const importUser = (user: User, member: Member, profile: Profile) => ({
    type: AUTH__IMPORT_USER,
    payload: { user, member, profile }
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
export const updateName = (name: string) => ({
    type: UPDATE_NAME,
    payload: { name },
})

/**
 * Verify account
 */
export const verifyAccount = (status: boolean) => ({
    type: VERIFY_ACCOUNT,
    payload: { status },
})

/**
 * Leave a community
 * @param {*} id
 */
export const leaveComm = (id: number) => ({
    type: LEAVE_COMMUNITY,
    payload: { id },
})

/**
 * Join a community
 * @param {*} id
 */
export const joinComm = (id: number) => ({
    type: JOIN_COMMUNITY,
    payload: { id },
})

/**
 * Subscribe to notifications for a community.
 * 
 * @param id The ID of the community.
 */
export const subscribeComm = (id: number) => ({
    type: SUBSCRIBE_COMMUNITY,
    payload: { id }
})

/**
 * Unsubscribe to notifications for a community.
 * 
 * @param id The ID of the community.
 */
export const unSubscribeComm = (id: number) => ({
    type: UN_SUBSCRIBE_COMMUNITY,
    payload: { id }
})