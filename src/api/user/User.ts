import { BASE_URL, API } from "../ApiHandler"
import { logOut } from "../../redux/actions/auth.actions"
import store from "../../redux/store"
import { joinComm, leaveComm } from "../../redux/actions/auth.actions"
import Status, { COMPLETE, ERROR } from "../util/Status"
import { Cosmetic } from "./Cosmetics"

export type User = {
    id: number
    username: string
    role: number
    verified: boolean
    createdAt: number
}

export type Profile = {
    id: number
    description: string
    discord: string
    location: string
    cosmetics: Cosmetic[]
}

export type Member = {
    id: number
    member: number[]
    notifications: number[]
}

/**
 * Get a token.
 *
 * @returns {null|*}
 */
export const getToken = () => {
    let token = store.getState().auth.token

    return token !== "" ? token : null
}

/**
 * Get a user's profile picture URL.
 * @param {*} user
 */
export const getImageUrl = (user: string) => {
    return `${BASE_URL}/user/name/${user}/picture`
}

/**
 * Get self.
 * @param callback
 */
export const getSelf = async () => {
    return store.getState().auth.user
}

/**
 * Get a user's id by their name.
 * @param {string} name
 */
export const getUserIdByName = async (name: string) => {
    return await API.get(`/user/name/${name}`)
}

/**
 * Get a user by their name.
 * @param {string} name
 */
export const getUserByName = async (name: string) => {
    let id = await getUserIdByName(name)

    if (id.status !== 200) return null

    return await getUserById(id.data.payload)
}

/**
 * Get a user by their id.
 *
 * @param id
 * @param callback
 */
export const getUserById = async (id: number) => {
    return await API.get(`/user/id/${id}`)
}

/**
 * When the token expires.
 */
export const getExpire = () => store.getState().auth.expire

/**
 * If the self token is expired.
 */
export const isExpired = () => {
    let expired = getExpire() !== -1 && new Date().getTime() >= getExpire()

    if (expired) logout()

    return expired
}

/**
 * Logout
 *
 * @returns {*}
 */
export const logout = () => {
    store.dispatch(logOut())
}

/**
 * If you're signed in.
 *
 * @returns {boolean}
 */
export const signedIn = () => getToken() != null && !isExpired()

/**
 * Leave a community.
 * @param {*} id
 */
export const leaveCommunity = async (id: number) => {
    let form = new FormData()

    form.append("id", `${id}`)

    let request = await API.delete("/community/manage", {
        headers: {},
        data: form,
    })

    if (request.status === 200) {
        store.dispatch(leaveComm(id))

        return request
    } else {
        return request
    }
}

/**
 * Join a community.
 * @param {*} id
 */
export const joinCommunity = async (id: number) => {
    let form = new FormData()

    form.append("id", `${id}`)

    let request = await API.put("/community/manage", form)

    if (request.status === 200) {
        store.dispatch(joinComm(id))

        return request
    } else {
        return request
    }
}

/**
 * Send a request to login.
 *
 * @param username The inputted username.
 * @param password The inputted password.
 * @param captcha The possibly blank captcha.
 */
export const login = async (
    username: string,
    password: string,
    remember: boolean,
    captcha: string
): Promise<[Status, any?]> => {
    const data = new FormData()

    if (process.env.NODE_ENV === "production") {
        if (captcha === "") {
            return [
                { status: ERROR, message: "Please fill out the reCAPTCHA!" },
            ]
        }

        data.append("captcha", captcha)
    }

    data.append("username", username)
    data.append("password", password)
    data.append("remember", `${remember}`)

    let request = await API.post(`/authenticate`, data)

    if (request.status === 200) {
        return [{ status: COMPLETE }, request.data]
    } else {
        return [
            {
                status: ERROR,
                message: request.data.payload,
            }
        ]
    }
}
