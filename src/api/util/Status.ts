/**
 * The status of a web request.
 *
 * @param status The status of the request.
 * @param message An optional message that describes the status.
 */
type Status = {
    status: number
    message?: string
}

export default Status

/**
 * A complete web request.
 */
export const COMPLETE = 1

/**
 * The web request is still loading.
 */
export const LOADING = 0

/**
 * There was an issue in the web request. The info on the error should be included in the status' message.
 */
export const ERROR = -1

/**
 * The default status.
 */
export const DEFAULT_STATUS = {
    status: LOADING,
    message: "",
} as Status
