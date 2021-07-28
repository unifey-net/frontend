import styled from "styled-components"
import React from "react"

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
    onRead: () => void
    onUnRead: () => void
}

const FeedNotification: React.FC<FeedNotificationProps> = ({
    message,
    date,
    read,
    onRead,
    onUnRead
}) => {
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
            </div>
        </Notification>
    )
}

export default FeedNotification
