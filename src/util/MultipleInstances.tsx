import React from "react"
import ErrorPage from "./ErrorPage"
import { useAppDispatch } from "./Redux"
import { logOut } from "../api/user/redux/auth.redux"
import { API } from "../api/ApiHandler"
import toast from "react-hot-toast"
import { Modal } from "antd"

type SessionData = {
    owner: number
    connected: boolean
    sessionLength: number
}

const MultipleInstances = () => {
    const dispatch = useAppDispatch()
    const [modal, contextHolder] = Modal.useModal()

    const signOut = () => {
        dispatch(logOut())
        window.location.reload()
    }

    const logOutSession = async () => {
        const req = await API.delete("/manage-live/logout")

        if (req.status === 200) {
            toast.loading("Successfully exited other session, reloading in 3 seconds...")

            setTimeout(() => window.location.reload(), 3000)
        } else {
            toast.error(
                "There was an issue closing out of the other session. Try reloading."
            )
        }
    }

    const viewSession = async () => {
        const req = await API.get<SessionData>("/manage-live/view")

        if (req.status === 200) {
            const date = new Date(req.data.sessionLength)

            modal.info({
                title: "Unifey Session",
                content: (
                    <div>
                        <p>
                            <b>Owner</b> — {req.data.owner}
                            <br />
                            <b>Session Length:</b> — {date.getUTCHours()}h{" "}
                            {date.getMinutes()}m {date.getSeconds()}s
                        </p>
                    </div>
                ),
            })
        } else {
            toast.error("There is no other connected session.")
        }
    }

    return (
        <ErrorPage
            content={
                <div>
                    <p>
                        {contextHolder}
                        We currently don't support more than one Unifey instance
                        at once due to{" "}
                        <a
                            href={
                                "https://github.com/unifey-net/frontend/issues/35"
                            }
                        >
                            this issue
                        </a>
                        .
                    </p>
                    <div className="controls">
                        <div>
                            <button onClick={() => signOut()}>Sign out</button>
                        </div>
                        <div>
                            <button onClick={() => logOutSession()}>
                                Close other session(s)
                            </button>
                        </div>
                        <div>
                            <button onClick={() => viewSession()}>
                                View other session(s)
                            </button>
                        </div>
                    </div>
                </div>
            }
            code={2035}
        />
    )
}

export default MultipleInstances
