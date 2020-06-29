import { BASE_URL } from "../ApiHandler"
import Cookies from "universal-cookie"
import { logIn, logOut } from "../../redux/action";
import React from "react"
import store from "../../redux/store"

const cookies = new Cookies();

/**
 * Get a user's profile picture URL.
 * @param {*} user 
 */
export const getImageUrl = (user) => {
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
 * Get a role name by it's ID
 * @param role
 * @returns {string}
 */
export const getRoleName = (role) => {
    switch (role) {
        case 1:
            return "Moderator"
        case 2:
            return "Administrator"

        default:
            return ""
    }
}

/**
 * Get a user's ID by their name.
 *
 * @param name
 * @param callback
 */
export const getIdByName = async (name) => {
    return await fetch(`${BASE_URL}/user/name/${name}`, {
        method: 'GET'
    }).then((resp) => resp.json())
}

/**
 * Get a user by their name.
 *
 * @param name
 * @param callback
 */
export const getUserByName = async (name) => {
    let id = await getIdByName(name)

    return getUserById(id.payload)
}

/**
 * Get a user by their id.
 *
 * @param id
 * @param callback
 */
export const getUserById = async (id) => {
    return await fetch(`${BASE_URL}/user/id/${id.toString()}`, {
        method: 'GET'
    })
}

/**
 * Get a token.
 *
 * @returns {null|*}
 */
export const getToken = () => {
    if (!signedIn)
        return null

    let token = store.getState().auth.token

    return token !== "" ? token : null
}

/**
 * When the token expires.
 */
export const getExpire = () => {
    return store.getState().auth.expire;
}

/**
 * If the self token is expired.
 */
export const isExpired = () => 
    new Date().getTime() >= getExpire()

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
export const signedIn = () => {
    return getToken() != null && !isExpired()
}

/**
 *
 * @param username
 * @param pass
 * @param callback
 */
export const login = async (username, pass) => {
    let formData = new FormData()

    formData.append("username", username)
    formData.append("password", pass)

    let auth = await fetch(`${BASE_URL}/authenticate`, {
        method: 'POST',
        body: formData
    })

    if (!auth.ok)
        return false

    let data = await auth.json()

    let user = data.user;
    let token = data.token;

    store.dispatch(logIn(token.token, user, new Date().getTime() + (1000 * 60 * 60 * 24)))

    return true
}