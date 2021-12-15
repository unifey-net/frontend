import React, { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import Property from "./Property"
import { Alert, Button, Input } from "antd"
import toast from "react-hot-toast"
import { API } from "../../../api/ApiHandler"
import { logOut } from "../../../redux/actions/auth.actions"

const PasswordProperty: React.FC = () => {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")

    const updatePassword = async () => {
        setLoading(true)

        let username = (document.getElementById("password") as HTMLInputElement)
            .value

        let form = new FormData()

        form.append("password", username)

        let request = await API.put("/user/password", form)

        switch (request.status) {
            case 200: {
                toast.success("Your password has successfully been changed!")
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
            <h3>Password</h3>

            {error !== "" && (
                <Alert style={{maxWidth: "550px"}} className="error" type="error" message={error} />
            )}

            <div className="input">
                <Input.Password
                    id="password"
                    disabled={!self.verified}
                />

                <Button
                    ghost
                    loading={loading}
                    onClick={updatePassword}
                    disabled={!self.verified}
                >
                    Update Password
                </Button>
            </div>
        </Property>
    )
}

export default PasswordProperty
