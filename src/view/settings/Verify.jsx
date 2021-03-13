import React, { useEffect } from "react"
import { Spin, message } from "antd"
import { LoadingOutlined } from "@ant-design/icons"
import { API } from "../../api/ApiHandler"
import { signedIn, getSelf } from "../../api/user/User"
import History from "../../api/History"
import { useDispatch } from "react-redux"
import { verifyAccount } from "../../redux/actions/auth.actions"

/**
 * Verify an account's email.
 */
export default function Verify() {
    let dispatch = useDispatch()

    useEffect(() => {
        const attemptVerify = async secret => {
            let self = await getSelf()

            let form = new FormData()
            form.append("verify", secret)
            form.append("id", self.id)

            let request = await API.post("/email/verify", form)

            History.push("/")
            if (request.status !== 200) {
                message.error("Failed to verify account.")
            } else {
                message.success("Successfully verified account!")
                dispatch(verifyAccount(true))
            }
        }

        let verify = new URL(window.location).searchParams.get("verify")

        attemptVerify(verify)
    }, [dispatch])

    if (!signedIn()) {
        History.push("/")
        message.error("You must be signed into verify your account!")

        return <></>
    }

    return <Spin indicator={<LoadingOutlined />} />
}
