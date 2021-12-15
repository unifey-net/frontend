import React, { Ref, useEffect, useRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Button, Input, Spin, Tooltip } from "antd"
import { MdCheck, MdWarning } from "react-icons/md"
import { getEmail } from "../../../api/user/Email"
import { API } from "../../../api/ApiHandler"
import toast from "react-hot-toast"
import { verifyAccount } from "../../../redux/actions/auth.actions"
import Property from "./Property"

const EmailProperty: React.FC = () => {
    const dispatch = useDispatch()

    const ref = useRef<Input>(null) 

    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")
    const [email, setEmail] = useState("")
    
    const onClick = async () => {
        setLoading(true);
        
        let email = ref.current?.input.value

        if (!email)
            email = ""

        let form = new FormData()

        form.append("email", email)

        let request = await API.put("/user/email", form)

        if (request.status === 200) {
            toast.success(
                "Your email has been updated. A verification request has been sent."
            )

            dispatch(verifyAccount(false))
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
                            ref={ref!!}
                            addonAfter={emailVerified}
                            defaultValue={email}
                            id="email"
                            disabled={!self.verified}
                        />

                        <Button
                            ghost
                            loading={loading}
                            onClick={onClick}
                            disabled={!self.verified || ref.current?.input.value === email}
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
