import axios from "axios"
import { makeUseAxios } from "axios-hooks"
import store from "../redux/store"

/**
 * The base URL to the API. Relies on the node env.
 *
 * @type {string}
 */
const BASE_URL: string =
    process.env.NODE_ENV === "production"
        ? "https://unifey.ajkneisl.dev"
        : "http://localhost:8077"

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

export const useApi = makeUseAxios({
    axios: API
})

/**
 * The version, manually kept up to date :(
 */
const VERSION = "0.6.0"

export { VERSION, API, BASE_URL }
