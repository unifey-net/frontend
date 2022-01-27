import { Empty } from "antd"
import React from "react"
import { useDispatch, useSelector } from "react-redux"
import styled from "styled-components"
import { useNotificationActions } from "../../../api/notification/NotificationsSocket"
import FeedNotification from "./SingleNotification"
import { deleteAllNotifications, setAllReadStatus } from "../../../api/notification/Notifications"

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

    .notif-controls {
        display: flex;
        flex-direction: row;
        gap: 4px;
        justify-content: space-between;
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
    // to make sure page updates on delete
    const notificationCount = useSelector((store: any) => store.notifications.notificationCount)

    const dispatch = useDispatch()

    const { readAllNotification, deleteAllNotificiation } = useNotificationActions()

    const markAllAsRead = () => {
        readAllNotification()
        dispatch(setAllReadStatus())
    }

    const deleteAll = () => {
        deleteAllNotificiation()
        dispatch(deleteAllNotifications())
    }

    return (
        <FeedStyle>
            <div className="notif-controls">
                <button disabled={unreadCount === 0} onClick={markAllAsRead}>
                    Mark all as read
                </button>

                <button
                    disabled={notifications.length === 0}
                    onClick={deleteAll}
                >
                    Delete all
                </button>
            </div>

            {notifications.map(
                ({ date, read, message, id }: any, index: number) => (
                    <FeedNotification
                        date={date}
                        read={read}
                        message={message}
                        key={index}
                        id={id}
                    />
                )
            )}

            {notificationCount === 0 && (
                <Empty description="You're all caught up!" />
            )}
        </FeedStyle>
    )
}

export default NotificationsFeed
