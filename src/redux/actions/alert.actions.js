export const CLEAR = "ALERT_CLEAR";
export const ERROR = "ALERT_ERROR";
export const SUCCESS = "ALERT_SUCCESS";
export const INFO = "ALERT_INFO";
export const WARNING = "ALERT_WARNING";

export const alertInfo = (message) => ({
    type: INFO,
    payload: { message },
});

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
    payload: { message },
});

export const clearAlert = () => ({
    type: CLEAR,
    payload: {},
});