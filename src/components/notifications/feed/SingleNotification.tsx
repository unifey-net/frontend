import styled from "styled-components"
import React from "react"
import { useDispatch } from "react-redux"
import { useNotificationActions } from "../../../api/notification/NotificationsSocket"
import {
    deleteNotification,
    setReadStatus,
} from "../../../api/notification/Notifications"
import { useAppDispatch } from "../../../util/Redux"

const Notification = styled.div<{ unread: boolean }>`
    background-color: ${({ theme }) => theme.primary};
    padding: 8px;
    border-radius: 4px;

    .control {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        border-top: 1px solid white;
        gap: 4px;

        button {
            margin-top: 16px;
        }
    }

    h2 {
        background-color: ${({ theme, unread }) =>
            unread ? theme.accessory : "transparent"};
        color: ${({ unread }) => (unread ? "black" : "white")};
        text-align: center;

        .unread-notificator {
            text-align: left;
            color: darkred;
            margin-right: 4px;
            font-weight: bolder;
            font-size: 18px;
        }
    }
`

type FeedNotificationProps = {
    message: string
    date: number
    read: boolean
    id: number
}

const FeedNotification: React.FC<FeedNotificationProps> = ({
    message,
    date,
    read,
    id,
}) => {
    const dispatch = useAppDispatch()
    const {
        deleteNotification: socketDeleteNotification,
        readNotification,
        unReadNotifiation,
    } = useNotificationActions()

    const deleteNotif = () => {
        socketDeleteNotification(id)
        dispatch(deleteNotification({ id }))
    }

    const onUnRead = () => {
        unReadNotifiation(id)
        dispatch(setReadStatus({ id, read: false }))
    }

    const onRead = () => {
        readNotification(id)
        dispatch(setReadStatus({ id, read: true }))
    }

    return (
        <Notification unread={!read}>
            <div>
                <h2>
                    {!read && <span className="unread-notificator">!</span>}
                    {new Date(date).toLocaleString()}
                </h2>
                <p>{message}</p>
            </div>

            <div className="control">
                <button onClick={read ? onUnRead : onRead}>
                    Mark as {read ? "unread" : "read"}
                </button>

                <button onClick={deleteNotif}>Delete</button>
            </div>
        </Notification>
    )
}

export default FeedNotification
