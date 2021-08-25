import { LoadingOutlined } from "@ant-design/icons"
import { Spin } from "antd"
import React from "react"
import { useSelector } from "react-redux"
import styled from "styled-components"

const NotificationStyle = styled.div``

const Notifications = () => {
    const unreadCount = useSelector((store: any) => store.notifications.unread)

    if (unreadCount === -1) {
        return <Spin indicator={<LoadingOutlined/>} />
    }

    return <NotificationStyle>
        { unreadCount === 0 ? <p>You have no unread notifications.</p> : <p>You have {unreadCount} unread notifications!</p> }
    </NotificationStyle>
}

export default Notifications