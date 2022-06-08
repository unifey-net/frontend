import React, { useEffect, useRef, useState } from "react"
import { useSelector } from "react-redux"
import { Button, Input, Spin, Tooltip } from "antd"
import { MdCheck, MdWarning } from "react-icons/md"
import { getEmail } from "../../../api/user/Email"
import { API } from "../../../api/ApiHandler"
import toast from "react-hot-toast"
import Property from "./Property"
import { useAppDispatch } from "../../../util/Redux"
import { verifyAccount } from "../../../api/user/redux/auth.redux"

const EmailProperty: React.FC = () => {
    const dispatch = useAppDispatch()

    const [input, setInput] = useState("")

    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")
    const [email, setEmail] = useState("")

    const onClick = async () => {
        setLoading(true)

        let email = input

        if (!email) email = ""

        let form = new FormData()

        form.append("email", email)

        let request = await API.put("/user/email", form)

        if (request.status === 200) {
            toast.success(
                "Your email has been updated. A verification request has been sent."
            )

            dispatch(verifyAccount({ status: false }))
            setEmail(email)
        } else {
            toast.error("There was an issue updating your email.")
            setError(request.data.payload)
        }

        setLoading(false)
    }

    const loadEmail = async () => {
        let request = await getEmail()

        if (request !== null && request.status === 200) {
            setEmail(request.data.payload)
        } else {
            setError("There was an issue loading your email.")
        }
    }

    useEffect(() => {
        loadEmail()
    }, [])

    let self = useSelector((store: any) => store.auth.user)

    const emailVerified = self.verified ? (
        <Tooltip title={"This email is verified."}>
            <MdCheck />
        </Tooltip>
    ) : (
        <Tooltip title={"This email is not verified."}>
            <MdWarning />
        </Tooltip>
    )

    return (
        <Property>
            <h3>Email</h3>

            {error !== "" && <p>{error}</p>}

            <div className="input">
                {email !== "" && (
                    <>
                        <Input
                            value={input}
                            onChange={val => setInput(val.target.value)}
                            addonAfter={emailVerified}
                            defaultValue={email}
                            id="email"
                            disabled={!self.verified}
                        />

                        <Button
                            ghost
                            loading={loading}
                            onClick={onClick}
                            disabled={!self.verified || input === email}
                        >
                            Update Email
                        </Button>
                    </>
                )}

                {email === "" && <Spin />}
            </div>
        </Property>
    )
}

export default EmailProperty
