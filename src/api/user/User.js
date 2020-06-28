import { BASE_URL } from "../ApiHandler"
import Cookies from "universal-cookie"

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

                let data = JSON.parse(str).payload;

                if (data === "Invalid token")
                    return null

                localStorage.setItem("self_data", str);
                
                return data
            });
        })
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
    let token = cookies.get("token")

    if (token == null || token === "")
        return null

    return token
}

/**
 * When the token expires.
 */
export const getExpire = () => {
    let expire = cookies.get("expire")

    if (expire == null || expire === "")
        return null
    
        return expire
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
    cookies.remove("token")
    localStorage.removeItem("self_data")
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

    return await fetch(`${BASE_URL}/authenticate`, {
        method: 'POST',
        body: formData
    }).then((content) => {
        if (content.ok) {
            content.json().then((json) => {
                let token = json.token;

                cookies.set("token", token, {
                    path: "/",
                    sameSite: "Strict",
                });

                cookies.set("expire", new Date().getTime() + (1000 * 60 * 60 * 24), {
                    path: "/",
                    sameSite: "Strict"
                })

                return token;
            });
        } else return null
    })
}