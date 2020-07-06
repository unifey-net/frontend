import { LOG_IN, LOG_OUT, INFO, CLEAR, WARNING, SUCCESS, ERROR, THEME_DARK, THEME_LIGHT, THEME_AUTO } from "./actionType";

/**
 * Login
 * @param {*} token 
 * @param {*} name 
 * @param {*} id 
 */
export const logIn = (token, user, expire) => ({
    type: LOG_IN,
    payload: {
        token,
        user,
        expire
    }
});

/**
 * Log out.
 */
export const logOut = () => ({
    type: LOG_OUT,
    payload: {}
})

export const alertInfo = (message) => ({
    type: INFO,
    payload: { message }
})

export const alertSuccess = (message) => ({
    type: SUCCESS,
    payload: { message },
});

export const alertWarning = (message) => ({
    type: WARNING,
    payload: { message },
});

export const alertError = (message) => ({
    type: ERROR, 
    payload: { message }
})

export const clearAlert = () => ({
    type: CLEAR,
    payload: {}
})

export const themeDark = (stay) => ({
    type: THEME_DARK,
    payload: {
        stay
    }
})

export const themeLight = (stay) => ({
    type: THEME_LIGHT,
    payload: {
        stay
    }
})

export const themeAuto = (stay) => ({
    type: THEME_AUTO,
    payload: {
        stay
    }
})