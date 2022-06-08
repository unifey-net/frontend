import React from "react"
import DefaultContainer from "../../components/DefaultContainer"
import FriendsList from "../../components/friends/FriendsList"
import OnlineFriendCount from "../../components/friends/OnlineFriendCount"
import FriendRequests from "../../components/friends/requests/FriendRequests"

const Friends = () => {
    return (
        <DefaultContainer>
            <h1>Friends</h1>
            <OnlineFriendCount />
            <FriendRequests />
            <FriendsList />
        </DefaultContainer>
    )
}

export default Friends
