import React from "react";
import { Avatar } from "antd";
import { BASE_URL } from "../ApiHandler";

export default function UserView(props) {
    return (
        <div className="user-view-container">
            <a href={`/u/${props.username}`}>
                {props.username}
                <Avatar
                    size={38}
                    src={`${BASE_URL}/user/name/${props.username}/picture`}
                />
            </a>
        </div>
    );
}
