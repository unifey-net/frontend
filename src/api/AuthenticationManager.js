import Cookies from 'universal-cookie';
import { BASE_URL } from "./ApiHandler";

const cookies = new Cookies();

/**
 * Get a token.
 *
 * @returns {null|*}
 */
export const getToken = () => {
    let token = cookies.get("token")

    if (token == null || token === "")
        return null

    return token
}

/**
 * Logout
 *
 * @returns {*}
 */
export const logout = () => {
    cookies.remove("token")
    localStorage.removeItem("self_data")
}

/**
 * If you're signed in.
 *
 * @returns {boolean}
 */
export const signedIn = () => {
    return getToken() != null
}

/**
 * Get a user by their name.
 *
 * @param name
 * @param callback
 */
export const getUserByName = async (name) => {
    let id = await getId(name)
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
    }).then((resp) => resp.json())
}

/**
 * Get a user's ID by their name.
 *
 * @param name
 * @param callback
 */
export const getId = async (name) => {
    return await fetch(`${BASE_URL}/user/name/${name}`, {
        method: 'GET'
    }).then((resp) => resp.json())
}

/**
 * Get self.
 * @param callback
 */
export const getSelf = async () => {
    let local = localStorage.getItem("self_data")

    if (local != null && local !== "") {
        return JSON.parse(local).payload;
    }

    return await fetch(`${BASE_URL}/user`, {
        method: 'GET',
        headers: {
            "Authorization": "bearer " + getToken()
        }
    })
        .then((content) => {
            content.text().then((str) => {
                localStorage.setItem("self_data", str);

                let data = JSON.parse(str).payload;

                return data
            });
        })
}

/**
 *
 * @param username
 * @param pass
 * @param callback
 */
export const login = (username, pass, callback) => {
    console.log("Attempting to sign in...")

    let formData = new FormData()

    formData.append("username", username)
    formData.append("password", pass)

    fetch(`${BASE_URL}/authenticate`, {
        method: 'POST',
        body: formData
    }).then((content) => {
        if (content.ok) {
            content.text()
                .then((str) => {
                    let token =  JSON.parse(str).token

                    cookies.set("token", token, {
                        path: '/',
                        sameSite: 'Strict'
                    })

                    callback(token)
                })
        } else
            callback(null)
    })
        .catch(() => {
            callback(null)
        })
}

