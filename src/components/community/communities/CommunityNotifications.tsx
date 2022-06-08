import { LoadingOutlined } from "@ant-design/icons"
import { Spin } from "antd"
import React from "react"
import { useState } from "react"
import toast from "react-hot-toast"
import { MdNotifications, MdNotificationsOff } from "react-icons/md"
import { useDispatch, useSelector } from "react-redux"
import styled from "styled-components"
import { API } from "../../../api/ApiHandler"
import {
    subscribeCommunity,
    unSubscribeCommunity,
} from "../../../api/user/redux/auth.redux"

const CommunityNotificationButton = styled.button`
    background-color: transparent;
    border: none;
    cursor: pointer;
`

const CommunityNotifications: React.FC<{ community: number }> = ({
    community,
}) => {
    const dispatch = useDispatch()
    const notifications = useSelector(
        (store: any) => store.auth.member.notifications
    ).includes(community)

    const [loading, setLoading] = useState(false)

    const onClick = async () => {
        setLoading(true)
        let form = new FormData()

        form.append("id", `${community}`)

        if (notifications) {
            let request = await API.delete(`/community/manage/notifications`, {
                headers: {},
                data: form,
            })

            if (request.status !== 200) {
                toast("There was an issue un-subscribing to notifications.")
            } else {
                dispatch(unSubscribeCommunity({ id: community }))
            }
        } else {
            let request = await API.put(`/community/manage/notifications`, form)

            if (request.status !== 200) {
                toast("There was an issue subscribing to notifications.")
            } else {
                dispatch(subscribeCommunity({ id: community }))
            }
        }

        setLoading(false)
    }

    return (
        <CommunityNotificationButton onClick={onClick}>
            {loading && <Spin indicator={<LoadingOutlined />} />}
            {!loading &&
                (notifications ? <MdNotifications /> : <MdNotificationsOff />)}
        </CommunityNotificationButton>
    )
}

export default CommunityNotifications
