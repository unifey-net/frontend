import React from "react"
import DefaultContainer from "../../components/DefaultContainer"
import NotificationsFeed from "../../components/notifications/feed/NotificationsFeed"

const Notifications = () => {
    return (
        <DefaultContainer>
            <h1>Notifications</h1>
            <NotificationsFeed/>            
        </DefaultContainer>
    )
}

export default {
    exact: true,
    path: "/notifications",
    component: Notifications,
}