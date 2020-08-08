import axios from "axios";
import { getToken } from "./user/User";
import store from "../redux/store";

/**
 * The base URL to the API.
 *
 * @type {string}
 */
const BASE_URL: string = "http://localhost:8077"; // incase you're curious, this is my local pc ip. wanted to do testing on my phone so lol 

const API = axios.create({
    baseURL: BASE_URL,
    responseType: "json",
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

export { VERSION, CLIENT, API, BASE_URL }