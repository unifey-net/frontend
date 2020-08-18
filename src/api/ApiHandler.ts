import axios from "axios";
import store from "../redux/store";

/**
 * The base URL to the API.
 *
 * @type {string}
 */
const BASE_URL: string = "http://localhost:8077"; // incase you're curious, this is my local pc ip. wanted to do testing on my phone so lol 

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
});

const VERSION = "Alpha v0.4.0";
const CLIENT = "Unifey Web Client";

export type RequestStatus = {
    message: string,
    status: number
}

export const COMPLETE = 1
export const LOADING = 0
export const ERROR = -1

export { VERSION, CLIENT, API, BASE_URL }