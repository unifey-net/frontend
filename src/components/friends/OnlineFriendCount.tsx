import React from "react"
import { useSelector } from "react-redux"

const OnlineFriendCount: React.FC = () => {
    const count = useSelector((store: any) => store.friends.online).length

    return <p>You currently have {count} friends online.</p>
}

export default OnlineFriendCount