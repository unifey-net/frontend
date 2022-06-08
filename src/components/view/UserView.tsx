import React from "react"
import { Tooltip, Avatar } from "antd"
import { getImageUrl } from "../../api/user/User"

type Props = {
    username: string
    showUsername?: boolean
}

/**
 * A user's avatar and their username.
 */
const UserView = ({ username, showUsername }: Props) => {
    return (
        <a href={`/u/${username}`}>
            <Tooltip title={username}>
                <Avatar size={38} src={getImageUrl(username)} />
            </Tooltip>

            {showUsername && username}
        </a>
    )
}

export default UserView
