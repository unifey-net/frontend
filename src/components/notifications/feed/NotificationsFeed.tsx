import { Empty } from "antd"
import React from "react"
import { useDispatch, useSelector } from "react-redux"
import styled from "styled-components"
import { useNotificationSocket } from "../../../api/notification/NotificationsSocket"
import { notifSetAllReadStatus, notifSetReadStatus } from "../../../redux/actions/notifications.actions"
import FeedNotification from "./SingleNotification"

const FeedStyle = styled.div`
    display: flex;
    flex-direction: column;
    gap: 8px;

    button {
        background-color: transparent;
        margin-bottom: 8px;
        border: solid white 1px;
        cursor: pointer;
    }

    button:disabled {
        cursor: not-allowed;
    }
`

const NotificationsFeed: React.FC = () => {
    const notifications = useSelector(
        (store: any) => store.notifications.notifications
    )
    const unreadCount = useSelector((store: any) => store.notifications.unread)
    const dispatch = useDispatch()

    const { readNotification, readAllNotification, unReadNotifiation } = useNotificationSocket()

    const markAllAsRead = () => {
        readAllNotification()
        dispatch(notifSetAllReadStatus())
    }

    const markReadStatus = (id: number, read: boolean) => {
        if (read) {
            unReadNotifiation(id)
        } else {
            readNotification(id)
        }
        dispatch(notifSetReadStatus(id, read))
    }


    return (
        <FeedStyle>
            <button disabled={unreadCount === 0} onClick={() => markAllAsRead()}>
                Mark all as read
            </button>

            {notifications.map(
                ({ date, read, message, id }: any, index: number) => (
                    <FeedNotification
                        date={date}
                        read={read}
                        message={message}
                        onRead={() => markReadStatus(id, true)}
                        onUnRead={() => markReadStatus(id, false)}
                        key={index}
                    />
                )
            )}
        </FeedStyle>
    )
}

export default NotificationsFeed
