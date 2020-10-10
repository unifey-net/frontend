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
 */
export const resend = async (type: string, id: string) => {
    if (!signedIn()) return null

    let form = new FormData()

    form.append("type", type)
    form.append("id", id)

    return await API.post("/email/resend", form)
}

export const getEmail = async () => {
    if (!signedIn()) return null

    return API.get("/email")
}
