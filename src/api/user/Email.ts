import { signedIn } from "./User"
import { API } from "../ApiHandler"

/**
 * Get the logged in user's verification status.
 */
export const getEmailVerificationStatus = async () => {
    if (!signedIn()) return null

    return await API.get("/email/status?type=0")
}

/**
 * Resend the email.
 * 
 * @param type 0: email verification, 1: password reset
 */
export const resend = async (type: number): Promise<number> => {
    if (!signedIn()) return -1

    let form = new FormData()

    form.append("type", `${type}`)

    const request = await API.post("/email/resend", form)

    if (request.status === 429) {
        return +request.headers["x-rate-limit-reset"]     
    } else return 0
}

export const getEmail = async () => {
    if (!signedIn()) return null

    return API.get("/email")
}
