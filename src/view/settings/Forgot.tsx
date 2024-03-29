import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { Input, Button, Alert } from "antd"
import { API } from "../../api/ApiHandler"
import useForgotModal from "../../components/settings/hooks/useForgotModal"

/**
 * The /settings/forgot page. This will provide an input that allows you to input either an email or a username. When successfull, an email will be sent to the user.
 * When the email is received, a link will be provided to redirect back with this page with a token.
 */
const Forgot = () => {
    let [modal, toggle] = useForgotModal()

    const [error, setError] = useState("")
    const [sent, setSent] = useState(false)

    const [loading, setLoading] = useState(false)

    const [input, setInput] = useState("")

    useEffect(() => {
        let verify = new URL(window.location.toString()).searchParams.get(
            "verify"
        )

        if (verify && verify !== "") {
            toggle(verify)
        }
    }, [toggle])

    const resetPassword = async () => {
        if (input === "") {
            setError("Please insert an email or username?")
            return
        }

        const form = new FormData()

        form.append("input", input)

        setLoading(true)

        let request = await API.put("/email/forgot", form)

        if (request.status !== 200) {
            setError(request.data.payload)
        } else {
            setSent(true)
        }

        setLoading(false)
    }

    return (
        <div className="flex flex-col items-center justify-center">
            {modal}

            <h1 className="text-6xl">Forgot Password</h1>
            <p>Enter the username or email of the account.</p>

            <div>
                {sent && (
                    <>
                        <Alert
                            message={"An email has been sent."}
                            description={
                                <>
                                    Make sure to check your spam.
                                    <br />
                                    If you didn't receieve the email, you can
                                    try again in five minutes.
                                    <br /> If nothing seems to be working, you
                                    can always{" "}
                                    <Link to="/support">contact us</Link>.
                                </>
                            }
                            showIcon
                            type="info"
                        />
                        <div className="mb-4"></div>
                    </>
                )}

                {error !== "" && (
                    <>
                        <Alert
                            message={"Uh oh."}
                            description={error}
                            showIcon
                            type="error"
                        />
                        <div className="mb-4"></div>
                    </>
                )}
            </div>

            <Input
                value={input}
                onChange={inp => setInput(inp.target.value)}
                placeholder="Username or email."
                style={{ width: "15%" }}
                id="email"
            />

            <br style={{ marginTop: "1rem" }} />

            <Button onClick={resetPassword} type="primary" loading={loading}>
                Reset password
            </Button>
        </div>
    )
}

export default {
    exact: true,
    path: "/settings/forgot",
    component: Forgot,
}