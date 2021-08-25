import { Empty, Spin } from "antd"
import React, { useState } from "react"
import toast from "react-hot-toast"
import {
    MdAdd,
    MdArrowDownward,
    MdArrowForward,
    MdCancel,
    MdRefresh,
    MdSchedule,
    MdTimer,
} from "react-icons/md"
import { API, useApi } from "../../../api/ApiHandler"
import useAddFriendModal from "./AddFriendModal"
import { FriendRequestsStyle } from "./FriendRequests"

/**
 * The sent friend request on the friends page.
 */
const SentFriendRequests: React.FC = () => {
    const [modal, setModalVisible] = useAddFriendModal(() => refetch())

    /**
     * Delete a request. When successfully deleted, the requests are refetched.
     * @param id The person you're sending the request to.
     */
    const deleteRequest = async (id: number) => {
        let response = await API.delete(`/user/friends/requests/sent/${id}`)

        if (response.status === 200) {
            toast.success("Successfully deleted request.")
            refetch()
        } else {
            toast.error(response.data.payload)
        }
    }

    const [visible, setVisible] = useState(false)
    const [{ data, loading, error }, refetch] = useApi(
        "/user/friends/requests/sent"
    )

    if (loading) return <Spin />
    if (error) return <Empty />

    return (
        <FriendRequestsStyle>
            {modal}

            <h2>
                Sent Friend Requests
                <button
                    className="visibility"
                    onClick={() => setVisible(prev => !prev)}
                >
                    {visible ? <MdArrowDownward /> : <MdArrowForward />}
                </button>
                <button onClick={() => refetch()}>
                    <MdRefresh />
                </button>
                <button onClick={() => setModalVisible()}>
                    <MdAdd />
                </button>
            </h2>

            {visible && (
                <>
                    {data.length > 0 ? (
                        <ul>
                            {data.map((data: any, index: number) => (
                                <div className="request" key={index}>
                                    <p>
                                        <button onClick={() => deleteRequest(data.friendRequest.sentTo)}>
                                            <MdCancel />
                                        </button>
                                    </p>
                                    <p>{data.sentTo.username}</p>
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
                            description="No outgoing friend requests."
                        />
                    )}
                </>
            )}
        </FriendRequestsStyle>
    )
}

export default SentFriendRequests
