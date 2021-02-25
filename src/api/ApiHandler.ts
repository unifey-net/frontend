import axios from "axios"
import store from "../redux/store"

/**
 * The base URL to the API. Relies on the node env.
 *
 * @type {string}
 */
const BASE_URL: string = process.env.NODE_ENV === "production" ? "https://beta-api.unifey.net" : "http://localhost:8077"

/**
 * The Axios API.
 */
const API = axios.create({
    baseURL: BASE_URL,
    timeout: 5000,
    headers:
        store.getState().auth.token !== ""
            ? {
                  Authorization: "bearer " + store.getState().auth.token,
              }
            : {},
    validateStatus: () => true,
})

/**
 * The version, manually kept up to date :( 
 */
const VERSION = "Alpha v0.5.0"

export { VERSION, API, BASE_URL }
