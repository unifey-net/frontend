import axios from "axios"
import store from "../redux/store"

/**
 * The base URL to the API.
 *
 * @type {string}
 */
const BASE_URL: string = process.env.NODE_ENV === "production" ? "https://beta-api.unifey.net" : "http://localhost:8077"

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

const VERSION = "Alpha v0.5.0"
const CLIENT = "Unifey Web Client"

export type RequestStatus = {
    message: string
    status: number
}

export const COMPLETE = 1
export const LOADING = 0
export const ERROR = -1

export { VERSION, CLIENT, API, BASE_URL }
