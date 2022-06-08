import React, { useEffect, useState } from "react"
import { Spin, message } from "antd"
import { LoadingOutlined } from "@ant-design/icons"
import { API } from "../../api/ApiHandler"
import { signedIn, getSelf } from "../../api/user/User"
import { useDispatch, useSelector } from "react-redux"
import toast from "react-hot-toast"
import { verifyAccount } from "../../api/user/redux/auth.redux"
import { useNavigate } from "react-router-dom"

/**
 * Verify an account's email.
 */
const Verify = () => {
    const nav = useNavigate()
    let dispatch = useDispatch()
    const [hasAttempted, setHasAttempted] = useState(false)

    const isAuthenticated = useSelector(
        (store: any) => store.live.authenticated
    )

    const attemptVerify = async (secret: string) => {
        let self = await getSelf()

        let form = new FormData()
        form.append("verify", secret)
        form.append("id", `${self.id}`)

        let request = await API.post("/email/verify", form)

        nav("/")
        if (request.status !== 200) {
            message.error("Failed to verify account.")
        } else {
            message.success("Successfully verified account!")
            dispatch(verifyAccount({ status: true }))
        }
    }

    useEffect(() => {
        if (isAuthenticated && !hasAttempted) {
            setHasAttempted(true)

            let verify = new URL(window.location.href).searchParams.get(
                "verify"
            )

            attemptVerify(verify === null ? "" : verify)
        }
        // eslint-disable-next-line
    }, [isAuthenticated])

    if (!signedIn()) {
        nav("/")
        toast.error("You must be signed in to verify your email!")

        return <></>
    }

    return <Spin indicator={<LoadingOutlined />} />
}

export default Verify
