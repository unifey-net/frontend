import React from "react";
import { Tooltip, Avatar } from "antd";
import { getImageUrl } from "../../api/user/User";

type Props = {
    username: string;
};

/**
 * A user's avatar and their username.
 */
export default ({ username }: Props) => {
    return (
        <a href={`/u/${username}`}>
            <Tooltip title={username}>
                <Avatar size={38} src={getImageUrl(username)} />
            </Tooltip>
        </a>
    );
}
