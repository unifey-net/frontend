import { BASE_URL, API } from "../ApiHandler"
import { logIn, logOut } from "../../redux/actions/auth.actions";
import store from "../../redux/store"


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
 * Get a user's id by their name.
 * @param {string} name 
 */
export const getUserIdByName = async (name) => {
    return await API.get(`/user/name/${name}`)
}

/**
 * Get a user by their name.
 * @param {string} name 
 */
export const getUserByName = async (name) => {
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
export const getUserById = async (id) => {
    return await API.get(`/user/id/${id}`)
}

/**
 * When the token expires.
 */
export const getExpire = () => store.getState().auth.expire;

/**
 * If the self token is expired.
 */
export const isExpired = () => new Date().getTime() >= getExpire()

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
 *
 * @param username
 * @param pass
 * @param callback
 */
export const login = async (username, password) => {
    let data = new FormData()

    data.set("username", username)
    data.set("password", password);

    let auth = await API.post(`/authenticate`, data)

    if (auth.status !== 200)
        return false

    let user = auth.data.user;
    let token = auth.data.token;

    store.dispatch(logIn(
        token.token,
        user, 
        new Date().getTime() + (1000 * 60 * 60 * 24)
    ))

    return true
}