import React, { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Alert, Button, Input, Tooltip } from "antd"
import { API } from "../../../api/ApiHandler"
import toast from "react-hot-toast"
import Property from "./Property"
import { useAppDispatch } from "../../../util/Redux"
import { updateName } from "../../../api/user/redux/auth.redux"

const UsernameProperty: React.FC = () => {
    const dispatch = useAppDispatch()

    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")
    const [disabled, setDisabled] = useState(false)

    const updateUsername = async () => {
        setLoading(true)

        let username = (document.getElementById("username") as HTMLInputElement)
            .value

        let form = new FormData()

        form.append("username", username)

        let request = await API.put("/user/name", form)

        switch (request.status) {
            case 200: {
                toast.success("Your username has been updated!")
                dispatch(updateName({ name: username }))

                break
            }

            case 429: {
                const retryWhen = request.headers["x-rate-limit-reset"]
                const date = new Date(+retryWhen)

                setError(
                    `You can change your name at ${date.toLocaleString()}.`
                )

                setDisabled(true)

                break
            }

            default: {
                setError(request.data.payload)
                break
            }
        }

        setLoading(false)
    }

    let self = useSelector((store: any) => store.auth.user)

    return (
        <Property>
            <h3>Username</h3>

            {error !== "" && (
                <Alert className="error" type="error" message={error} />
            )}

            <div className="input">
                <Input
                    id="username"
                    disabled={!self.verified || disabled}
                    defaultValue={self.username}
                />

                <Button
                    ghost
                    loading={loading}
                    onClick={updateUsername}
                    disabled={!self.verified}
                >
                    Update Username
                </Button>
            </div>
        </Property>
    )
}

export default UsernameProperty
