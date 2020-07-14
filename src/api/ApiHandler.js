import axios from "axios";
import { getToken } from "./user/User";
import store from "../redux/store";

/**
 * The base URL to the API.
 *
 * @type {string}
 */
export const BASE_URL = "http://localhost:8077";

export const API = axios.create({
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

export const VERSION = "Alpha v0.4.0";

export const CLIENT = "Unifey Web Client";