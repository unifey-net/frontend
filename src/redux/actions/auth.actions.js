export const LOG_IN = "LOG_IN";
export const LOG_OUT = "LOG_OUT";

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
