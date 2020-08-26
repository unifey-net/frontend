import { BASE_URL, API } from "../ApiHandler"
import { logIn, logOut } from "../../redux/actions/auth.actions";
import store from "../../redux/store"
import {joinComm, leaveComm} from "../../redux/actions/auth.actions"

export type User = {
    id: number,
    username: string,
    role: number,
    verified: boolean,
    createdAt: number,
    profile: any,
    member: any
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
    return `${BASE_URL}/user/name/${user}/picture`;
}

/**
 * Get self.
 * @param callback
 */
export const getSelf = async () =>  {
    return store.getState().auth.user;
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

    if (id.status !== 200)
        return null

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
export const getExpire = () => store.getState().auth.expire;

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
export const signedIn = () =>
    getToken() != null && !isExpired();

/**
 * Leave a community.
 * @param {*} id 
 */
export const leaveCommunity = async (id: number) => {
    let form = new FormData();

    form.append("id", `${id}`);

    let request = await API.delete("/community/manage", {
        headers: { },
        data: form,
    });

    if (request.status === 200) {
        store.dispatch(leaveComm(id));

        return request;
    } else {
        return request;
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