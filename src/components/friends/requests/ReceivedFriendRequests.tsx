import { Empty, Spin } from "antd"
import React, { useState } from "react"
import toast from "react-hot-toast"
import { MdArrowDownward, MdArrowForward, MdCancel, MdCheckCircle, MdRefresh, MdSchedule } from "react-icons/md"
import { API, useApi } from "../../../api/ApiHandler"
import { FriendRequestsStyle } from "./FriendRequests"

const ReceivedFriendRequests: React.FC = () => {
    const [visible, setVisible] = useState(false)

    /**
     * Deny the friend request
     */
    const denyRequest  = async (id: number) => {
        let response = await API.delete(`/user/friends/requests/${id}`)

        if (response.status === 200) {
            toast.success("Successfully denied request.")
            refetch()
        } else {
            toast.error(response.data.payload)
        }
    }

    /**
     * Accept a friend request.
     */
    const acceptRequest = async (id: number) => {
        const form = new FormData()

        form.append("id", `${id}`)

        let response = await API.put(`/user/friends/requests`, form)
        
        if (response.status === 200) {
            toast.success("Successfully accepted request.")
            refetch()
        } else {
            toast.error(response.data.payload)
        }
    }

    const [{ data, loading, error }, refetch] = useApi("/user/friends/requests")

    if (loading) return <Spin />
    if (error) return <Empty />

    return (
        <FriendRequestsStyle>
            <h2>
                Incoming Friend Requests
                <button
                    className="visibility"
                    onClick={() => setVisible(prev => !prev)}
                >
                    {visible ? <MdArrowDownward /> : <MdArrowForward />}
                </button>
                <button onClick={() => refetch()}>
                    <MdRefresh />
                </button>
            </h2>

            {visible && (
                <>
                    {data.length > 0 ? (
                        <ul>
                            {data.map((data: any, index: number) => (
                                <div className="request" key={index}>
                                    <p>
                                        <button
                                            onClick={() =>
                                                denyRequest(
                                                    data.friendRequest.sentFrom
                                                )
                                            }
                                        >
                                            <MdCancel />
                                        </button>

                                        <button
                                            onClick={() =>
                                                acceptRequest(
                                                    data.friendRequest.sentFrom
                                                )
                                            }
                                        >
                                            <MdCheckCircle />
                                        </button>
                                    </p>
                                    <p>{data.receivedFrom.username}</p>
                                    <p>
                                        <MdSchedule />{" "}
                                        {new Date(
                                            data.friendRequest.sentAt
                                        ).toLocaleDateString()}
                                    </p>
                                </div>
                            ))}
                        </ul>
                    ) : (
                        <Empty
                            image={Empty.PRESENTED_IMAGE_SIMPLE}
                            description="No incoming friend requests."
                        />
                    )}
                </>
            )}
        </FriendRequestsStyle>
    )
}

export default ReceivedFriendRequests